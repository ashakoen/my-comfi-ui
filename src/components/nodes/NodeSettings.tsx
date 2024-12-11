import React from 'react';
import { X } from 'lucide-react';
import { FluxNodeData } from '../../types/nodes';

interface NodeSettingsProps {
  nodeId: string;
  data: FluxNodeData;
  onClose: () => void;
}

const NodeSettings = ({ nodeId, data, onClose }: NodeSettingsProps) => {
  const advancedParams = [
    'guidance_scale',
    'num_inference_steps',
    'width',
    'height',
    'seed',
    ...(data.label === 'FLUX LoRA' ? ['lora_scale', 'extra_lora', 'extra_lora_scale'] : [])
  ];

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
          {advancedParams.map(param => (
            <div key={param} className="space-y-1">
              <label className="text-sm font-medium text-gray-700">
                {param.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </label>
              <input
                type={param === 'seed' ? 'number' : 'text'}
                value={data.parameters[param] || ''}
                onChange={(e) => {
                  const value = e.target.type === 'number' ? Number(e.target.value) : e.target.value;
                  data.onParameterChange(param, value);
                }}
                className="w-full p-2 border rounded-md text-sm"
                min={param === 'seed' ? -1 : 0}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default NodeSettings;