export const editButton = document.querySelector('.profile__edit-button');
export const addButton = document.querySelector('.profile__add-button');
export const popups = document.querySelectorAll('.popup');
export const popupActivityFieldName = '.popup_name-field-of-activity';
export const popupNewElement = '.popup_new-element';
export const popupAvatar = '.popup_avatar';
export const closeButtons = document.querySelectorAll('.popup__close-button');
export const saveButton = '.popup__button-save';
export const forms = document.forms;
export const popupActivityFieldNameButton = forms.nameFieldOfActivity.querySelector('popup__button-save');
export const inputsOfActivityFieldName = Array.from(forms.nameFieldOfActivity.querySelectorAll('input'));
export const elementsArray = '.elements';
export const popupSelectorMesto = '.popup_foto-mesto';
export const popupDeleteConfirmation = '.popup_delete';
export const popupMesto = document.querySelector('.popup_foto-mesto');
export const elementTemplate = document.querySelector('#element').content;
export const elementForm = elementTemplate.querySelector('.elements__element');
export const researcherName = '.profile__name';
export const activityField = '.profile__field-of-activity';
export const avatar = '.profile__avatar-foto';
export const avatarFoto = document.querySelector('.profile__overlay');
export const avatarPen = document.querySelector('.profile__pen-avatar');
export const objectForm = {
  formSelector: '.popup__edit-form',
  inputSelector: 'input.popup__input',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}