import { openPopup, closePopup, buttonLoadingState } from './utils.js';
import { nameInput, activityInput, profileName, profileActivity, profilePopup, avatarInput, profileAvatar, profileAvatarPopup, validationSettings, submitButtonAvatar, submitButtonProfile } from '../index.js';
import { updateUserProfile, updateUserAvatar } from './api.js';

export function openProfileEditForm() {
  nameInput.value = profileName.textContent;
  activityInput.value = profileActivity.textContent;
  openPopup(profilePopup);
};

export function handleProfileForm(event) {
  event.preventDefault();
  const newName = nameInput.value;
  const newAbout = activityInput.value;
  profileAvatar.alt = newName;
  buttonLoadingState('Сохранение...', 'Сохранить', true, submitButtonProfile);
  updateUserProfile(newName, newAbout)
    .then(userData => {
      profileName.textContent = nameInput.value;
      profileActivity.textContent = activityInput.value;
      buttonLoadingState('Сохранение...', 'Сохранить', false, submitButtonProfile);
      closePopup(profilePopup);
      profileName.textContent = userData.name;
      profileActivity.textContent = userData.about;
    })
    .catch(error => { console.error(error) });
}

export function setProfileAvatar(event) {
  event.preventDefault();
  const newAvatar = avatarInput.value;
  profileAvatar.src = newAvatar;
  buttonLoadingState('Сохранение...', 'Сохранить', true, submitButtonAvatar);
  updateUserAvatar(newAvatar, validationSettings)
    .then(() => {
      buttonLoadingState('Сохранение...', 'Сохранить', false, submitButtonAvatar);
      closePopup(profileAvatarPopup)
      avatarInput.value = ''
    })
    .catch(error => { console.error(error) })
}



