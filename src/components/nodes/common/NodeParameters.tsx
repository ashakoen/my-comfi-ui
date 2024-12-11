import React from 'react';
import { FluxNodeData } from '../../../types/nodes';
import { formatParameterLabel, getParameterProps } from '../../../utils/parameters';
import { CustomNodeDefinition } from '../../../types/customNodes';

interface NodeParametersProps {
  parameters: string[];
  data: FluxNodeData;
  customNode?: CustomNodeDefinition;
}

export const NodeParameters = ({ parameters, data, customNode }: NodeParametersProps) => {
  return (
    <div className="space-y-3">
      {parameters.map(param => {
        const paramConfig = customNode?.parameters.find(p => p.name === param);
        const inputProps = getParameterProps(param);
        
        return (
          <div key={param} className="space-y-1">
            <label className="text-sm font-medium text-gray-700">
              {paramConfig?.label || formatParameterLabel(param)}
            </label>
            {paramConfig?.description && (
              <p className="text-xs text-gray-500 mb-1">{paramConfig.description}</p>
            )}
            <input
              {...inputProps}
              value={data.parameters[param] || ''}
              onChange={(e) => {
                const value = e.target.type === 'number' 
                  ? Number(e.target.value) 
                  : e.target.value;
                data.onParameterChange(param, value);
              }}
            />
          </div>
        );
      })}
    </div>
  );
};