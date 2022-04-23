import passport from 'passport';
import passportJWT from 'passport-jwt';
import User from '../models/users';
import { SECRET } from './constant';

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

export default passport.use(new JWTStrategy(
  {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: SECRET,
  },
  ((jwtPayload, done) => User.findById(jwtPayload.data.id)
    .then((user) => done(null, user)).catch((err) => done(err))),
));
