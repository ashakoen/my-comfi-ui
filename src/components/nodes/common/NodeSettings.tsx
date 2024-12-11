import React from 'react';
import { X } from 'lucide-react';
import { FluxNodeData } from '../../../types/nodes';
import { formatParameterLabel, getParameterProps } from '../../../utils/parameters';
import { CustomNodeDefinition } from '../../../types/customNodes';

interface NodeSettingsProps {
  nodeId: string;
  data: FluxNodeData;
  parameters: string[];
  customNode?: CustomNodeDefinition;
  onClose: () => void;
}

export const NodeSettings = ({ nodeId, data, parameters, customNode, onClose }: NodeSettingsProps) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-96 max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">Advanced Settings</h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          {parameters.map(param => {
            const paramConfig = customNode?.parameters.find(p => p.name === param);
            
            return (
              <div key={param} className="space-y-1">
                <label className="text-sm font-medium text-gray-700">
                  {paramConfig?.label || formatParameterLabel(param)}
                </label>
                {paramConfig?.description && (
                  <p className="text-xs text-gray-500 mb-1">{paramConfig.description}</p>
                )}
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
            );
          })}
        </div>
      </div>
    </div>
  );
};