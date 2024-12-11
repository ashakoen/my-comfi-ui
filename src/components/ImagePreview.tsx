import React from 'react';
import { X } from 'lucide-react';
import { useExecutionStore } from '../store/executionStore';

const ImagePreview = () => {
  const { currentImage, isExecuting, error, clearState } = useExecutionStore();

  if (!currentImage && !isExecuting && !error) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-xl p-4 w-[512px]">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold">Generated Image</h3>
        <button
          onClick={clearState}
          className="p-1 hover:bg-gray-100 rounded"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {isExecuting && (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      )}

      {error && (
        <div className="bg-red-50 text-red-500 p-4 rounded">
          {error}
        </div>
      )}

      {currentImage && !isExecuting && (
        <img
          src={currentImage}
          alt="Generated"
          className="w-full rounded"
          onError={() => {
            useExecutionStore.setState({ 
              error: 'Failed to load generated image',
              currentImage: null 
            });
          }}
        />
      )}
    </div>
  );
}

export default ImagePreview;