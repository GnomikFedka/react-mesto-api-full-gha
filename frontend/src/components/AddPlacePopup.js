import React from "react";
import PopupWithForm from "./PopupWithForm";
const { useState } = React;

function AddPlacePopup(props) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  React.useEffect(() => {
    setName("");
    setLink("");
  }, [props.isOpen]);

  function handleNameChange(evt) {
    setName(evt.target.value);
  }

  function handleLinkChange(evt) {
    setLink(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    props.onAddPlace({
      name,
      link,
    });
  }

  return (
    <PopupWithForm  name="new-element" title="Новое  место" isOpen={props.isOpen}
     onClose={props.onClose} buttonText="Создать" onSubmit={handleSubmit}>
        <h3  className="popup__title">Новое  место</h3>
        <input  className="popup__input  popup__input_type_name"  id="fotoName-input"  name="name"  placeholder="Название"
        required  minLength="2"  maxLength="30" value={name} onChange={handleNameChange}/>
        <span  className="popup__input  popup__input_type_error  fotoName-input-error"></span>
        <input  type="url"  className="popup__input  popup__input_type_field-of-activity"  id="fotoUrl-input"
        name="link"  placeholder="Ссылка  на  фото"  required value={link} onChange={handleLinkChange}/>
        <span  className="popup__input  popup__input_type_error  fotoUrl-input-error"></span>
    </ PopupWithForm>
  );
}

export default AddPlacePopup;
