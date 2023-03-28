import { openPopup, closePopup } from './utils.js';
import {cardPopup, cardContainer, cardTemplate, cardName, cardLink, imagePopup, popupImageContainer, popupImage, popupCaption } from './index.js';

function createCard(name, link) {

  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  const cardImage = cardElement.querySelector('.element__image');
  const cardTitle = cardElement.querySelector('.element__heading');
  const cardLikeButton = cardElement.querySelector('.element__like-button')

  cardImage.src = link;
  cardImage.alt = name;
  cardTitle.textContent = name;

  cardLikeButton.addEventListener('click', () => {
    cardLikeButton.classList.toggle('element__like-button_checked');
  });

  cardElement.querySelector('.element__delete-button').addEventListener('click', () => {
    cardElement.remove();
  });

  cardImage.addEventListener('click', () => {
    openPopup(imagePopup);
    popupImage.src = link;
    popupImage.alt = name;
    popupCaption.text = name;
  });

  return cardElement;
}

function renderCard(card) {
  cardContainer.prepend(card);
}

function addCard(name, link) {
  const newCard = createCard(name, link);
  renderCard(newCard);
}

function submitAddCard(event) {
  event.preventDefault();
  const nameValue = cardName.value;
  const linkValue = cardLink.value;

  addCard(nameValue, linkValue);

  cardName.value = '';
  cardLink.value = '';
  closePopup(cardPopup);
};


const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

export { initialCards, createCard, renderCard, addCard, submitAddCard }

