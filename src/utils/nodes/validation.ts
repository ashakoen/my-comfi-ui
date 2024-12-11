// Node configuration validation
import { CustomNodeDefinition, NodeParameter } from '../../types/customNodes';

export class NodeValidator {
  static validateDefinition(def: CustomNodeDefinition): string[] {
    const errors: string[] = [];

    // Required fields
    const requiredFields = ['id', 'name', 'version', 'parameters', 'endpoint'];
    requiredFields.forEach(field => {
      if (!def[field]) errors.push(`${field} is required`);
    });

    // Validate parameters
    if (def.parameters) {
      def.parameters.forEach((param, index) => {
        const paramErrors = this.validateParameter(param);
        errors.push(...paramErrors.map(err => `Parameter ${index}: ${err}`));
      });
    }

    // Validate endpoint
    if (def.endpoint) {
      if (!['GET', 'POST', 'PUT'].includes(def.endpoint.method)) {
        errors.push('Invalid endpoint method');
      }
      try {
        new URL(def.endpoint.url);
      } catch {
        errors.push('Invalid endpoint URL');
      }
    }

    return errors;
  }

  private static validateParameter(param: NodeParameter): string[] {
    const errors: string[] = [];
    
    if (!param.name) errors.push('Parameter name is required');
    if (!param.type) errors.push('Parameter type is required');
    
    const validTypes = ['string', 'number', 'boolean', 'select', 'image'];
    if (!validTypes.includes(param.type)) {
      errors.push(`Invalid parameter type: ${param.type}`);
    }

    if (param.type === 'select' && (!param.options || param.options.length === 0)) {
      errors.push('Select type requires options array');
    }

    if (param.type === 'number') {
      if (param.min !== undefined && param.max !== undefined && param.min > param.max) {
        errors.push('Min value cannot be greater than max value');
      }
    }

    return errors;
  }
}