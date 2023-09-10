import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
const { useContext, useState, useEffect } = React;

function EditProfilePopup(props) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleNameChange(evt) {
    setName(evt.target.value);
  }

  function handleDescriptionChange(evt) {
    setDescription(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm  name="name-field-of-activity" title="Редактировать  профиль" isOpen={props.isOpen}
     onClose={props.onClose} buttonText="Сохранить" onSubmit={handleSubmit}>
        <h3  className="popup__title">Редактировать  профиль</h3>
        <input  className="popup__input  popup__input_type_name"  id="nameInput"  name="name"  placeholder="Имя"  required
        minLength="2"  maxLength="40" value={name || ""} onChange={handleNameChange}/>
        <span  className="popup__input  popup__input_type_error  nameInput-error"></span>
        <input  className="popup__input  popup__input_type_field-of-activity"  id="fieldOfActivityInput"  placeholder="О  себе"
        name="about"  required  minLength="2"  maxLength="200" value={description || ""} onChange={handleDescriptionChange}/>
        <span  className="popup__input  popup__input_type_error  fieldOfActivityInput-error"></span>
    </ PopupWithForm>
  );
}

export default EditProfilePopup;