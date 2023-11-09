import ajv from "ajv";

const userSchema = new ajv.Schema({
  type: "object",
  properties: {
    username: { type: "string", minLength: 3, maxLength: 30 },
    email: { type: "string", format: "email" },
    password: { type: "string", minLength: 8, maxLength: 30 },
  },
  required: ["username", "email", "password"],
  additionalProperties: false,
});

const userUpdateSchema = new ajv.Schema({
  type: "object",
  properties: {
    password: { type: "string", minLength: 8, maxLength: 30 },
  },
  required: [password],
  additionalProperties: false,
});

export const validateUser = (req, res, next) => {
  const valid = userSchema.validate(req.body);
  if (!valid) {
    return res.status(400).json({
      message: "Bad request",
      errors: userSchema.errors,
    });
  }
  next();
};

export const validateUserUpdate = (req, res, next) => {
  const valid = userUpdateSchema.validate(req.body);
  if (!valid) {
    return res.status(400).json({
      message: "Bad request",
      errors: userUpdateSchema.errors,
    });
  }
  next();
};
