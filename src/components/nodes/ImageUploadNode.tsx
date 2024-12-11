import React, { useCallback, useState } from 'react';
import { Upload } from 'lucide-react';
import { NodeContainer } from './common';
import { useExecutionStore } from '../../store/executionStore';

interface ImageUploadNodeProps {
  id: string;
  isConnectable: boolean;
}

const ImageUploadNode = ({ id, isConnectable }: ImageUploadNodeProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const { nodeResults, setNodeResult } = useExecutionStore();
  const uploadedImage = nodeResults[id];

  const handleImageUpload = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) {
      console.error('Invalid file type');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      setNodeResult(id, dataUrl);
    };
    reader.readAsDataURL(file);
  }, [id, setNodeResult]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) handleImageUpload(file);
  }, [handleImageUpload]);

  const handlePaste = useCallback((e: ClipboardEvent) => {
    const items = e.clipboardData?.items;
    if (!items) return;

    for (const item of items) {
      if (item.type.startsWith('image/')) {
        const file = item.getAsFile();
        if (file) handleImageUpload(file);
        break;
      }
    }
  }, [handleImageUpload]);

  React.useEffect(() => {
    document.addEventListener('paste', handlePaste);
    return () => document.removeEventListener('paste', handlePaste);
  }, [handlePaste]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleImageUpload(file);
  }, [handleImageUpload]);

  return (
    <NodeContainer isConnectable={isConnectable}>
      <div className="flex items-center gap-2 mb-3">
        <div className="drag-handle cursor-move">
          <Upload className="w-5 h-5 text-gray-400" />
        </div>
        <div className="font-bold text-lg">Image Upload</div>
      </div>

      <div 
        className={`w-[256px] h-[256px] border-2 border-dashed rounded-lg transition-colors ${
          isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
        }`}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
      >
        {uploadedImage ? (
          <img 
            src={uploadedImage} 
            alt="Uploaded"
            className="w-full h-full object-contain rounded-lg"
          />
        ) : (
          <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
            <Upload className="w-8 h-8 text-gray-400 mb-2" />
            <div className="text-sm text-gray-500 text-center px-4">
              <p>Drop image here, or click to upload</p>
              <p className="mt-1 text-xs">You can also paste an image</p>
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
          </label>
        )}
      </div>
    </NodeContainer>
  );
};

export default ImageUploadNode;