import React, { useRef, useEffect } from 'react';
import { Handle, Position } from 'reactflow';
import { observeElement } from '../../../utils/resizeObserver';

interface NodeContainerProps {
  children: React.ReactNode;
  isConnectable: boolean;
  color?: string;
}

export const NodeContainer = ({ children, isConnectable, color }: NodeContainerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    // Delay observation to prevent initial resize loops
    const timeoutId = setTimeout(() => {
      const cleanup = observeElement(element);
      return () => {
        cleanup();
      };
    }, 100);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="bg-white rounded-lg shadow-lg p-4 min-w-[300px]"
      style={color ? { borderTop: `4px solid ${color}` } : undefined}
    >
      <Handle 
        type="target" 
        position={Position.Top} 
        isConnectable={isConnectable}
        className="!bg-gray-400"
      />
      {children}
      <Handle 
        type="source" 
        position={Position.Bottom} 
        isConnectable={isConnectable}
        className="!bg-gray-400"
      />
    </div>
  );
};