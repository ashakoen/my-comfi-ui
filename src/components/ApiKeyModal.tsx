import React, { useState } from 'react';
import { useApiKeyStore } from '../store/apiKeyStore';
import { Key } from 'lucide-react';

const ApiKeyModal = () => {
  const { apiKey, setApiKey } = useApiKeyStore();
  const [key, setKey] = useState('');
  const [isOpen, setIsOpen] = useState(!apiKey);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setApiKey(key);
    setIsOpen(false);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 right-4 bg-white p-2 rounded-lg shadow-lg hover:bg-gray-100"
      >
        <Key className="w-6 h-6" />
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-xl w-96">
        <h2 className="text-xl font-bold mb-4">Replicate API Key</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder="Enter your Replicate API key"
            className="w-full p-2 border rounded mb-4"
          />
          <div className="flex justify-end gap-2">
            {apiKey && (
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApiKeyModal;