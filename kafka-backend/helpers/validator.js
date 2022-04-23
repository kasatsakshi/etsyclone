import validator from 'validator';

function isValidEmail(emailAddress) {
  return validator.isEmail(emailAddress);
}

export {
  isValidEmail,
};
