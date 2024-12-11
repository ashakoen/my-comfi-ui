export interface NodeData {
  label: string;
  type: 'input' | 'output' | 'model' | 'parameter';
  value?: any;
}

export interface FluxModelParams {
  prompt: string;
  negative_prompt?: string;
  num_inference_steps?: number;
  guidance_scale?: number;
  width?: number;
  height?: number;
  seed?: number;
}

export interface FluxLoraParams extends FluxModelParams {
  lora_scale?: number;
}