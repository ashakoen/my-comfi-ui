export interface FluxNodeData {
  label: string;
  parameters: FluxModelParams | FluxLoraParams;
  onParameterChange: (key: string, value: any) => void;
}

export interface FluxModelParams {
  prompt: string;
  negative_prompt: string;
  num_inference_steps: number;
  guidance_scale: number;
  width: number;
  height: number;
  seed: number;
}

export interface FluxLoraParams extends FluxModelParams {
  version: string;
  lora: string;
  lora_scale: number;
  extra_lora?: string;
  extra_lora_scale?: number;
}

export interface NodeData {
  label: string;
  type: 'input' | 'output' | 'model' | 'parameter';
  value?: any;
}