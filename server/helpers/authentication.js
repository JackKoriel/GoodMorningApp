const authRequired = (req, res, next) => {
  if (req.session.handle) {
    next();
  } else {
    res.status(401).json({ error: "not logged in", message: "not logged in" });
  }
};

module.exports = { authRequired };
