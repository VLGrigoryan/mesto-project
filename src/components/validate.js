import { formProfileEdit, formAddCard, validationSettings } from '../index.js';

const setEventListeners = (form) => {
  const inputList = form.querySelectorAll(validationSettings.inputSelector);
  const saveButton = form.querySelector(validationSettings.submitButtonSelector);

  const showInputError = (inputElement) => {
    const errorMessage = inputElement.validationMessage;
    const errorElement = inputElement.nextElementSibling;
    inputElement.classList.add(validationSettings.inputErrorType);
    errorElement.classList.add(validationSettings.inputErrorClass);
    inputElement.setAttribute('data-error', errorMessage);

  };
  const hideInputError = (inputElement) => {
    const errorElement = inputElement.nextElementSibling;
    inputElement.classList.remove(validationSettings.inputErrorType);
    errorElement.classList.remove(validationSettings.inputErrorClass);
    inputElement.removeAttribute('data-error');
  };

  const checkInputValidity = (inputElement) => {
    const errorElement = inputElement.nextElementSibling;
    if (inputElement.value.trim() === '') {
      showInputError(inputElement);
      errorElement.textContent = validationSettings.validationMessages.emptyString;
    } else if (inputElement.type === 'url' && inputElement.validity.typeMismatch) {
      showInputError(inputElement);
      errorElement.textContent = validationSettings.validationMessages.link;
    } else if (inputElement.value.trim().length === 1) {
      showInputError(inputElement);
      errorElement.textContent = validationSettings.validationMessages.semiEmptyString;
    } else if (inputElement.validity.patternMismatch) {
      showInputError(inputElement);
      errorElement.textContent = validationSettings.validationMessages.place;
    } else {
      hideInputError(inputElement);
    }
    toggleButtonState();
  };

  const toggleButtonState = () => {
    const isFormValid = form.checkValidity();
    if (isFormValid) {
      saveButton.classList.remove(validationSettings.inactiveButtonClass);
      saveButton.disabled = false;
    } else {
      saveButton.classList.add(validationSettings.inactiveButtonClass);
      saveButton.disabled = true;
    }
  };

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(inputElement);
      toggleButtonState();
    });
  });

};

const enableValidation = () => {
  setEventListeners(formProfileEdit, formProfileEdit.querySelector('.form__save-button'));
  setEventListeners(formAddCard, formAddCard.querySelector('.form__save-button'));
}

export { enableValidation }
