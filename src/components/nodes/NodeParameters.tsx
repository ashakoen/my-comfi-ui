import React from 'react';
import { FluxNodeData } from '../../types/nodes';
import { formatParameterLabel, getParameterProps } from '../../utils/nodeParameters';

interface NodeParametersProps {
  parameters: string[];
  data: FluxNodeData;
}

const NodeParameters = ({ parameters, data }: NodeParametersProps) => {
  return (
    <div className="space-y-3">
      {parameters.map(param => (
        <div key={param} className="space-y-1">
          <label className="text-sm font-medium text-gray-700">
            {formatParameterLabel(param)}
          </label>
          <input
            {...getParameterProps(param)}
            value={data.parameters[param] || ''}
            onChange={(e) => {
              const value = e.target.type === 'number' 
                ? Number(e.target.value) 
                : e.target.value;
              data.onParameterChange(param, value);
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default NodeParameters;