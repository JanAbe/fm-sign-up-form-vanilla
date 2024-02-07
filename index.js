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

const emailRegex = new RegExp("^[^@]+@[^@]+\\.[^@]+$");

const errorMessages = {
  "firstNameRequiredError": "First Name cannot be empty",
  "lastNameRequiredError": "Last Name cannot be empty",
  "emailRequiredError": "Email cannot be empty",
  "emailInvalidError": "Looks like this is not an email",
  "passwordRequiredError": "Password cannot be empty"
}

/**
 * Adds the error css-class to the inputElement and shows error text
 * @param inputElement input element to add error classes to
 * @param correspondingError the error field that belongs to the provided input element
 * @param errorMessage the message to show
 */
const addError = (inputElement, correspondingError, errorMessage) => {
  inputElement.classList.add("error");
  correspondingError.textContent = errorMessage;
  correspondingError.classList.remove("sr-only");
};

/**
 * Removes error css-classes from the inputElement and hides error text
 * @param inputElement input element to remove error classes from
 * @param correspondingError the error field that belongs to the provided input element
 */
const removeError = (inputElement, correspondingError) => {
  inputElement.classList.remove("error");
  correspondingError.textContent = "";
  correspondingError.classList.add("sr-only");
};

/**
 * Adds on change validation to the provided inputElement.
 * It runs the provided validationFn on each keystroke.
 * If the validationFn returns true -> show the error.
 * Else -> hide error.
 * @param inputElement the input element to which the event listener needs to be added.
 * @param correspondingError the error that belongs to the provided input
 * @param errorMessage the message to show
 * @param validationFn the validation function. If returns true -> error class is shown else -> error class removed
 */
const addOnChangeValidation = (inputElement, correspondingError, errorMessage, validationFn) => {
  inputElement.addEventListener("input", (event) => {
    if (validationFn(event.target.value)) {
      addError(inputElement, correspondingError, errorMessage);
    } else {
      removeError(inputElement, correspondingError);
    }
  });
}

const validateInput = () => {
  let valid = true;

  if (firstNameInput.validity.valueMissing) {
    addError(
      firstNameInput,
      firstNameRequiredError,
      errorMessages.firstNameRequiredError
    );
    valid = false;
  }

  if (lastNameInput.validity.valueMissing) {
    addError(lastNameInput, lastNameRequiredError, errorMessages.lastNameRequiredError);
    valid = false;
  }

  if (emailInput.validity.valueMissing) {
    addError(emailInput, emailRequiredError, errorMessages.emailRequiredError);
    valid = false;
  }

  if (emailInput.validity.patternMismatch) {
    addError(emailInput, emailInvalidError, errorMessages.emailInvalidError);
    valid = false;
  }

  if (passwordInput.validity.valueMissing) {
    addError(passwordInput, passwordRequiredError, errorMessages.passwordRequiredError);
    valid = false;
  }

  return valid;
};

const resetFields = () => {
  removeError(firstNameInput, firstNameRequiredError);
  removeError(lastNameInput, lastNameRequiredError);
  removeError(emailInput, emailRequiredError);
  removeError(emailInput, emailInvalidError);
  removeError(passwordInput, passwordRequiredError);
};

const isEmpty = (value) => value === "";
const isInvalidEmail = (value) => !emailRegex.test(value);

addOnChangeValidation(firstNameInput, firstNameRequiredError, errorMessages.firstNameRequiredError, isEmpty);
addOnChangeValidation(lastNameInput, lastNameRequiredError, errorMessages.lastNameRequiredError, isEmpty);
addOnChangeValidation(emailInput, emailRequiredError, errorMessages.emailRequiredError, isEmpty);
addOnChangeValidation(emailInput, emailInvalidError, errorMessages.emailInvalidError, isInvalidEmail);
addOnChangeValidation(passwordInput, passwordRequiredError, errorMessages.passwordRequiredError, isEmpty);

registrationForm.addEventListener("submit", (event) => {
  resetFields();
  const isValidForm = validateInput();
  if (isValidForm) {
    registrationForm.reset();
  }
  event.preventDefault();
});
