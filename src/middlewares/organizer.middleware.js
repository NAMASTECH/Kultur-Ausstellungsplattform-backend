import ajv from "ajv";

const organizerSchema = new ajv.Schema({
  type: "object",
  propertis: {
    email: { type: "string", format: "email" },
    password: { type: "string", minLength: 8, maxLength: 30 },
    firstname: { type: "string", minLength: 3, maxLength: 30 },
    lastname: { type: "string", minLength: 3, maxLength: 30 },
    organization: { type: "string", minLength: 3, maxLength: 30 },
  },
  required: ["email", "password", "firstname", "lastname", "organization"],
  additionalProperties: false,
});

export const validateOrganizer = (req, res, next) => {
  const valid = organizerSchema.validate(req.body);
  if (!valid) {
    return res.status(400).json({
      message: "Bad request",
      errors: organizerSchema.errors,
    });
  }
  next();
};
