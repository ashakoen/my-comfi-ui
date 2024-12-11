import React from 'react';
import { GripHorizontal, Play, Settings } from 'lucide-react';

interface NodeHeaderProps {
  label: string;
  isExecuting: boolean;
  onExecute: () => void;
  onSettings: () => void;
}

export const NodeHeader = ({ label, isExecuting, onExecute, onSettings }: NodeHeaderProps) => {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2">
        <div className="drag-handle cursor-move">
          <GripHorizontal className="w-5 h-5 text-gray-400" />
        </div>
        <h3 className="font-bold text-lg">{label}</h3>
      </div>
      <div className="flex gap-2">
        <button
          onClick={onExecute}
          disabled={isExecuting}
          className={`p-1 rounded hover:bg-gray-100 ${isExecuting ? 'opacity-50 cursor-not-allowed' : ''}`}
          title="Generate Image"
        >
          <Play className="w-5 h-5 text-green-600" />
        </button>
        <button
          onClick={onSettings}
          className="p-1 rounded hover:bg-gray-100"
          title="Advanced Settings"
        >
          <Settings className="w-5 h-5 text-gray-500" />
        </button>
      </div>
    </div>
  );
};