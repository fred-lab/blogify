const debug = require("debug")("blogify:server");

const login = (req, res) => {
  const { email, password } = req.body;

  debug("login", email, password);

  // Set data you want to have in the session
  req.session.isAuth = true;

  return res.json({ message: "Authenticated" });
};

const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      next(err);
    }
    return res.json({ message: "Logout successfully" });
  });
};

module.exports = {
  login,
  logout,
};
