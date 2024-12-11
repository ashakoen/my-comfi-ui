import { Node, Edge } from 'reactflow';
import { FluxNodeData } from './nodes';

export interface Workflow {
  id: string;
  name: string;
  description?: string;
  nodes: Node<FluxNodeData>[];
  edges: Edge[];
  created: string;
  updated: string;
  author?: string;
  tags?: string[];
}

export interface WorkflowMetadata {
  id: string;
  name: string;
  description?: string;
  created: string;
  updated: string;
  author?: string;
  tags?: string[];
  nodeCount: number;
}