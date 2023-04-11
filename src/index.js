import './pages/style.css';
import { submitAddCard, addCard } from './components/cards.js';
import { openPopup, closePopup } from './components/utils.js'
import { openProfileEditForm, handleProfileForm, setProfileAvatar } from './components/modal.js'
import { enableValidation, toggleButtonStateProfileEdit, toggleButtonStateFormCard } from './components/validate.js'
import { getUserData, importInitialCards } from './components/api';

export const profileContainer = document.querySelector('.profile__container');
export const profileAvatar = profileContainer.querySelector('.profile__avatar-image')
export const profileAvatarEditButton = profileContainer.querySelector('.profile__avatar-edit-button')
export const profileName = profileContainer.querySelector('.profile__info-name');
export const profileActivity = profileContainer.querySelector('.profile__info-activity');
export const profileEditButton = profileContainer.querySelector('.profile__info-edit-button');
export const cardPopupOpenButton = document.querySelector('.profile__addcard-button');
export const profileAvatarPopup = document.querySelector('#confirm-avatar-popup');
export const profilePopup = document.querySelector('#profile-popup');
export const cardPopup = document.querySelector('#card-popup');
export const imagePopup = document.querySelector('#image-popup');
export const confirmationPopup = document.querySelector('#confirm-delete-popup');
export const popupCloseButtons = document.querySelectorAll('.popup__close-button');
export const cardContainer = document.querySelector('.elements');
export const cardTemplate = document.querySelector('#element-template').content;
export const popupImageContainer = document.querySelector('.popup__image-container');
export const popupImage = popupImageContainer.querySelector('.popup__image');
export const popupCaption = popupImageContainer.querySelector('.popup__image-caption');
export const formProfileEdit = document.querySelector('#profile-edit');
export const nameInput = formProfileEdit.querySelector('#user-name');
export const activityInput = formProfileEdit.querySelector('#user-activity');
export const submitButtonProfile = document.getElementById('submitButtonProfile')
export const profileAvatarForm = document.querySelector('#ConfirmAvatar');
export const avatarInput = document.querySelector('#avatar-url');
export const submitButtonAvatar = document.getElementById('submitButtonAvatar')
export const formAddCard = document.querySelector('#profile-addcard');
export const cardName = formAddCard.querySelector('#card-name');
export const cardLink = formAddCard.querySelector('#card-url');
export const submitButtonCard = document.getElementById('submitButtonCard')
export const userInfo = {
  id: null
}
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
      pattern: /^[a-zA-Zа-яА-ЯёЁ_ -]+$/,
    },
    activity: {
      required: true,
      minlength: 2,
      maxlength: 200,
      pattern: /^[a-zA-Zа-яА-ЯёЁ_ -]+$/,
    },
    place: {
      required: true,
      minlength: 2,
      maxlength: 30,
      pattern: /^[a-zA-Zа-яА-ЯёЁ_ -]+$/,
    },
    link: {
      required: true,
      url: true
    },
  },
};

enableValidation(validationSettings)

profileAvatarEditButton.addEventListener('mousedown', () => {
  openPopup(profileAvatarPopup);
  toggleButtonStateFormCard();
});

cardPopupOpenButton.addEventListener('mousedown', () => {
  openPopup(cardPopup);
  toggleButtonStateFormCard();
});

profileEditButton.addEventListener('mousedown', () => {
  openProfileEditForm();
  toggleButtonStateProfileEdit();
});

popupCloseButtons.forEach((popupCloseButton) => {
  const popup = popupCloseButton.closest('.popup');
  popupCloseButton.addEventListener('mousedown', (event) => { closePopup(popup) });
});

formAddCard.addEventListener('submit', submitAddCard);

formProfileEdit.addEventListener('submit', handleProfileForm);

profileAvatarForm.addEventListener('submit', setProfileAvatar);


Promise.all([
  getUserData(),
  importInitialCards()
]).then(([userData, cardsData]) => {
  profileName.textContent = userData.name;
  profileActivity.textContent = userData.about;
  profileAvatar.src = userData.avatar;
  profileAvatar.alt = userData.name;
  userInfo.id = userData._id
  cardsData.reverse().forEach((data) => {
    addCard(data);
  });
})
  .catch(error => {
    console.error(error);
  });
