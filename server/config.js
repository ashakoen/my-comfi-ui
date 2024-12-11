export const FLUX_BASE_URL = 'https://api.replicate.com/v1/models/black-forest-labs/flux-dev/predictions';
export const FLUX_LORA_URL = 'https://api.replicate.com/v1/predictions';

export const POLL_CONFIG = {
  maxAttempts: 60,
  delayMs: 2000,
};

export const AGENT_CONFIG = {
  rejectUnauthorized: false,
  keepAlive: true,
  timeout: 60000,
};