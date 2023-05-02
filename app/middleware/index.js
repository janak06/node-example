const bodyParser = require("body-parser");
const compression = require("compression");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const passportJwtUtils = require("./passportJwtUtils");
const passport = require("passport");
var session = require("express-session");

class Middleware {
  init(app) {
    app.set("PORT", process.env.PORT || 5000);
    app.use(compression());
    app.use(cors());
    app.use(helmet());
    app.use(bodyParser.json({ limit: "20mb" }));
    app.use(bodyParser.urlencoded({ extended: true, limit: "20mb" }));

    /**
     * Passport middleware init
     */
    app.use(
      session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: { secure: true },
      })
    );

    app.use(passport.initialize());
    app.use(passport.session());
    /**
     * Passport strategy
     */
    passportJwtUtils(passport);

    app.use(
      morgan(function (tokens, req, res) {
        return [
          tokens.method(req, res),
          tokens.url(req, res),
          tokens.status(req, res),
          tokens.res(req, res, "content-length"),
          "-",
          tokens["response-time"](req, res),
          "ms",
        ].join(" ");
      })
    );
  }
}

const middlewareObj = new Middleware();
module.exports = middlewareObj;
