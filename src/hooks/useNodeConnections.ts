import { useCallback } from 'react';
import { Node, Edge } from 'reactflow';
import { FluxNodeData } from '../types/nodes';
import { getSourceNode, mergeNodeParameters } from '../utils/nodeConnections';

export const useNodeConnections = (nodes: Node<FluxNodeData>[], edges: Edge[]) => {
  const getNodeInputs = useCallback((nodeId: string) => {
    const sourceNode = getSourceNode(nodeId, nodes, edges);
    if (!sourceNode) return null;

    return {
      sourceNode,
      mergedParams: mergeNodeParameters(
        sourceNode.data.parameters,
        nodes.find(n => n.id === nodeId)?.data.parameters || {}
      )
    };
  }, [nodes, edges]);

  return { getNodeInputs };
};