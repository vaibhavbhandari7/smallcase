const Joi = require("@hapi/joi");

module.exports = Joi.object().keys({
  method: Joi.string().valid('buy', 'sell').required(),
  buyPrice: Joi.number()
    .min(0)
    .when('method', {'is': 'buy', then: Joi.number().required()}),
  shares: Joi.number()
    .min(1)
    .required()
});
