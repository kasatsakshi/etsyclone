import bcrypt from 'bcrypt';
import { findOneEntity, updateOneEntity } from '../models';
import { isValidEmail } from '../helpers/validator';
import User from '../models/users';
import { signToken } from '../helpers/auth';

function cleanInput(input) {
  const {
    email,
  } = input;

  input.email = email.trim();

  return input;
}

async function validateInput(input) {
  const {
    email,
    password,
  } = input;

  let errorMsg;
  if (!email) {
    errorMsg = 'Email is missing';
  } else if (!password) {
    errorMsg = 'Password is missing';
  }

  if (!isValidEmail(email)) {
    errorMsg = 'Email is in incorrect format';
  }

  if (errorMsg) {
    return errorMsg;
  }

  return null;
}

export default async function login(req, res) {
  const input = req.body;
  const trimmedInput = cleanInput(input);
  const inputError = await validateInput(trimmedInput);

  if (inputError) {
    return res.status(400).json({ message: inputError });
  }

  const findUser = await findOneEntity(User, { email: trimmedInput.email });
  // Check if this user email exists
  if (!findUser) {
    console.error('Account does not exists!');
    // Adding the below message so someone cannot create fake accounts
    return res.status(400).json({ message: 'Invalid Username and Password' });
  }

  const isValidPassword = await bcrypt.compare(trimmedInput.password, findUser.password);
  if (!isValidPassword) {
    console.error('Invalid Username and Password');
    return res.status(400).json({ message: 'Invalid Username and Password' });
  }

  await updateOneEntity(
    User,
    { _id: findUser._id },
    { lastLoginAt: new Date(), updatedAt: new Date() },
  );

  const response = ({ ...findUser }._doc);
  delete response.password;

  // Generate JWT token
  const token = await signToken(findUser);

  res.set({
    'X-Auth-Token': token,
  });
  return res.status(200).json(response);
}
