import React from 'react';
import { GripHorizontal } from 'lucide-react';
import { NodeContainer } from './common';
import { useExecutionStore } from '../../store/executionStore';

interface ImagePreviewNodeProps {
  id: string;
  isConnectable: boolean;
}

const ImagePreviewNode = ({ id, isConnectable }: ImagePreviewNodeProps) => {
  const nodeResults = useExecutionStore(state => state.nodeResults);
  const incomingImage = nodeResults[id];

  return (
    <NodeContainer isConnectable={isConnectable}>
      <div className="flex items-center gap-2 mb-3">
        <div className="drag-handle cursor-move">
          <GripHorizontal className="w-5 h-5 text-gray-400" />
        </div>
        <div className="font-bold text-lg">Image Preview</div>
      </div>
      
      <div className="w-[256px]">
        {incomingImage ? (
          <img 
            src={incomingImage} 
            alt="Node output"
            className="w-full rounded-lg"
          />
        ) : (
          <div className="h-[256px] bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
            No image input
          </div>
        )}
      </div>
    </NodeContainer>
  );
};

export default ImagePreviewNode;