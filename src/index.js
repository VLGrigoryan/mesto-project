import './pages/style.css';
import { initialCards, addCard, submitAddCard } from './components/cards.js';
import { openPopup, closePopup } from './components/utils.js'
import { openProfileEditForm, handleProfileForm } from './components/modal.js'
import { enableValidation } from './components/validate.js'

export const profileContainer = document.querySelector('.profile__container');
export const profileEditButton = profileContainer.querySelector('.profile__info-edit-button');
export const formProfileEdit = document.querySelector('#profile-edit');
export const formAddCard = document.querySelector('#profile-addcard');
export const nameInput = document.querySelector('#user-name');
export const activityInput = document.querySelector('#user-activity');
export const profilePopup = document.querySelector('#profile-popup');
export const profileName = profileContainer.querySelector('.profile__info-name');
export const profileActivity = profileContainer.querySelector('.profile__info-activity');
export const cardPopup = document.querySelector('#card-popup');
export const cardPopupOpenButton = document.querySelector('.profile__addcard-button');
export const cardContainer = document.querySelector('.elements');
export const cardTemplate = document.querySelector('#element-template').content;
export const cardName = document.querySelector('#card-name');
export const cardLink = document.querySelector('#card-url');
export const imagePopup = document.querySelector('#image-popup');
export const popupCloseButtons = document.querySelectorAll('.popup__close-button');
export const popupImageContainer = document.querySelector('.popup__image-container');
export const popupImage = document.querySelector('.popup__image');
export const popupCaption = document.querySelector('.popup__image-caption');

export const validationSettings = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__save-button',
  inputErrorSelector: '.form__input-error',
  inactiveButtonClass: 'form__save-button_inactive',
  inputErrorType: 'form__input_type-erorr',
  inputErrorClass: 'form__input-error_active',
  validationMessages: {
    emptyString: 'Вы пропустили это поле.',
    semiEmptyString: 'Минимальное количество символов: 2. Длина текста сейчас: 1 символ.',
    naem: 'Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы',
    activity: 'Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы',
    place: 'Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы',
    link: 'Введите адрес сайта.',
  },
  validationRules: {
    name: {
      required: true,
      minlength: 2,
      maxlength: 40,
      pattern: /^[a-zA-Zа-яА-ЯёЁ0-9_ -]+$/,
    },
    activity: {
      required: true,
      minlength: 2,
      maxlength: 200,
      pattern: /^[a-zA-Zа-яА-ЯёЁ0-9_ -]+$/,
    },
    place: {
      required: true,
      minlength: 2,
      maxlength: 30,
      pattern: /^[a-zA-Zа-яА-ЯёЁ0-9_ -]+$/,
    },
    link: {
      required: true,
      url: true
    },
  },
};

enableValidation(validationSettings)

cardPopupOpenButton.addEventListener('mousedown', () => openPopup(cardPopup));

profileEditButton.addEventListener('mousedown', () => openProfileEditForm());

popupCloseButtons.forEach((popupCloseButton) => {
  const popup = popupCloseButton.closest('.popup');
  popupCloseButton.addEventListener('mousedown', (event) => { closePopup(popup) });
});

formAddCard.addEventListener('submit', submitAddCard)

initialCards.forEach(function (card) {
  addCard(card.name, card.link)
});

formProfileEdit.addEventListener('submit', handleProfileForm);

