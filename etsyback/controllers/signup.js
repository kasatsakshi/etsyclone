import { createEntity, findEntity } from "../models";
import bcrypt from "bcrypt";
import { isValidEmail } from "../helpers/validator";

function cleanInput(input) {
  const {
    email,
    name
  } = input;

  input.email = email.trim();
  input.name = name.trim();

  return input;
}

async function validateInput(input) {
  const {
    email,
    password,
    name
  } = input;

  let errorMsg;
  if(!name) {
    errorMsg = 'Name is missing';
  } else if(!email) {
    errorMsg = 'Email is missing';
  } else if(!password) {
    errorMsg = 'Password is missing'
  }

  if(!isValidEmail(email)) {
    errorMsg = 'Email is in incorrect format';
  }

  if(errorMsg) {
    return errorMsg;
  }

  return;
} 

export default async function signup(req, res) {
  const input = req.body;
  const trimmedInput = cleanInput(input);
  const inputError = await validateInput(trimmedInput);

  if(inputError) {
    return res.status(400).json({message: inputError});
  }

  const findUser = await findEntity('user', ['*'], ['email', trimmedInput.email]);

  //Check if this user email exists
  if(findUser.length !== 0) {
    return res.status(400).json({message: "Email Address already exists"});
  }

  let addressId;
  if(input.address) {
    addressId = await createEntity('address', trimmedInput.address);
    delete trimmedInput.address;
  }
  const salt = await bcrypt.genSalt(10);
  // now we set user password to hashed password
  const hashedPassword = await bcrypt.hash(input.password, salt);
  const userData = {
    ...input,
    addressId: addressId[0] || null,
    userLevel: 0,
    userStatus: 'active',
    lastLoginAt: new Date(),
    password: hashedPassword,
  };
  const user = await createEntity('user', userData);
  const createdUser = await findEntity('user', ['*'], ['id', user[0]]);
  let response;
  if(createdUser.length >0 && createdUser[0].addressId) {
    const address = await findEntity('address', ['*'], ['id', createdUser[0].addressId]);
    delete createdUser[0].addressId;
    response = {
      ...createdUser[0],
      address: address[0]
    } 
  }

  return res.status(200).json(response);
}
