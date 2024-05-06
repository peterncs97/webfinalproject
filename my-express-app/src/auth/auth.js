const passport = require('passport');
const passportJWT = require('passport-jwt')
const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');

const Exception = require('../base/Exception');
const ExceptionMessage = require('../enums/ExceptionMessage');
const HttpStatus = require('../enums/HttpStatus');

const db = require("../database/db");
const User = db.user;

const pathToPubKey = path.join(__dirname, 'jwt', 'id_rsa_pub.pem');
const pathToPrivKey = path.join(__dirname, 'jwt', 'id_rsa_priv.pem');
const PUB_KEY = fs.readFileSync(pathToPubKey, 'utf8');
const PRIV_KEY = fs.readFileSync(pathToPrivKey, 'utf8');

passport.use('token', new passportJWT.Strategy(
  {
    jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: PUB_KEY
  },
  (payload, done) => {
    User.findByPk(payload.sub)
      .then(user => {
        if (user) return done(null, user);
        return done(null, false);
      }).catch(err => {
        return done(err, false);
      });
  })
);

const validateToken = (req, res, next) => {
  passport.authenticate('token', { session: false },
    (err, user) => {
      if (err) return next(err);
      if (!user) throw Exception(HttpStatus.UNAUTHORIZED, ExceptionMessage.INVALID_TOKEN);
      return next()
    }
  )(req, res, next)
}

const issueJwt = (user) => {
  const id = user.id;
  const expiresIn = '7d';
  const payload = {
    sub: id,
    iat: Date.now()
  };
  const signedToken = jwt.sign(payload, PRIV_KEY, { expiresIn: expiresIn, algorithm: 'RS256' });
  return "Bearer " + signedToken;
}

module.exports = { validateToken, issueJwt};