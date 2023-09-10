import successIcon from "../images/successunion.svg";
import failIcon from "../images/failunion.svg";
import closeIcon from '../images/CloseIcon.svg';

function InfoTooltip(props) {
  return (
    <div className={`popup ${props.isOpen && "popup_opened"}`}>
      <div className="popup__container popup__edit-form">
        <button className="popup__close-button" type="button" onClick={props.onClose}>
          <img className="popup__close-icon" src={closeIcon} alt="белый крестик" />
        </button>
        <img
          className="popup__info-image"
          src={props.isSucceeded ? successIcon : failIcon}
          alt={props.isSucceeded ? "Успешно" : "Ошибка"}
        />
        <p className="popup__info-message">
          {props.isSucceeded
            ? "Вы успешно зарегистрировались!"
            : "Что-то пошло не так! Попробуйте еще раз."}
        </p>
      </div>
    </div>
  );
}

export default InfoTooltip;