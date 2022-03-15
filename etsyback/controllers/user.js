import { findEntity } from "../models";
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
  } = input;

  let errorMsg;
  if (!email) {
    errorMsg = 'Email is missing';
  }

  if (!isValidEmail(email)) {
    errorMsg = 'Email is in incorrect format';
  }

  if (errorMsg) {
    return errorMsg;
  }

  return;
}

export default async function user(req, res) {
  const input = req.body;
  const trimmedInput = cleanInput(input);
  const inputError = await validateInput(trimmedInput);

  if (inputError) {
    return res.status(400).json({ message: inputError });
  }

  const findUser = await findEntity('user', ['*'], ['email', trimmedInput.email]);
  //Check if this user email exists
  if (findUser.length === 0) {
    console.error("Email does not exists!");
    // Adding the below message so someone cannot create fake accounts
    return res.status(400).json({ message: "Email does not exists" });
  }

  // TODO: Use joins here
  const address = await findEntity('address', ['*'], ['id', findUser[0].addressId]);
  delete findUser[0].addressId;
  delete findUser[0].password;
  const response = {
    ...findUser[0],
    address: address[0]
  }

  return res.status(200).json(response);
}
