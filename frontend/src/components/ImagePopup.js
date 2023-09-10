import React from 'react';
import closeIcon from '../images/CloseIcon.svg';
export default function ImagePopup(props) {
  return (
    <div className={`popup popup_foto-mesto ${props.card && "popup_opened"}`}>
      <div className="popup__container popup__container_foto-mesto">
        <button className="popup__close-button" type="button" onClick={props.onClose}>
          <img className="popup__close-icon" src={closeIcon} alt="белый крестик" />
        </button>
        <img
          className="popup__foto"
          src={props.card ? props.card.link : "#"}
          alt={props.card ? props.card.name : "#"}
        />
        <h2 className="popup__text">
          {props.card ? props.card.name : ""}
        </h2>
      </div>
    </div>
  );
}