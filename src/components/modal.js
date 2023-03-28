

import {openPopup, closePopup} from  './utils.js';
import {nameInput, activityInput, profileName, profileActivity, profilePopup} from  '../index.js';

function openProfileEditForm() {
  nameInput.value = profileName.textContent;
  activityInput.value = profileActivity.textContent;

  openPopup(profilePopup);
};


function handleProfileForm(event) {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileActivity.textContent = activityInput.value;

  closePopup(profilePopup);
};

export {openProfileEditForm, handleProfileForm}
