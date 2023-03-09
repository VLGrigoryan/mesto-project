const profileContainer = document.querySelector('.profile__container');
const profileEditButton = profileContainer.querySelector('.profile__info-edit-button');
const formProfileEdit = document.querySelector('#profile-edit');
const formAddCard = document.querySelector('#profile-addcard');
const nameInput = document.querySelector('#user-name');
const activityInput = document.querySelector('#user-activity');
const profilePopup = document.querySelector('#profile-popup');
const profileName = profileContainer.querySelector('.profile__info-name');
const profileActivity = profileContainer.querySelector('.profile__info-activity');
const cardPopup = document.querySelector('#card-popup');
const cardPopupOpenButton = document.querySelector('.profile__addcard-button');
const cardContainer = document.querySelector('.elements');
const cardTemplate = document.querySelector('#element-template').content;
const cardName = document.querySelector('#card-name');
const cardLink = document.querySelector('#card-url');
const imagePopup = document.querySelector('#image-popup');
const popupCloseButtons = document.querySelectorAll('.popup__close-button');
const popupImageContainer = document.querySelector('.popup__image-container');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__image-caption');

function openPopup(popup) {
  popup.classList.add('popup_opened');
};

cardPopupOpenButton.addEventListener('click', () => openPopup(cardPopup));

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

popupCloseButtons.forEach((popupCloseButton) => {
  const popup = popupCloseButton.closest('.popup');
  popupCloseButton.addEventListener('click', (event) => { closePopup(popup) });
});

function openProfileEditForm() {
  nameInput.value = profileName.textContent;
  activityInput.value = profileActivity.textContent;

  openPopup(profilePopup);
};

profileEditButton.addEventListener('click', () => openProfileEditForm());

function handleProfileForm(event) {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileActivity.textContent = activityInput.value;

  closePopup(profilePopup);
};

formProfileEdit.addEventListener('submit', handleProfileForm);



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

formAddCard.addEventListener('submit', addCardSubmit)

function addCardSubmit(event) {
  event.preventDefault();
  const nameValue = cardName.value;
  const linkValue = cardLink.value;

  addCard(nameValue, linkValue);

  cardName.value = '';
  cardLink.value = '';
  closePopup(cardPopup);
};

initialCards.forEach(function (card) {
  addCard(card.name, card.link)
});
