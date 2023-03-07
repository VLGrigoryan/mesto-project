const profileContainer = document.querySelector('.profile__container');
const profileEditButton = profileContainer.querySelector('.profile__info-edit-button');
const formElement = document.querySelector('.form');
const nameInput = document.querySelector('#user-name');
const activityInput = document.querySelector('#user-activity');
const profilePopup = document.querySelector('#profile-popup');
const cardPopup = document.querySelector('#card-popup');
const cardPopupOpenButton = document.querySelector('.profile__addcard-button');
const saveCardButton = cardPopup.querySelector('#saveCardButton');
const cardContainer = document.querySelector('.elements');
const cardTemplate = document.querySelector('#element-template').content;
const cardName = document.querySelector('#card-name');
const cardLink = document.querySelector('#card-url');
const imagePopup = document.querySelector('#image-popup');
const popupCloseButtons = document.querySelectorAll('.popup__close-button');
const popup = document.querySelector('.popup');
const popupImageContainer = document.querySelector('.popup__image-container');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__image-caption');

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', (evt) => handleEscClose(evt, popup));
};

profileEditButton.addEventListener('click', () => openPopup(profilePopup));

cardPopupOpenButton.addEventListener('click', () => openPopup(cardPopup));

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEscClose);
}

popupCloseButtons.forEach((popupCloseButton) => {
  popupCloseButton.addEventListener('click', (event) => {
    const popup = event.target.closest('.popup');
    if (popup.classList.contains('popup_opened')) {
      closePopup(popup);
    }
  });
});

function handleEscClose(evt, popup) {
  if (evt.key === `Escape`) {
    closePopup(popup)
  }
}

function handleFormSubmit(event) {
  event.preventDefault();

  const name = nameInput.value;
  const activity = activityInput.value;

  const profileName = profileContainer.querySelector('.profile__info-name');
  const profileActivity = profileContainer.querySelector('.profile__info-activity');

  profileName.textContent = name;
  profileActivity.textContent = activity;

  closePopup(profilePopup);
};

formElement.addEventListener('submit', handleFormSubmit);

function createCard(name, link) {

  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  const cardImage = cardElement.querySelector('.element__image');
  const cardTitle = cardElement.querySelector('.element__heading');

  cardImage.src = link;
  cardImage.alt = name;
  cardTitle.textContent = name;


  cardElement.querySelector('.element__like-button').addEventListener('click', () => {
    cardElement.querySelector('.element__like-button').classList.toggle('element__like-button_checked');
  });

  cardElement.querySelector('.element__delete-button').addEventListener('click', () => {
    cardElement.remove();
  });

  cardImage.addEventListener('click', () => {
    openPopup(imagePopup);
    popupImage.src = link;
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

saveCardButton.addEventListener('click', function (event) {
  event.preventDefault();
  const nameValue = cardName.value;
  const linkValue = cardLink.value;

  addCard(nameValue, linkValue);

  cardName.value = '';
  cardLink.value = '';
  closePopup(cardPopup);
});
initialCards.forEach(function (card) {
  addCard(card.name, card.link)
});
