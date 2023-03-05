const profileContainer = document.querySelector('.profile__container');
const profileEditButton = profileContainer.querySelector('.profile__info-edit-button');
const profileName = profileContainer.querySelector('.profile__info-name');
const profileActivity = profileContainer.querySelector('.profile__info-activity');

const profileEditor = document.querySelector('.profile-editor');
const profileEditorCloseButton = profileEditor.querySelector('.form__close-button');
const userName = profileEditor.querySelector('#user-name');
const userActivity = profileEditor.querySelector('#user-activity');
const profileInfoSaveButton = profileEditor.querySelector('.form__save-button');

const postPublisher = document.querySelector('.elements-publisher');
const postPublisherOpenButton = document.querySelector('.profile__addpost-button');
const postPublisherCloseButton = postPublisher.querySelector('#elementsPublisherCloseButton');
const savePostButton = postPublisher.querySelector('#savePostButton');

const postContainer = document.querySelector('.elements');
const post = postContainer.querySelector('.element');
const postImage = postContainer.querySelector('.element__post-image');
const postName = postContainer.querySelector('.element__post-heading')

const popup = document.querySelector('.popup');
const popupContainer = popup.querySelector('.popup__container');
const popupImage = popup.querySelector('.popup__image');
const popupName = popup.querySelector('.popup__heading');
const popupCloseButton = popup.querySelector('.popup__close-button');


function openProfileEditor() {
  profileEditor.classList.add('profile-editor_opened');
};

profileEditButton.addEventListener('click', openProfileEditor);

function closeProfileEditor() {
  profileEditor.classList.remove('profile-editor_opened');
};

profileEditorCloseButton.addEventListener('click', closeProfileEditor);

profileInfoSaveButton.addEventListener('click', (reg) => {
  reg.preventDefault();

  const name = userName.value;
  const activity = userActivity.value;

  profileName.textContent = name;
  profileActivity.textContent = activity;

  closeProfileEditor();
});


function openPostPublisher() {
  postPublisher.classList.add('elements-publisher_opened');
};

postPublisherOpenButton.addEventListener('click', openPostPublisher);

function closePostPublisher() {
  postPublisher.classList.remove('elements-publisher_opened');
};

postPublisherCloseButton.addEventListener('click', closePostPublisher);

function openPopup() {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleEscClose)
};

function closePopup() {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEscClose)
};

function handleEscClose(evt) {
  if (evt.key === 'Escape') {
    closePopup();
  }
};
popupCloseButton.addEventListener('click', closePopup);

function postLikeToggle() {
  const likeButtons = document.querySelectorAll('.element__post-like-button');

  likeButtons.forEach(function (likeButton) {
    document.addEventListener('click', function (event) {
      const likedButton = event.target.closest('.element__post-like-button');
      if (likedButton) {
        likedButton.classList.toggle('element__post-like-button_checked')
      }
    });
  });
};

function deletePost() {
  const deleteButtons = document.querySelectorAll('.element__post-delete-button')

  deleteButtons.forEach(function (deleteButton) {
    deleteButton.addEventListener('click', function (event) {
      const parentElement = deleteButton.closest('.element');
      parentElement.remove();
    });
  });
};

function showPostImage() {
  const postImages = postContainer.querySelectorAll('.element__post-image');

  postImages.forEach(function (postImage) {
    postImage.addEventListener('click', function (event) {
      const showImage = event.target.closest('.element__post-image');
      if (showImage) {
        popupImage.src = showImage.src;
        popupImage.alt = showImage.alt;
        popupName.textContent = showImage.closest('.element').querySelector('.element__post-heading').textContent;;
        openPopup();
      }
    });
  });
};

function addPost(nameValue, linkValue) {
  const postTemplate = document.querySelector('#element-template').content;
  const element = postTemplate.querySelector('.element').cloneNode(true);

  element.querySelector('.element__post-image').src = linkValue;
  element.querySelector('.element__post-image').alt = nameValue;
  element.querySelector('.element__post-heading').textContent = nameValue;

  postContainer.prepend(element);
  postLikeToggle();
  showPostImage();
  deletePost();
};

savePostButton.addEventListener('click', function (event) {
  event.preventDefault();

  const name = document.querySelector('#post-name');
  const link = document.querySelector('#post-url');
  const nameValue = name.value;
  const linkValue = link.value;

  addPost(nameValue, linkValue);

  name.value = '';
  link.value = '';

  closePostPublisher();
});

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

initialCards.forEach(function (card) {
  addPost(card.name, card.link)
});


