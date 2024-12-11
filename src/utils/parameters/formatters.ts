import { getParameterType } from './validation';

export const formatParameterLabel = (param: string): string => {
  return param
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
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

  const placeholders: Record<string, string> = {
    version: 'Enter LoRA version',
    lora: 'Enter LoRA model path',
    prompt: 'Enter your prompt',
    negative_prompt: 'Enter negative prompt (optional)',
    extra_lora: 'Enter additional LoRA model path (optional)',
  };

  if (placeholders[param]) {
    props.placeholder = placeholders[param];
  }

  return props;
};