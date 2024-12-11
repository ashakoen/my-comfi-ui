import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';
import { NodeData } from '../../types';

interface BaseNodeProps {
  data: NodeData;
  isConnectable: boolean;
}

const BaseNode = ({ data, isConnectable }: BaseNodeProps) => {
  return (
    <div className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-gray-200">
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
      />
      <div className="font-bold text-sm">{data.label}</div>
      {data.type === 'parameter' && (
        <input
          className="mt-2 w-full px-2 py-1 border rounded"
          value={data.value || ''}
          onChange={(evt) => {
            // Handle parameter changes
          }}
        />
      )}
      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
      />
    </div>
  );
};

export default memo(BaseNode);