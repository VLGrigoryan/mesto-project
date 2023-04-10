import { addCard } from './cards.js';
import { nameInput, activityInput, profileName, profileActivity, profileAvatar } from '../index.js';

export function importInitialCards() {
  fetch('https://nomoreparties.co/v1/plus-cohort-22/cards', {
    headers: {
      authorization: 'd00ddee1-e29e-4e26-92aa-43ddefc5b31a'
    }
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
    })
    .then(cardsData => {
      cardsData.reverse().forEach((data) => {
        addCard(data);
      });
    })
    .catch(error => {
      console.error(error);
    });
}

export function getUserInitials() {
  fetch('https://nomoreparties.co/v1/plus-cohort-22/users/me', {
    headers: {
      authorization: 'd00ddee1-e29e-4e26-92aa-43ddefc5b31a'
    }
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
    })
    .then(userData => {
      console.log(userData)
      profileName.textContent = userData.name;
      profileActivity.textContent = userData.about;
      profileAvatar.src = userData.avatar;
      profileAvatar.alt = userData.name
    })
    .catch(error => {
      console.error(error);
    });
}

export function updateUserProfile() {
  return fetch('https://nomoreparties.co/v1/plus-cohort-22/users/me', {
    method: 'PATCH',
    headers: {
      authorization: 'd00ddee1-e29e-4e26-92aa-43ddefc5b31a',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: nameInput.value,
      about: activityInput.value,
    })
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
    })
    .catch(error => {
      console.error(error);
    });
}

export function updateUserAvatar(newAvatar) {
  return fetch('https://nomoreparties.co/v1/plus-cohort-22/users/me/avatar', {
    method: 'PATCH',
    headers: {
      authorization: 'd00ddee1-e29e-4e26-92aa-43ddefc5b31a',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      avatar: newAvatar,
    })
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
    })
    .catch(error => {
      console.error(error);
    });
}

export function uploadNewCard(name, link) {
  return fetch('https://nomoreparties.co/v1/plus-cohort-22/cards', {
    method: 'POST',
    headers: {
      authorization: 'd00ddee1-e29e-4e26-92aa-43ddefc5b31a',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      link: link,
    })
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
    })
    .then(cardsData => {
      addCard(cardsData)
    })
    .catch(error => {
      console.error(error);
    });
}

export function deleteUploadedCard(data, cardElement) {
  return fetch(`https://nomoreparties.co/v1/plus-cohort-22/cards/${data._id}`, {
    method: 'DELETE',
    headers: {
      authorization: 'd00ddee1-e29e-4e26-92aa-43ddefc5b31a',
    }
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
    })
    .then(() => {
      cardElement.closest('.element').remove()
      console.log(data)
    })
    .catch(error => {
      console.error(error);
    });
}

export function uploadlikes(data, cardlikes) {
  fetch(`https://nomoreparties.co/v1/plus-cohort-22/cards/likes/${data._id}`, {
    method: 'PUT',
    headers: {
      authorization: 'd00ddee1-e29e-4e26-92aa-43ddefc5b31a',
      'Content-Type': 'application/json'
    },
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
    })
    .then(card => {
      cardlikes.textContent = card.likes.length;
    })
    .catch(error => {
      console.error(error);
    });
}

export function uploadDislikes(data, cardlikes) {
  fetch(`https://nomoreparties.co/v1/plus-cohort-22/cards/likes/${data._id}`, {
    method: 'DELETE',
    headers: {
      authorization: 'd00ddee1-e29e-4e26-92aa-43ddefc5b31a',
      'Content-Type': 'application/json'
    },
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
    })
    .then(card => {
      cardlikes.textContent = card.likes.length;
    })
    .catch(error => {
      console.error(error);
    });
}

