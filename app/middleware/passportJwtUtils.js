const { ExtractJwt } = require("passport-jwt");
const { EXPRESS_SECRET } = require("../config/env");
const JwtStrategy = require("passport-jwt").Strategy;

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = EXPRESS_SECRET;
module.exports = (passport) => {
  passport.use(
    new JwtStrategy(opts, async (jwtPayload, done) => {
      try {
        const User = require("../models/auth.model");
        const user = await User.findById(jwtPayload.id);
        if (!user) {
          return done(null, false);
        }
        return done(null, user);
      } catch (e) {
        return done(null, false);
      }
    })
  );
};
