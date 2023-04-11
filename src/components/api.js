const BASE_URL = 'https://nomoreparties.co/v1/plus-cohort-22';

function getResponseData(res) {
  if (!res.ok) {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  return res.json();
}

export function importInitialCards() {
  return fetch(`${BASE_URL}/cards`, {
    headers: {
      authorization: 'd00ddee1-e29e-4e26-92aa-43ddefc5b31a'
    }
  })
    .then(res => getResponseData(res))
}

export function getUserData() {
  return fetch(`${BASE_URL}/users/me`, {
    headers: {
      authorization: 'd00ddee1-e29e-4e26-92aa-43ddefc5b31a'
    }
  })
    .then(res => getResponseData(res))
}

export function updateUserProfile(name, about) {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'PATCH',
    headers: {
      authorization: 'd00ddee1-e29e-4e26-92aa-43ddefc5b31a',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      about: about,
    })
  })
    .then(res => getResponseData(res))
}

export function updateUserAvatar(newAvatar) {
  return fetch(`${BASE_URL}/users/me/avatar`, {
    method: 'PATCH',
    headers: {
      authorization: 'd00ddee1-e29e-4e26-92aa-43ddefc5b31a',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      avatar: newAvatar,
    })
  })
    .then(res => getResponseData(res))

}

export function uploadNewCard(name, link) {
  return fetch(`${BASE_URL}/cards`, {
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
    .then(res => getResponseData(res))
}

export function deleteUploadedCard(data) {
  return fetch(`${BASE_URL}/cards/${data._id}`, {
    method: 'DELETE',
    headers: {
      authorization: 'd00ddee1-e29e-4e26-92aa-43ddefc5b31a',
    }
  })
    .then(res => getResponseData(res))
}

export function uploadlikes(data) {
  return fetch(`${BASE_URL}/cards/likes/${data._id}`, {
    method: 'PUT',
    headers: {
      authorization: 'd00ddee1-e29e-4e26-92aa-43ddefc5b31a',
      'Content-Type': 'application/json'
    },
  })
    .then(res => getResponseData(res))
}

export function uploadDislikes(data) {
  return fetch(`${BASE_URL}/cards/likes/${data._id}`, {
    method: 'DELETE',
    headers: {
      authorization: 'd00ddee1-e29e-4e26-92aa-43ddefc5b31a',
      'Content-Type': 'application/json'
    },
  })
    .then(res => getResponseData(res))
}

