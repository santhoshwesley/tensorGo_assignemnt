const Joi = require("joi");

const requestSchema = Joi.object({
  category: Joi.string()
    .valid(
      "General Queries",
      "Product Features Queries",
      "Product Pricing Queries",
      "Product Feature Implementation Requests"
    )
    .required(),
  comments: Joi.string().required(),
});

const validateRequest = (req, res, next) => {
  const { error } = requestSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  next();
};

module.exports = validateRequest;
