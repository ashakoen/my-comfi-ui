import React from 'react';
import { FluxNodeData } from '../../types/nodes';
import { NodeWrapper } from './common';
import { getBasicParameters, getAdvancedParameters } from '../../utils/parameters';

interface FluxBaseNodeProps {
  id: string;
  data: FluxNodeData;
  isConnectable: boolean;
}

const FluxBaseNode = (props: FluxBaseNodeProps) => {
  return (
    <NodeWrapper
      {...props}
      parameters={getBasicParameters('flux-base')}
      advancedParameters={getAdvancedParameters('flux-base')}
    />
  );
};

export default FluxBaseNode;