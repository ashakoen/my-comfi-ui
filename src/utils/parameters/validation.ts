// Parameter validation and type checking
export const getParameterType = (param: string): 'text' | 'number' => {
  const numberParams = [
    'seed',
    'width',
    'height',
    'num_inference_steps',
    'guidance_scale',
    'lora_scale',
    'extra_lora_scale'
  ];
  return numberParams.includes(param) ? 'number' : 'text';
};

export const validateParameterValue = (param: string, value: any): boolean => {
  const type = getParameterType(param);
  
  if (type === 'number') {
    const num = Number(value);
    if (isNaN(num)) return false;
    if (param === 'seed' && num < -1) return false;
    if (param !== 'seed' && num < 0) return false;
    return true;
  }
  
  return true;
};