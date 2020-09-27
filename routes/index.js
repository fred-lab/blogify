const express = require("express");
const router = express.Router();
const debug = require("debug")("blogify:server");
const { homepage } = require("../controllers/homepage");
const { login, logout } = require("../controllers/user");
const { isAuthenticate } = require("../middlewares/authenticate");

/** Unprotected routes */

/* GET home page. */
router.get("/", homepage);

/* POST User login */
router.post("/login", login);

/** Protected routes */
router.use(isAuthenticate);

/** GET User logout */
router.get("/logout", logout);

/** test */
router.get("/test", (req, res) => {
  debug("auth res", req.session);

  return res.json("auth route");
});

module.exports = router;
