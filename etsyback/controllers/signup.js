import { createEntity, findEntity } from "../models";

async function validateInput(input) {
  const {
    name,
    email,
    password,
    gender,
    phone,
    birthday,
    bio,
    currency,
    address
  } = input;

  //TODO: trim all white spaces
  //TODO: apply validations wherever possible and return error from here

  // return res.status(400).send({
  //   error,
  // });

  return;
} 

export default async function signup(req, res) {
  const input = req.body;

  await validateInput(input);


  // await createEntity(user, input);
  // const address = await findEntity('address', ['*'], ['id', 1]);
  // console.log(address);
  // const address1 = await findEntity('address', ['address1', 'city'], ['id', 1]);
  // console.log(address1);

  return res.status(200).send("Hello new user");
}