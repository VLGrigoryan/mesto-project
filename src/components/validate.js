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

  const toggleButtonState = () => {
    if (inputList.some((inputElement) => !inputElement.validity.valid || inputElement.value.trim() === '')) {
      saveButton.setAttribute('disabled', true);
      saveButton.classList.add(validationSettings.inactiveButtonClass);
    } else {
      saveButton.removeAttribute('disabled');
      saveButton.classList.remove(validationSettings.inactiveButtonClass);
    }
  };


  const checkInputValidity = (inputElement) => {
    const errorElement = inputElement.nextElementSibling;
    if (inputElement.value.trim() === '') {
      showInputError(inputElement);
      errorElement.textContent = inputElement.getAttribute('data-error-empty-string');

    } else if (inputElement.type === 'url' && inputElement.validity.typeMismatch) {
      showInputError(inputElement);
      errorElement.textContent = inputElement.getAttribute('data-error-link');

    } else if (inputElement.value.trim().length === 1) {
      showInputError(inputElement);
      errorElement.textContent = inputElement.getAttribute('data-error-semi-empty-string');

    } else if (inputElement.validity.patternMismatch || /\d/.test(inputElement.value)) {
      showInputError(inputElement);
      errorElement.textContent = inputElement.getAttribute('data-error-pattern');

    } else {
      hideInputError(inputElement);
    }
    toggleButtonState();
  };

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(inputElement);
      toggleButtonState();
    });
  });
  toggleButtonState();
};

const enableValidation = (validationSettings) => {
  const formElements = [formAddCard, formProfileEdit];
  formElements.forEach((formElement) => {
  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
  });

  setEventListeners(formElement,validationSettings );
});

}

export { enableValidation }
