export const isValidEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

export const isValidRole = (role) => {
  return role === 'DONOR' || role === 'CHARITY';
};

export const isValidPositiveNumber = (num) => {
  return typeof num === 'number' && !isNaN(num) && num > 0;
};
