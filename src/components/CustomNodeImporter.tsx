import React, { useState } from 'react';
import { Upload, X } from 'lucide-react';
import { CustomNodeDefinition } from '../types/customNodes';
import { NodeValidator } from '../utils/nodeValidator';
import { useFlowStore } from '../store/flowStore';

const CustomNodeImporter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [jsonContent, setJsonContent] = useState('');
  const [error, setError] = useState<string | null>(null);
  const registerCustomNode = useFlowStore(state => state.registerCustomNode);

  const handleImport = () => {
    try {
      const definition: CustomNodeDefinition = JSON.parse(jsonContent);
      const validationErrors = NodeValidator.validateDefinition(definition);

      if (validationErrors.length > 0) {
        setError(`Invalid node definition:\n${validationErrors.join('\n')}`);
        return;
      }

      registerCustomNode(definition);
      setIsOpen(false);
      setJsonContent('');
      setError(null);
    } catch (e) {
      setError('Invalid JSON format');
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600"
      >
        <Upload className="w-4 h-4" />
        Import Node
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-[600px]">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">Import Custom Node</h3>
          <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-gray-100 rounded">
            <X className="w-5 h-5" />
          </button>
        </div>

        <textarea
          value={jsonContent}
          onChange={(e) => setJsonContent(e.target.value)}
          className="w-full h-[300px] p-4 border rounded-md font-mono text-sm"
          placeholder="Paste your node configuration JSON here..."
        />

        {error && (
          <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-md">
            <pre className="whitespace-pre-wrap text-sm">{error}</pre>
          </div>
        )}

        <div className="mt-4 flex justify-end gap-2">
          <button
            onClick={() => setIsOpen(false)}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={handleImport}
            className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600"
          >
            Import Node
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomNodeImporter;