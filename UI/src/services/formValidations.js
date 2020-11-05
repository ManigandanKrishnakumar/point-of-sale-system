export const REGEX = {
  NAME: '/^[a-zA-Z ]+$/',
};

export const phoneNumberValidation = (phoneNumber) => {
  return phoneNumber.length === 10;
};
export const nameValidation = (name) => {
  return /^[a-zA-Z ]+$/.test(name) && lengthValidation(name);
};

export const lengthValidation = (value) => {
  return value.length !== 0;
};
