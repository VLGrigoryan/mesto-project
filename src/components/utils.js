function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleEscClose);
  popup.addEventListener('mousedown', handleOverlayClick);
};

function closePopup(popup) {
  if (popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', handleEscClose);
    popup.removeEventListener('mousedown', handleOverlayClick)
  }
};

function handleEscClose(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened')
    closePopup(openedPopup);
  }
};

function handleOverlayClick(evt) {
  const openedPopup = document.querySelector('.popup_opened')
  if (openedPopup && evt.target.classList.contains('popup_opened')) {
    closePopup(openedPopup);
  }
}

const buttonLoadingState = (loadingText, defaultText, isLoading, submitButton) => {
  if (isLoading) {
    submitButton.textContent = loadingText;
  } else {
    submitButton.textContent = defaultText;
  }
}

export { openPopup, closePopup, buttonLoadingState }
