import express from 'express';
import { ReplicateService } from '../services/replicateService.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { apiKey, modelType, parameters } = req.body;

    if (!apiKey) {
      return res.status(400).json({ error: 'API key is required' });
    }

    if (!parameters?.prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    if (modelType === 'flux-lora' && !parameters.lora) {
      return res.status(400).json({ error: 'LoRA model path is required' });
    }

    const result = await ReplicateService.generateImage(apiKey, modelType, parameters);
    
    if (!result?.output) {
      throw new Error('No output received from Replicate');
    }

    res.json({ output: result.output });
  } catch (error) {
    console.error('Generation error:', error);
    res.status(500).json({
      error: error.message || 'Failed to generate image'
    });
  }
});

export default router;