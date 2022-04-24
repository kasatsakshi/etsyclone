import bcrypt from 'bcrypt';
import { createEntity, findOneEntity } from '../models';
import { isValidEmail } from '../helpers/validator';
import User from '../models/users';
import { signToken } from '../helpers/auth';

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
export const signup = async (input, callback) => {
  const trimmedInput = cleanInput(input);
  const inputError = await validateInput(trimmedInput);

  if (inputError) {
    const response = {
      message: inputError,
      status: 400,
    };
    callback(null, response);
  }

  const findUser = await findOneEntity(User, { email: trimmedInput.email });

  // Check if this user email exists
  if (findUser) {
    console.error('Email Address already exists');
    const response = {
      message: 'Email Address already exists',
      status: 400,
    };
    callback(null, response);
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(trimmedInput.password, salt);
  trimmedInput.password = hashedPassword;

  const userData = new User({
    ...trimmedInput,
    userLevel: 0,
    userStatus: 'active',
    lastLoginAt: new Date(),
  });
  const createdUser = await createEntity(userData);

  if (!createdUser) {
    console.error('Signup failed. Try again');
    const response = {
      message: 'Signup failed. Try again',
      status: 500,
    };
    callback(null, response);
  }

  const data = ({ ...createdUser }._doc);
  delete data.password;

  // Generate JWT token
  const token = await signToken(createdUser);

  const response = {
    token,
    message: data,
    status: 200,
  };

  callback(null, response);
};
