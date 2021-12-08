const session = require("express-session");

const superDuperHardPasswordToGuess = "tonyLovesNPM0101!@/tonyIStoby";

const oneDay = 1000 * 60 * 60 * 24;

const sessionStore = new session.MemoryStore();

const sessions = session({
  secret: superDuperHardPasswordToGuess,
  saveUninitialized: true,
  cookie: { maxAge: oneDay },
  resave: false,
  store: sessionStore,
});

module.exports = { sessions };
