import { formProfileEdit, formAddCard, } from '../index.js';

const setEventListeners = (formElement, validationSettings) => {
  const saveButton = formElement.querySelector(validationSettings.submitButtonSelector);
  const inputList = Array.from(formElement.querySelectorAll(validationSettings.inputSelector));

  const showInputError = (inputElement) => {
    const errorElement = inputElement.nextElementSibling;
    inputElement.classList.add(validationSettings.inputErrorType);
    errorElement.classList.add(validationSettings.inputErrorClass);
  };

  const hideInputError = (inputElement) => {
    const errorElement = inputElement.nextElementSibling;
    inputElement.classList.remove(validationSettings.inputErrorType);
    errorElement.classList.remove(validationSettings.inputErrorClass);
  };

  const checkInputValidity = (inputElement) => {
    const errorElement = inputElement.nextElementSibling;
    if (inputElement.value === '') {
      showInputError(inputElement);
      errorElement.textContent = inputElement.getAttribute('data-error-empty-string');
    } else if (inputElement.type === 'url' && inputElement.validity.typeMismatch) {
      showInputError(inputElement);
      errorElement.textContent = inputElement.getAttribute('data-error-link');
    } else if (inputElement.value.trim().length === 1) {
      showInputError(inputElement);
      errorElement.textContent = inputElement.getAttribute('data-error-semi-empty-string');
    } else if (inputElement.validity.patternMismatch) {
      showInputError(inputElement);
      errorElement.textContent = inputElement.getAttribute('data-error-pattern');
    } else {
      hideInputError(inputElement);
    }
    toggleButtonState(inputList, saveButton);
  };

  const toggleButtonState = (inputList, saveButton) => {
    if (inputList.some((inputElement) => !inputElement.validity.valid)) {
      saveButton.classList.add(validationSettings.inactiveButtonClass);
      saveButton.setAttribute('disabled', true);
    } else {
      saveButton.classList.remove(validationSettings.inactiveButtonClass);
      saveButton.removeAttribute('disabled');
    }
  };
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(inputElement);
    });
  });
  toggleButtonState(inputList, saveButton);
};

const enableValidation = (validationSettings) => {
  setEventListeners(formProfileEdit, validationSettings);
  setEventListeners(formAddCard, validationSettings);
}

export { enableValidation }
