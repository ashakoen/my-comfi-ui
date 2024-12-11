import React from 'react';
import { FluxNodeData } from '../../types/nodes';
import { useFlowStore } from '../../store/flowStore';
import { NodeWrapper } from './common';

interface CustomNodeProps {
  id: string;
  type: string;
  data: FluxNodeData;
  isConnectable: boolean;
}

const CustomNode = ({ id, type, ...props }: CustomNodeProps) => {
  const customNode = useFlowStore(state => state.customNodes[type]);
  
  if (!customNode) return null;

  const basicParams = customNode.parameters
    .filter(p => p.group !== 'advanced')
    .map(p => p.name);

  const advancedParams = customNode.parameters
    .filter(p => p.group === 'advanced')
    .map(p => p.name);

  return (
    <NodeWrapper
      id={id}
      {...props}
      color={customNode.color || '#6366f1'}
      parameters={basicParams}
      advancedParameters={advancedParams}
      customNode={customNode}
    />
  );
};

export default CustomNode;