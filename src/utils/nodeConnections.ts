import { Edge, Node } from 'reactflow';
import { FluxNodeData } from '../types/nodes';

export const getSourceNode = (
  nodeId: string,
  nodes: Node<FluxNodeData>[],
  edges: Edge[]
): Node<FluxNodeData> | null => {
  const incomingEdge = edges.find(edge => edge.target === nodeId);
  if (!incomingEdge) return null;
  
  return nodes.find(node => node.id === incomingEdge.source) || null;
};

export const mergeNodeParameters = (
  sourceParams: Record<string, any>,
  targetParams: Record<string, any>
): Record<string, any> => {
  return {
    ...sourceParams,
    ...targetParams,
    // Preserve target's prompt if it exists, otherwise use source's
    prompt: targetParams.prompt || sourceParams.prompt,
    // Merge negative prompts if both exist
    negative_prompt: [sourceParams.negative_prompt, targetParams.negative_prompt]
      .filter(Boolean)
      .join(', '),
  };
};