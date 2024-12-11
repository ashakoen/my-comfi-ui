import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Connection, Edge, Node, addEdge, OnConnect, applyNodeChanges, applyEdgeChanges } from 'reactflow';
import { nanoid } from 'nanoid';
import { defaultParameters } from '../constants/defaultParameters';
import { FluxNodeData } from '../types/nodes';
import { CustomNodeDefinition } from '../types/customNodes';
import { produce } from 'immer';

interface FlowState {
  nodes: Node<FluxNodeData>[];
  edges: Edge[];
  customNodes: Record<string, CustomNodeDefinition>;
  onNodesChange: (changes: any) => void;
  onEdgesChange: (changes: any) => void;
  onConnect: OnConnect;
  updateNodeData: (nodeId: string, data: Partial<FluxNodeData>) => void;
  addNode: (type: string, position: { x: number; y: number }) => void;
  registerCustomNode: (definition: CustomNodeDefinition) => void;
  setNodes: (nodes: Node<FluxNodeData>[]) => void;
  setEdges: (edges: Edge[]) => void;
}

export const useFlowStore = create<FlowState>()(
  persist(
    (set, get) => ({
      nodes: [],
      edges: [],
      customNodes: {},
      
      setNodes: (nodes) => set({ nodes }),
      setEdges: (edges) => set({ edges }),
      
      onNodesChange: (changes) => {
        set(produce((state) => {
          state.nodes = applyNodeChanges(changes, state.nodes);
        }));
      },

      onEdgesChange: (changes) => {
        set(produce((state) => {
          state.edges = applyEdgeChanges(changes, state.edges);
        }));
      },

      onConnect: (params: Connection) => {
        set(produce((state) => {
          state.edges = addEdge(params, state.edges);
        }));
      },

      updateNodeData: (nodeId: string, newData: Partial<FluxNodeData>) => {
        set(produce((state) => {
          const node = state.nodes.find(n => n.id === nodeId);
          if (node) {
            node.data = { ...node.data, ...newData };
          }
        }));
      },

      registerCustomNode: (definition: CustomNodeDefinition) => {
        set(produce((state) => {
          state.customNodes[definition.id] = definition;
        }));
      },

      addNode: (type: string, position: { x: number; y: number }) => {
        const nodeId = nanoid();
        const customNode = get().customNodes[type];

        const getDefaultParams = (type: string) => {
          switch (type) {
            case 'flux-base':
              return { ...defaultParameters.base };
            case 'flux-lora':
              return { ...defaultParameters.lora };
            default:
              return customNode 
                ? Object.fromEntries(customNode.parameters.map(p => [p.name, p.default]))
                : {};
          }
        };

        set(produce((state) => {
          const nodeData: FluxNodeData = {
            label: customNode ? customNode.name : (type === 'flux-base' ? 'FLUX Base' : 'FLUX LoRA'),
            parameters: getDefaultParams(type),
            onParameterChange: (key: string, value: any) => {
              get().updateNodeData(nodeId, {
                parameters: {
                  ...get().nodes.find(n => n.id === nodeId)?.data.parameters,
                  [key]: value,
                },
              });
            },
          };

          state.nodes.push({
            id: nodeId,
            type,
            position,
            data: nodeData,
            dragHandle: '.drag-handle',
          });
        }));
      },
    }),
    {
      name: 'flux-flow-state',
      partialize: (state) => ({
        nodes: state.nodes,
        edges: state.edges,
        customNodes: state.customNodes,
      }),
    }
  )
);