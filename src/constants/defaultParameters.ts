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
    version: '121f6cb1a527a4f803b566f4291f2f4a14d0c82bdc9e3e65e5220a5cd53cbdd5',
    lora: '',
    lora_scale: 0.78,
  },
} as const;