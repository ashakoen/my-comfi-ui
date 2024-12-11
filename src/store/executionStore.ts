import { create } from 'zustand';
import { ReplicateService } from '../services/replicateService';
import { useApiKeyStore } from './apiKeyStore';
import { useFlowStore } from './flowStore';
import { FluxLoraParams } from '../types/nodes';

interface ExecutionState {
  isExecuting: boolean;
  nodeResults: Record<string, string>;
  currentImage: string | null;
  error: string | null;
  executeNode: (nodeId: string) => Promise<void>;
  setNodeResult: (nodeId: string, result: string) => void;
  clearState: () => void;
}

export const useExecutionStore = create<ExecutionState>((set, get) => ({
  isExecuting: false,
  nodeResults: {},
  currentImage: null,
  error: null,

  setNodeResult: (nodeId: string, result: string) => {
    set(state => ({
      nodeResults: {
        ...state.nodeResults,
        [nodeId]: result
      }
    }));
  },

  executeNode: async (nodeId: string) => {
    const apiKey = useApiKeyStore.getState().apiKey;
    if (!apiKey) {
      set({ error: 'Please set your Replicate API key first' });
      return;
    }

    const { nodes, edges } = useFlowStore.getState();
    const node = nodes.find(n => n.id === nodeId);
    if (!node) {
      set({ error: 'Node not found' });
      return;
    }

    const params = { ...node.data.parameters };
    
    // Check for input image from connected upstream node
    const incomingEdge = edges.find(e => e.target === nodeId);
    if (incomingEdge) {
      const sourceNodeResult = get().nodeResults[incomingEdge.source];
      if (sourceNodeResult) {
        params.image = sourceNodeResult;
      }
    }

    if (!params.prompt && node.type !== 'image-upload') {
      set({ error: 'Please enter a prompt' });
      return;
    }

    if (node.type === 'flux-lora' && !(params as FluxLoraParams).lora) {
      set({ error: 'Please enter a LoRA model path' });
      return;
    }

    set({ isExecuting: true, error: null });

    try {
      const replicateService = new ReplicateService(apiKey);
      const result = await replicateService.makeRequest(
        node.type,
        {
          ...params,
          num_outputs: 1,
          output_format: "png",
          output_quality: 80,
          disable_safety_checker: false,
          go_fast: true
        }
      );
      
      set(state => ({ 
        nodeResults: {
          ...state.nodeResults,
          [nodeId]: result
        },
        currentImage: result,
        error: null 
      }));
      
    } catch (error) {
      console.error('Execution error:', error);
      set({ 
        error: error instanceof Error ? error.message : 'Failed to generate image',
        currentImage: null 
      });
    } finally {
      set({ isExecuting: false });
    }
  },

  clearState: () => {
    set({ currentImage: null, error: null });
  },
}));