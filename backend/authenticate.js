const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt;
const fs = require('fs');
const path = require('path');
const User = require('./models/user');
const passport = require('passport')



const pathToKey = path.join(__dirname, 'id_rsa_pub.pem');
const PUB_KEY = fs.readFileSync(pathToKey, 'utf8');

const options = {
  //jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), sonraki sürüm

  jwtFromRequest: ExtractJwt.fromExtractors([
    ExtractJwt.fromUrlQueryParameter('token'),
    ExtractJwt.fromBodyField('token'),
    (req) => {
      let token = null;
      if (req && req.cookies) {
        token = req.cookies['token'];
      }
      return token;
    },
  ]),


  secretOrKey: PUB_KEY,
  algorithms: ['RS256']
};

module.exports = (passport) => {
    passport.use(new JwtStrategy(options, async (jwt_payload, done) => {
        try {

          const user = await User.findOne({ _id: jwt_payload.sub }).exec();
          if (user) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        } catch (error) {
          return done(error, false);
        }
        
    }));
}

module.exports.verifyUser = passport.authenticate('jwt', {session: false});
module.exports.isRestaurant = (req, res, next) => {
    if (req.user && req.user.userType == 'Restaurant' ) {
      return next();
    } else {
      res.status(403).json({ message: 'Unauthorized' });
    }
  }
  
  
module.exports.isPerson = (req, res, next) => {
    if (req.user && req.user.userType == 'Person' ) {
      return next();
    } else {
      res.status(403).json({ message: 'Unauthorized' });
    }
  }