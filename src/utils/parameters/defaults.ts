// Default parameter configurations
export const defaultParameters = {
  base: {
    prompt: '',
    negative_prompt: '',
    guidance_scale: 3.5,
    num_inference_steps: 23,
    width: 512,
    height: 512,
    seed: -1,
  },
  lora: {
    prompt: '',
    negative_prompt: '',
    guidance_scale: 3.5,
    num_inference_steps: 23,
    width: 512,
    height: 512,
    seed: -1,
    lora: '',
    lora_scale: 0.78,
  },
} as const;

export const getDefaultParameters = (type: string) => {
  switch (type) {
    case 'flux-base':
      return { ...defaultParameters.base };
    case 'flux-lora':
      return { ...defaultParameters.lora };
    default:
      return {};
  }
};