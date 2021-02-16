var EmailRegex = new RegExp(
  /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
);
var NameRegex = new RegExp(/^[a-zA-Z]{2,40}( [a-zA-Z]{2,40})+$/);

const Joi = require("@hapi/joi");

const registerValidation = (data) => {
  const Schema = Joi.object({
    name: Joi.string().min(5).regex(NameRegex).required(),
    email: Joi.string().min(6).regex(EmailRegex).required(),
    password: Joi.string().min(6).required(),
  });
  return Schema.validate(data);
};

const loginValidation = (data) => {
  const Schema = Joi.object({
    email: Joi.string().min(6).regex(EmailRegex).required(),
    password: Joi.string().min(6).required(),
  });
  return Schema.validate(data);
};

const messageSchema = Joi.object({
  sender_id: Joi.string().required(),
  message_body: Joi.string().min(1).required(),
});

const roomValidation = (data) => {
  const Schema = Joi.object({
    name: Joi.string().optional(),
    description: Joi.string().optional(),
    creator_id: Joi.string().required(),
    members_id: Joi.array()
      .unique((a, b) => a === b)
      .required(),
    messages: Joi.array().items(messageSchema).optional(),
  });
  return Schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.roomValidation = roomValidation;
