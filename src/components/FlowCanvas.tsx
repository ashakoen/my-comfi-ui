import React, { useCallback, useMemo } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  NodeTypes,
  ReactFlowInstance,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { useFlowStore } from '../store/flowStore';
import { FluxBaseNode, FluxLoraNode, CustomNode, ImagePreviewNode, ImageUploadNode } from './nodes';

const FlowCanvas = () => {
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    customNodes,
  } = useFlowStore();

  // Memoize nodeTypes to prevent recreation on every render
  const nodeTypes = useMemo(() => {
    const types: NodeTypes = {
      'flux-base': FluxBaseNode,
      'flux-lora': FluxLoraNode,
      'image-preview': ImagePreviewNode,
      'image-upload': ImageUploadNode,
    };

    Object.keys(customNodes).forEach(nodeType => {
      types[nodeType] = CustomNode;
    });

    return types;
  }, [customNodes]);

  const onInit = useCallback((instance: ReactFlowInstance) => {
    instance.fitView({ padding: 0.2 });
  }, []);

  return (
    <div className="w-full h-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        onInit={onInit}
        fitView
        defaultViewport={{ x: 0, y: 0, zoom: 1.5 }}
        minZoom={0.5}
        maxZoom={2}
        className="bg-gray-50"
        fitViewOptions={{ padding: 0.2 }}
      >
        <Background color="#aaa" gap={16} />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
};

export default FlowCanvas;