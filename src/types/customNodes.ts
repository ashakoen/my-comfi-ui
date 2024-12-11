export interface NodeParameter {
  name: string;
  type: 'string' | 'number' | 'boolean' | 'select' | 'image';
  label: string;
  default?: any;
  required?: boolean;
  options?: string[]; // For select type
  min?: number;
  max?: number;
  step?: number;
  description?: string;
  group?: 'basic' | 'advanced';
}

export interface NodeEndpoint {
  url: string;
  method: 'GET' | 'POST' | 'PUT';
  headers?: Record<string, string>;
  responseMapping?: {
    output: string; // JSON path to output in response
    error?: string; // JSON path to error in response
  };
}

export interface CustomNodeDefinition {
  id: string;
  name: string;
  description: string;
  version: string;
  author?: string;
  category?: string;
  color?: string;
  icon?: string;
  parameters: NodeParameter[];
  inputs: {
    image?: boolean;
    mask?: boolean;
    depth?: boolean;
  };
  outputs: {
    image?: boolean;
    mask?: boolean;
    depth?: boolean;
  };
  endpoint: NodeEndpoint;
  examples?: {
    input: Record<string, any>;
    output: string;
  }[];
}