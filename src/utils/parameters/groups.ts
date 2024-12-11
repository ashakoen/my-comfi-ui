// Parameter grouping logic
export const getBasicParameters = (nodeType: string): string[] => {
  switch (nodeType) {
    case 'flux-base':
      return ['prompt', 'negative_prompt'];
    case 'flux-lora':
      return ['prompt', 'negative_prompt', 'lora'];
    default:
      return [];
  }
};

export const getAdvancedParameters = (nodeType: string): string[] => {
  const baseParams = [
    'guidance_scale',
    'num_inference_steps',
    'width',
    'height',
    'seed'
  ];

  switch (nodeType) {
    case 'flux-lora':
      return [...baseParams, 'lora_scale', 'extra_lora', 'extra_lora_scale'];
    default:
      return baseParams;
  }
};