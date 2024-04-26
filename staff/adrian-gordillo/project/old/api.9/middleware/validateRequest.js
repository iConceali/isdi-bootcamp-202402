// api/middleware/validateRequest.js

export default (validatorFunc) => (req, res, next) => {
  const { error } = validatorFunc(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  next();
};
