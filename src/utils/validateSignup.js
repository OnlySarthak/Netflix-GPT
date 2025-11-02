export const validateSignUp = (name, email, password, password2) => {
  // Name
  let temp = validateName(name);
  if (temp) return temp;

  // Email
  temp = validateEmail(email);
  if (temp) return temp;

  // Password
  temp = validatePassword(password, password2);
  if (temp) return temp;

  return null; // everything is valid
};

function validateName(value) {
  const nameRe = /^[A-Za-zÀ-ÖØ-öø-ÿ' -]{2,50}$/;
  if (!value) return "Name is required.";
  return nameRe.test(value)
    ? null
    : "Use only letters, spaces, hyphens or apostrophes (2–50 characters).";
}

function validateEmail(value) {
  const emailRe = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  if (!value) return "Email is required.";
  return emailRe.test(value)
    ? null
    : "Please enter a valid email address (example@domain.com).";
}

function validatePassword(value, value2) {
  const passRe = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  if (!value) return "Password is required.";
  if (!passRe.test(value))
    return "Password must be at least 8 characters and contain letters and numbers.";
  if (value !== value2) return "Passwords must match.";

  return null;
}
