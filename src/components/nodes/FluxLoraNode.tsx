import React from 'react';
import { FluxNodeData } from '../../types/nodes';
import { NodeWrapper } from './common';
import { getBasicParameters, getAdvancedParameters } from '../../utils/parameters';

interface FluxLoraNodeProps {
  id: string;
  data: FluxNodeData;
  isConnectable: boolean;
}

const FluxLoraNode = (props: FluxLoraNodeProps) => {
  return (
    <NodeWrapper
      {...props}
      color="#9333ea"
      parameters={getBasicParameters('flux-lora')}
      advancedParameters={getAdvancedParameters('flux-lora')}
    />
  );
};

export default FluxLoraNode;