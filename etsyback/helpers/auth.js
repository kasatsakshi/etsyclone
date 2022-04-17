import jwt from 'jsonwebtoken';
import { SECRET } from './constant';

export async function signToken(user) {
  return jwt.sign({
    data: { id : user._id, email : user.email},
    exp: new Date().setDate(new Date().getDate() + 1)
  },SECRET);
}