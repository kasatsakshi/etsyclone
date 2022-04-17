import express from "express";
import cors from "cors";
import routes from "./routes";
import path from "path";
import mongoose from 'mongoose';
import config from './config';
import passport from 'passport';
import passportJWT from 'passport-jwt';
import User from "./models/users";
import { SECRET } from './helpers/constant';

const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

passport.use(new JWTStrategy({
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


const app = express();
const corsOptions = { origin: '*' };

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public/uploads')); 

app.use('/api/', routes);

app.get('/', (req, res) => {
  res.json({ message: 'Etsy backend server is running' });
});

app.get('/public/uploads/*', (req, res) => {
  const filePath = req.path;
  const fileName = req.params[0];
  const __dirname = path.dirname(fileName);
  res.sendFile(filePath, { root: __dirname });
});

app.get('/public/shop/*', (req, res) => {
  const filePath = req.path;
  const fileName = req.params[0];
  const __dirname = path.dirname(fileName);
  res.sendFile(filePath, { root: __dirname });
});

app.get('/public/products/*', (req, res) => {
  const filePath = req.path;
  const fileName = req.params[0];
  const __dirname = path.dirname(fileName);
  res.sendFile(filePath, { root: __dirname });
});

app.get('/test', passport.authenticate('jwt',{session: false}),(req,res,next)=>{
  res.json("Testing token authentication")
})

// Connect to MongoDB
mongoose
  .connect(config.mongo.uri, config.mongo.connectionOptions)
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

mongoose.Promise = global.Promise;

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
