import { formProfileEdit, formAddCard, validationSettings } from '../index.js';

const toggleButtonState = (inputList, saveButton) => {
  const isValid = inputList.every((input) => input.validity.valid);
  saveButton.disabled = !isValid;
  saveButton.classList.toggle(validationSettings.inactiveButtonClass, !isValid);
};

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

const toggleButtonStateFormCard = () => {
  toggleButtonState(Array.from(formAddCard.querySelectorAll(validationSettings.inputSelector)), formAddCard.querySelector(validationSettings.submitButtonSelector));
};

const toggleButtonStateProfileEdit = () => {
  toggleButtonState(Array.from(formProfileEdit.querySelectorAll(validationSettings.inputSelector)), formProfileEdit.querySelector(validationSettings.submitButtonSelector));
};
export { enableValidation, toggleButtonStateFormCard, toggleButtonStateProfileEdit }
