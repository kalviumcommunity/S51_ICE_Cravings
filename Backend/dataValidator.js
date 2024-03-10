const Joi = require('joi');

// Define the schema
const iceVarietySchema = Joi.object({
  _id : Joi.string().required(),
  createdAt : Joi.date(),
  updatedAt : Joi.date(),
  __v : Joi.number(),
  iceVariety: Joi.string().required(),
  Price: Joi.string().required(), // You may want to refine this validation based on your requirements
  Availability: Joi.string().valid('Yes', 'No').required(),
  Density: Joi.number().required(),
  Temperature: Joi.number().required(),
  Clarity: Joi.string().required(),
  Hardness: Joi.number().required(),
  meltingTime: Joi.number().required(),
  Notes: Joi.string().allow('') // Allow empty string for Notes
});

// Validator function
const validateIceVariety = (data) => {
    const { error, value } = iceVarietySchema.validate(data);
    if (error) {
      return { success: false, error: `Validation error: ${error.details.map(detail => detail.message).join(', ')}` };
    }
    return { success: true, value };
  };
  
  


module.exports = validateIceVariety