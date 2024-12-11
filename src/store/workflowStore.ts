import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { nanoid } from 'nanoid';
import { Workflow, WorkflowMetadata } from '../types/workflow';
import { useFlowStore } from './flowStore';

interface WorkflowState {
  workflows: Record<string, Workflow>;
  addWorkflow: (name: string, description?: string) => string;
  updateWorkflow: (id: string, workflow: Partial<Workflow>) => void;
  deleteWorkflow: (id: string) => void;
  loadWorkflow: (id: string) => void;
  getWorkflowMetadata: () => WorkflowMetadata[];
}

export const useWorkflowStore = create<WorkflowState>()(
  persist(
    (set, get) => ({
      workflows: {},

      addWorkflow: (name: string, description?: string) => {
        const id = nanoid();
        const { nodes, edges } = useFlowStore.getState();
        
        const workflow: Workflow = {
          id,
          name,
          description,
          nodes: JSON.parse(JSON.stringify(nodes)), // Deep clone to prevent reference issues
          edges: JSON.parse(JSON.stringify(edges)),
          created: new Date().toISOString(),
          updated: new Date().toISOString(),
        };

        set(state => ({
          workflows: {
            ...state.workflows,
            [id]: workflow
          }
        }));

        return id;
      },

      updateWorkflow: (id: string, updates: Partial<Workflow>) => {
        set(state => {
          const workflow = state.workflows[id];
          if (!workflow) return state;

          return {
            workflows: {
              ...state.workflows,
              [id]: {
                ...workflow,
                ...updates,
                updated: new Date().toISOString()
              }
            }
          };
        });
      },

      deleteWorkflow: (id: string) => {
        set(state => {
          const { [id]: _, ...rest } = state.workflows;
          return { workflows: rest };
        });
      },

      loadWorkflow: (id: string) => {
        const workflow = get().workflows[id];
        if (!workflow) return;

        const flowStore = useFlowStore.getState();
        // Deep clone the nodes and edges to prevent reference issues
        flowStore.setNodes(JSON.parse(JSON.stringify(workflow.nodes)));
        flowStore.setEdges(JSON.parse(JSON.stringify(workflow.edges)));
      },

      getWorkflowMetadata: () => {
        return Object.values(get().workflows).map(workflow => ({
          id: workflow.id,
          name: workflow.name,
          description: workflow.description,
          created: workflow.created,
          updated: workflow.updated,
          author: workflow.author,
          tags: workflow.tags,
          nodeCount: workflow.nodes.length
        }));
      },
    }),
    {
      name: 'flux-workflows'
    }
  )
);