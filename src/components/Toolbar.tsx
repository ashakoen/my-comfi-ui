import React, { memo } from 'react';
import { Image, Wand2, Eye, Upload } from 'lucide-react';
import { useFlowStore } from '../store/flowStore';
import CustomNodeImporter from './CustomNodeImporter';
import * as LucideIcons from 'lucide-react';

const Toolbar = memo(() => {
  const { addNode, customNodes } = useFlowStore();

  const handleAddNode = (type: string) => {
    const position = {
      x: window.innerWidth / 2 - 125,
      y: window.innerHeight / 3,
    };
    addNode(type, position);
  };

  const getIcon = (iconName: string) => {
    const Icon = (LucideIcons as any)[iconName] || LucideIcons.Box;
    return <Icon className="w-6 h-6" />;
  };

  return (
    <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg p-2 z-10">
      <div className="flex flex-col gap-2">
        <div className="mb-2">
          <h3 className="text-sm font-medium text-gray-500 px-2 mb-1">Built-in Nodes</h3>
          <button
            onClick={() => handleAddNode('image-upload')}
            className="w-full p-2 hover:bg-gray-100 rounded-md flex items-center gap-2 transition-colors duration-200"
            title="Add Image Upload"
          >
            <Upload className="w-6 h-6" />
            <span>Image Upload</span>
          </button>
          <button
            onClick={() => handleAddNode('flux-base')}
            className="w-full p-2 hover:bg-gray-100 rounded-md flex items-center gap-2 transition-colors duration-200"
            title="Add FLUX Base Model"
          >
            <Image className="w-6 h-6" />
            <span>FLUX Base</span>
          </button>
          <button
            onClick={() => handleAddNode('flux-lora')}
            className="w-full p-2 hover:bg-gray-100 rounded-md flex items-center gap-2 transition-colors duration-200"
            title="Add FLUX LoRA Model"
          >
            <Wand2 className="w-6 h-6" />
            <span>FLUX LoRA</span>
          </button>
          <button
            onClick={() => handleAddNode('image-preview')}
            className="w-full p-2 hover:bg-gray-100 rounded-md flex items-center gap-2 transition-colors duration-200"
            title="Add Image Preview"
          >
            <Eye className="w-6 h-6" />
            <span>Image Preview</span>
          </button>
        </div>

        {Object.keys(customNodes).length > 0 && (
          <div className="border-t pt-2">
            <h3 className="text-sm font-medium text-gray-500 px-2 mb-1">Custom Nodes</h3>
            {Object.entries(customNodes).map(([id, node]) => (
              <button
                key={id}
                onClick={() => handleAddNode(id)}
                className="w-full p-2 hover:bg-gray-100 rounded-md flex items-center gap-2 transition-colors duration-200"
                title={node.description}
                style={{ color: node.color }}
              >
                {getIcon(node.icon || 'Box')}
                <span>{node.name}</span>
              </button>
            ))}
          </div>
        )}

        <div className="border-t pt-2">
          <CustomNodeImporter />
        </div>
      </div>
    </div>
  );
});

Toolbar.displayName = 'Toolbar';

export default Toolbar;