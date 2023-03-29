function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', (evt) => handleEscClose(evt, popup))
  popup.addEventListener('click', (evt) => handleOverlayClick(evt, popup))
};

function closePopup(popup) {
  if (popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', (evt) => handleEscClose(evt, popup))
    popup.removeEventListener('mousedown', (evt) => handleOverlayClick(evt, popup))
  }
};

function handleEscClose(evt, popup) {
  if (evt.key === 'Escape') {
    closePopup(popup);
  }
};

function handleOverlayClick(evt, popup) {
  if (evt.target.classList.contains('popup_opened')) {
    closePopup(popup);
  }
}

export { openPopup, closePopup }
