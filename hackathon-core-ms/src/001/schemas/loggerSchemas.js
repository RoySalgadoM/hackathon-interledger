const Joi = require('joi');

const baseSchema = Joi.object({
  uuid: Joi.string().uuid().required(),
  message: Joi.string().required(),
  metadata: Joi.object().required(),
  path_file: Joi.string().required(),
  function_name: Joi.string(),
  stack: Joi.string(),
  data: Joi.object()
  //method: Joi.string(),
  //url: Joi.string(),
  //params: Joi.object()
}).unknown();

module.exports = { baseSchema };
