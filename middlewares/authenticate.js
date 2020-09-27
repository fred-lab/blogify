/**
 * Check if the request is authenticate or not
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
const isAuthenticate = (req, res, next) => {
  if (!req.session || !req.session.isAuth) {
    const err = new Error("Not Authenticate");
    err.statusCode = 401;
    next(err);
  }
  next();
};

module.exports = {
  isAuthenticate,
};
