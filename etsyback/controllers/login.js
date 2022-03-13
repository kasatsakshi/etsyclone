import { createEntity, findEntity } from "../models";
import bcrypt from "bcrypt";
import { isValidEmail } from "../helpers/validator";

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
  if(!email) {
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

export default async function login(req, res) {
  const input = req.body;
  const trimmedInput = cleanInput(input);
  const inputError = await validateInput(trimmedInput);

  if(inputError) {
    return res.status(400).json({message: inputError});
  }

  const findUser = await findEntity('user', ['*'], ['email', trimmedInput.email]);
  //Check if this user email exists
  if(findUser.length === 0) {
    console.error("Account does not exists!");
    // Adding the below message so someone cannot create fake accounts
    return res.status(400).json({message: "Invalid Username and Password"});
  }

  const isValidPassword = await bcrypt.compare(trimmedInput.password, findUser[0].password);
  if(!isValidPassword) {
    console.error("Invalid Username and Password");
    return res.status(400).json({message: "Invalid Username and Password"});
  }

  const address = await findEntity('address', ['*'], ['id', findUser[0].addressId]);
  delete findUser[0].addressId;
  const response = {
    ...findUser[0],
    address: address[0]
  }

  return res.status(200).json(response);
}
