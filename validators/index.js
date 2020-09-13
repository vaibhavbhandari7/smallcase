const Joi = require("@hapi/joi");
const tradeValidator = require("./tradeValidator");
const tradeUpdateValidator = require("./tradeUpdateValidator");
const { ValidationException } = require("../exceptions/");
const assignHttpStatusCode = require("../helpers/assignHttpStatusCode");

module.exports = {
  validateBody: schema => (req, res, next) => {
    try{
      const result = Joi.validate(req.body, schema);
      if (result.error) {
        throw new ValidationException.ValidationException(
          result.error.details.map((item) => {
            let key = '';
            item.path.map((k, i) => {
              if (i !== 0) {
                key += '->';
              }
              key += k;
              return key;
            });
            return { [key]: item.message };
          }),
        )
      }
    } catch (err) {
      const statusCode = assignHttpStatusCode(err);
      return res.status(statusCode).json(err.toString());
    }
    
    next();
  },
  schemas: {
    tradeValidator,
    tradeUpdateValidator
  }
};
