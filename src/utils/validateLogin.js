export const validateLogin = (email, password) => {
  let temp = validateEmail(email);
  if (temp) return temp;

  temp = validatePassword(password);
  if (temp) return temp;

  return null; // everything is valid
};

function validateEmail(value) {
  const emailRe = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  if (!value) return "Email is required.";
  return emailRe.test(value)
    ? null
    : "Please enter a valid email address.";
}

function validatePassword(value) {
  const passRe = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  if (!value) return "Password is required.";
  return passRe.test(value)
    ? null
    : "Password must be at least 8 characters and contain letters and numbers.";
}
