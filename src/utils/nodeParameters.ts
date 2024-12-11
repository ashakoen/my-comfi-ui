export const getBasicParameters = (nodeType: string): string[] => {
  switch (nodeType) {
    case 'flux-base':
      return ['prompt', 'negative_prompt'];
    case 'flux-lora':
      return ['prompt', 'negative_prompt', 'version', 'lora'];
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

export const formatParameterLabel = (param: string): string => {
  return param
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export const getParameterType = (param: string): 'text' | 'number' => {
  return ['seed', 'width', 'height', 'num_inference_steps', 'guidance_scale', 'lora_scale', 'extra_lora_scale'].includes(param) 
    ? 'number' 
    : 'text';
};

export const getParameterProps = (param: string) => {
  const type = getParameterType(param);
  const props: Record<string, any> = {
    type,
    className: 'w-full p-2 border rounded-md text-sm'
  };

  if (type === 'number') {
    props.min = param === 'seed' ? -1 : 0;
    if (param.includes('scale')) {
      props.step = 0.1;
    }
  }

  if (param === 'version') {
    props.placeholder = 'Enter LoRA version';
  } else if (param === 'lora') {
    props.placeholder = 'Enter LoRA model path';
  } else if (param === 'prompt') {
    props.placeholder = 'Enter your prompt';
  } else if (param === 'negative_prompt') {
    props.placeholder = 'Enter negative prompt (optional)';
  }

  return props;
};