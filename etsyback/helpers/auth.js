import jwt from 'jsonwebtoken';
import { SECRET } from './constant';

export async function decodeToken(bearerToken) {
  const token = bearerToken.split(' ')[1];
  return jwt.decode(token, SECRET);
}
