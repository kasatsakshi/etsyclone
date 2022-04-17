import passport from 'passport';
import passportJWT from 'passport-jwt';
import User from "../models/users";
import { SECRET } from './constant';

const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

export default passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey   : SECRET
},
 function (jwtPayload, done) {
   return User.findById(jwtPayload.data.id)
   .then(user => 
   {
     return done(null, user);
   }
 ).catch(err => 
 {
   return done(err);
 });
}
))