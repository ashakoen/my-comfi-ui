import fetch from 'node-fetch';
import { Agent } from 'https';
import { FLUX_BASE_URL, FLUX_LORA_URL, AGENT_CONFIG, POLL_CONFIG } from '../config.js';

const agent = new Agent(AGENT_CONFIG);

export class ReplicateService {
  static async generateImage(apiKey, modelType, parameters) {
    const url = modelType === 'flux-base' ? FLUX_BASE_URL : FLUX_LORA_URL;
    const payload = this.buildPayload(modelType, parameters);

    try {
      const prediction = await this.createPrediction(url, apiKey, payload);
      if (!prediction?.urls?.get) {
        throw new Error('Invalid prediction response');
      }
      const result = await this.pollForCompletion(prediction.urls.get, apiKey);
      return result;
    } catch (error) {
      console.error('Replicate API error:', error);
      throw new Error(error.message || 'Failed to generate image');
    }
  }

  static buildPayload(modelType, parameters) {
    const baseInput = {
      prompt: parameters.prompt,
      num_outputs: 1,
      guidance_scale: parameters.guidance_scale || 3.5,
      num_inference_steps: parameters.num_inference_steps || 23,
      output_format: "png",
      output_quality: 80,
      disable_safety_checker: false,
      width: parameters.width || 512,
      height: parameters.height || 512,
      negative_prompt: parameters.negative_prompt || "",
      seed: parameters.seed || -1,
      go_fast: true
    };

    if (modelType === 'flux-lora') {
      return {
        version: "121f6cb1a527a4f803b566f4291f2f4a14d0c82bdc9e3e65e5220a5cd53cbdd5",
        input: {
          ...baseInput,
          model: "dev",
          lora: parameters.lora,
          lora_scale: parameters.lora_scale || 0.78,
          ...(parameters.extra_lora && {
            extra_lora: parameters.extra_lora,
            extra_lora_scale: parameters.extra_lora_scale || 0.8,
          }),
        }
      };
    }

    // For flux-base model
    return {
      input: baseInput
    };
  }

  static async createPrediction(url, apiKey, payload) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Token ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        agent,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || `API request failed with status ${response.status}`);
      }

      return response.json();
    } catch (error) {
      throw new Error(`Failed to create prediction: ${error.message}`);
    }
  }

  static async pollForCompletion(getUrl, apiKey) {
    const { maxAttempts, delayMs } = POLL_CONFIG;

    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      try {
        const response = await fetch(getUrl, {
          headers: {
            'Authorization': `Token ${apiKey}`,
          },
          agent,
        });

        if (!response.ok) {
          throw new Error(`Failed to check prediction status: ${response.status}`);
        }

        const prediction = await response.json();

        if (prediction.status === 'succeeded') {
          return prediction;
        } else if (prediction.status === 'failed') {
          throw new Error(prediction.error || 'Image generation failed');
        }

        await new Promise(resolve => setTimeout(resolve, delayMs));
      } catch (error) {
        throw new Error(`Failed to poll prediction: ${error.message}`);
      }
    }

    throw new Error('Timeout waiting for image generation');
  }
}