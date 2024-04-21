// api/middleware/validateRequest.js

module.exports = (validatorFunc) => (req, res, next) => {
  const { error } = validatorFunc(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  next();
};
