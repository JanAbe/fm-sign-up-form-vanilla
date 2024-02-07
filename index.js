const registrationForm = document.querySelector("form");

const firstNameInput = document.querySelector("#firstNameInput");
const lastNameInput = document.querySelector("#lastNameInput");
const emailInput = document.querySelector("#emailInput");
const passwordInput = document.querySelector("#passwordInput");

const firstNameRequiredError = document.querySelector(
  "#firstNameRequiredError",
);
const lastNameRequiredError = document.querySelector("#lastNameRequiredError");
const emailRequiredError = document.querySelector("#emailRequiredError");
const emailInvalidError = document.querySelector("#emailInvalidError");
const passwordRequiredError = document.querySelector("#passwordRequiredError");

const DONT_SHOW_ERROR_CLASS = "sr-only";
const BACKGROUND_ERROR_IMAGE_CLASS = "bg-error";
const ERROR_CLASS = "error";
const DEFAULT_INPUT_BORDER = "input-border";

const emailRegex = new RegExp("^[^@]+@[^@]+.[^@]+$");

const addFirstNameErrorClasses = () => {
  firstNameRequiredError.classList.remove(DONT_SHOW_ERROR_CLASS);
  firstNameInput.classList.add(BACKGROUND_ERROR_IMAGE_CLASS);
  firstNameInput.classList.remove(DEFAULT_INPUT_BORDER);
  firstNameInput.classList.add(ERROR_CLASS);
};

const resetFirstNameInput = () => {
  firstNameRequiredError.classList.add(DONT_SHOW_ERROR_CLASS);
  firstNameInput.classList.remove(BACKGROUND_ERROR_IMAGE_CLASS);
  firstNameInput.classList.add(DEFAULT_INPUT_BORDER);
};

const addLastNameErrorClasses = () => {
  lastNameRequiredError.classList.remove(DONT_SHOW_ERROR_CLASS);
  lastNameInput.classList.add(BACKGROUND_ERROR_IMAGE_CLASS);
  lastNameInput.classList.remove(DEFAULT_INPUT_BORDER);
  lastNameInput.classList.add(ERROR_CLASS);
};

const resetLastNameInput = () => {
  lastNameRequiredError.classList.add(DONT_SHOW_ERROR_CLASS);
  lastNameInput.classList.remove(BACKGROUND_ERROR_IMAGE_CLASS);
  lastNameInput.classList.add(DEFAULT_INPUT_BORDER);
};

const addEmailErrorClasses = () => {
  emailInput.classList.add(BACKGROUND_ERROR_IMAGE_CLASS);
  emailInput.classList.remove(DEFAULT_INPUT_BORDER);
  emailInput.classList.add(ERROR_CLASS);
};

const resetEmailInput = () => {
  emailRequiredError.classList.add(DONT_SHOW_ERROR_CLASS);
  emailInvalidError.classList.add(DONT_SHOW_ERROR_CLASS);
  emailInput.classList.remove(BACKGROUND_ERROR_IMAGE_CLASS);
  emailInput.classList.add(DEFAULT_INPUT_BORDER);
};

const addPasswordErrorClasses = () => {
  passwordRequiredError.classList.remove(DONT_SHOW_ERROR_CLASS);
  passwordInput.classList.add(BACKGROUND_ERROR_IMAGE_CLASS);
  passwordInput.classList.remove(DEFAULT_INPUT_BORDER);
  passwordInput.classList.add(ERROR_CLASS);
};

const resetPasswordInput = () => {
  passwordRequiredError.classList.add(DONT_SHOW_ERROR_CLASS);
  passwordInput.classList.remove(BACKGROUND_ERROR_IMAGE_CLASS);
  passwordInput.classList.add(DEFAULT_INPUT_BORDER);
};

/**
 * Reset input fields to non-error state.
 */
const resetFields = () => {
  resetFirstNameInput();
  resetLastNameInput();
  resetEmailInput();
  resetPasswordInput();
};

const validateInput = () => {
  let valid = true;
  if (firstNameInput.validity.valueMissing) {
    addFirstNameErrorClasses();
    valid = false;
  }

  if (lastNameInput.validity.valueMissing) {
    addLastNameErrorClasses();
    valid = false;
  }

  if (emailInput.validity.valueMissing) {
    emailRequiredError.classList.remove(DONT_SHOW_ERROR_CLASS);
    addEmailErrorClasses();
    valid = false;
  }

  if (emailInput.validity.patternMismatch) {
    emailInvalidError.classList.remove(DONT_SHOW_ERROR_CLASS);
    addEmailErrorClasses();
    valid = false;
  }

  if (passwordInput.validity.valueMissing) {
    addPasswordErrorClasses();
    valid = false;
  }

  return valid;
};

firstNameInput.addEventListener("input", (event) => {
  const providedFirstName = event.target.value;
  if (providedFirstName) {
    resetFirstNameInput();
  } else {
    addFirstNameErrorClasses();
  }
});

lastNameInput.addEventListener("input", (event) => {
  const providedLastName = event.target.value;
  if (providedLastName) {
    resetLastNameInput();
  } else {
    addLastNameErrorClasses();
  }
});

emailInput.addEventListener("input", (event) => {
  const providedEmail = event.target.value;
  const isValidEmail = emailRegex.test(providedEmail);
  if (providedEmail) {
    resetEmailInput();
    if (!isValidEmail) {
      emailInvalidError.classList.remove(DONT_SHOW_ERROR_CLASS);
      addEmailErrorClasses();
    }
  } else {
    emailRequiredError.classList.remove(DONT_SHOW_ERROR_CLASS);
    emailInvalidError.classList.add(DONT_SHOW_ERROR_CLASS);
    addEmailErrorClasses();
  }
});

passwordInput.addEventListener("input", (event) => {
  const providedPassword = event.target.value;
  if (providedPassword) {
    resetPasswordInput();
  } else {
    addPasswordErrorClasses();
  }
});

registrationForm.addEventListener("submit", (event) => {
  resetFields();
  const isValidForm = validateInput();
  if (isValidForm) {
    registrationForm.reset();
  }
  event.preventDefault();
});
