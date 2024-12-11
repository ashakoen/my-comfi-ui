import React, { useState, useCallback, memo } from 'react';
import { FluxNodeData } from '../../../types/nodes';
import { useExecutionStore } from '../../../store/executionStore';
import { NodeContainer } from './NodeContainer';
import { NodeHeader } from './NodeHeader';
import { NodeParameters } from './NodeParameters';
import { NodeSettings } from './NodeSettings';
import { CustomNodeDefinition } from '../../../types/customNodes';

interface NodeWrapperProps {
  id: string;
  data: FluxNodeData;
  isConnectable: boolean;
  color?: string;
  parameters: string[];
  advancedParameters: string[];
  customNode?: CustomNodeDefinition;
}

export const NodeWrapper = memo(({ 
  id, 
  data, 
  isConnectable, 
  color,
  parameters,
  advancedParameters,
  customNode
}: NodeWrapperProps) => {
  const [showSettings, setShowSettings] = useState(false);
  const executeNode = useExecutionStore(state => state.executeNode);
  const isExecuting = useExecutionStore(state => state.isExecuting);

  const handleExecute = useCallback(() => {
    executeNode(id);
  }, [executeNode, id]);

  const handleSettingsToggle = useCallback(() => {
    setShowSettings(prev => !prev);
  }, []);

  return (
    <>
      <NodeContainer isConnectable={isConnectable} color={color}>
        <NodeHeader
          label={customNode?.name || data.label}
          isExecuting={isExecuting}
          onExecute={handleExecute}
          onSettings={handleSettingsToggle}
        />
        <NodeParameters
          parameters={parameters}
          data={data}
          customNode={customNode}
        />
      </NodeContainer>

      {showSettings && (
        <NodeSettings
          nodeId={id}
          data={data}
          parameters={advancedParameters}
          customNode={customNode}
          onClose={handleSettingsToggle}
        />
      )}
    </>
  );
});