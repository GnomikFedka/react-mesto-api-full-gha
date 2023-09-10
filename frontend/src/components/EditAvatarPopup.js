import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const inputRef = React.useRef();

  function handleSubmit(evt) {
    evt.preventDefault();

    props.onUpdateAvatar({
      avatar: inputRef.current.value,
    });
  }

  return (
    <PopupWithForm  name="avatar" title="Обновить аватар" isOpen={props.isOpen}
     onClose={props.onClose} buttonText="Сохранить" onSubmit={handleSubmit}>
        <h3  className="popup__title">Обновить  аватар</h3>
        <input  type="url"  className="popup__input  popup__input_type_field-of-activity"  id="avatarFoto"
        name="avatar"  placeholder="Ссылка  на  фото"  required  ref={inputRef}/>
        <span  className="popup__input  popup__input_type_error  avatarFoto-error"></span>
    </ PopupWithForm>
  );
}

export default EditAvatarPopup;
