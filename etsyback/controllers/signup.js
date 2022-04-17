import { createEntity, findOneEntity } from '../models';
import { isValidEmail } from '../helpers/validator';
import User from '../models/users';

function cleanInput(input) {
  const {
    email,
    name,
  } = input;

  input.email = email.trim();
  input.name = name.trim();

  return input;
}

async function validateInput(input) {
  const {
    email,
    password,
    name,
  } = input;

  let errorMsg;
  if (!name) {
    errorMsg = 'Name is missing';
  } else if (!email) {
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

export default async function signup(req, res) {
  const input = req.body;
  const trimmedInput = cleanInput(input);
  const inputError = await validateInput(trimmedInput);

  if (inputError) {
    return res.status(400).json({ message: inputError });
  }

  const findUser = await findOneEntity(User, { email: trimmedInput.email });

  // Check if this user email exists
  if (findUser) {
    return res.status(400).json({ message: 'Email Address already exists' });
  }
  const userData = new User({
    ...trimmedInput,
    userLevel: 0,
    userStatus: 'active',
    lastLoginAt: new Date(),
  });
  const createdUser = await createEntity(userData);

  if (!createdUser) {
    return res.status(500).json({ message: 'Signup failed. Try again' });
  }

  const response = ({ ...createdUser }._doc);
  delete response.password;

  return res.status(200).json(response);
}
