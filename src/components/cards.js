import { openPopup, closePopup, buttonLoadingState } from './utils.js';
import { cardPopup, cardContainer, cardTemplate, cardName, cardLink, imagePopup, popupImage, popupCaption, userId, submitButtonCard } from '../index.js';
import { uploadNewCard, uploadDislikes, uploadlikes, deleteUploadedCard } from './api.js';

export function createCard(data) {
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  const cardImage = cardElement.querySelector('.element__image');
  const cardTitle = cardElement.querySelector('.element__heading');
  const cardLikeButton = cardElement.querySelector('.element__like-button');
  const cardlikes = cardElement.querySelector('.element__like-quantity');

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;
  cardlikes.textContent = data.likes.length || 0;

  if (data.owner._id === userId) {
    const deleteButton = cardElement.querySelector('.element__delete-button');
    deleteButton.addEventListener('click', () => deleteUploadedCard(data, cardElement));
    if (deleteButton) {
      deleteButton.style.display = 'block';
    } else {
      deleteButton.style.display = 'none';
    }
  }

  const handleLike = (event) => {
    const cardElement = event.target.closest('.element');
    const cardlikes = cardElement.querySelector('.element__like-quantity');
    if (!cardLikeButton.classList.contains('element__like-button_checked')) {
      uploadlikes(data, cardlikes)
    } else {
      uploadDislikes(data, cardlikes)
    }
    cardLikeButton.classList.toggle('element__like-button_checked');
  }

  cardLikeButton.addEventListener('click', handleLike);
  if (data.likes.some(item => item._id === userId)) {
    cardLikeButton.classList.add('element__like-button_checked')
  };

  cardImage.addEventListener('click', () => {
    openPopup(imagePopup);
    popupImage.src = data.link;
    popupImage.alt = data.name;
    popupCaption.textContent = data.name;
  });
  return cardElement;
}

export function renderCard(data) {
  cardContainer.prepend(data);
}

export function addCard(data) {
  const newCard = createCard(data);
  renderCard(newCard);
}

export function submitAddCard(event) {
  event.preventDefault();
  const name = cardName.value;
  const link = cardLink.value;
  buttonLoadingState('Сохранение...', 'Сохранить', true, submitButtonCard);
  uploadNewCard(name, link).then(() => {
    cardName.value = '';
    cardLink.value = '';
    closePopup(cardPopup);
  })
    .finally(() => {
      buttonLoadingState('Сохранение...', 'Сохранить', false, submitButtonCard);
    });
};
