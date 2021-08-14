var PhoneRegex = new RegExp(/^\+(?:[0-9] ?){6,14}[0-9]$/);
var NameRegex = new RegExp(/^[a-zA-Z]{2,40}( [a-zA-Z]{2,40})+$/);

const Joi = require("@hapi/joi");

const registerValidation = (data) => {
  const Schema = Joi.object({
    name: Joi.string().min(5).regex(NameRegex).required(),
    phone: Joi.string().min(10).regex(PhoneRegex).required(),
    password: Joi.string().min(6).required(),
  });
  return Schema.validate(data);
};

const loginValidation = (data) => {
  const Schema = Joi.object({
    phone: Joi.string().min(10).regex(PhoneRegex).required(),
    password: Joi.string().min(6).required(),
  });
  return Schema.validate(data);
};

const messageSchema = Joi.object({
  sender_id: Joi.string().required(),
  message_body: Joi.string().min(1).required(),
  unread_by: Joi.array().optional(),
});

const roomValidation = (data) => {
  const Schema = Joi.object({
    name: Joi.string().optional(),
    description: Joi.string().optional(),
    creator_id: Joi.string().required(),
    members: Joi.array()
      .unique((a, b) => a.id === b.id)
      .required(),
    messages: Joi.array().items(messageSchema).optional(),
    isDark: Joi.boolean().optional(),
  });
  return Schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.roomValidation = roomValidation;
