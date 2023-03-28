function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', (evt) => handleEscClose(evt, popup))
  popup.addEventListener('click', () => setEventListeners(popup))
};

function closePopup(popup) {
  if (popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', handleEscClose)
  }
};

function handleEscClose(evt, popup) {
  if (evt.key === 'Escape') {
    closePopup(popup);
  }
};

function setEventListeners(popup) {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup);
    }
  });
}

export { openPopup, closePopup }
