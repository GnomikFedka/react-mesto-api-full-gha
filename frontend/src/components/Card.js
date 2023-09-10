import React from 'react';
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === currentUser._id;
  const isLiked = props.card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `elements__button-like ${
    isLiked && "elements__button-like_active"
  }`;

  function handleClick() {
    props.onOpenCard(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  return (
    <div className="elements__element">
      <img className="elements__mask-group" src={props.card.link} alt={props.card.name} onClick={handleClick} />
      <h2 className="elements__text">{props.card.name}</h2>
      <div className="elements__likes"> 
        <button type="button" className={cardLikeButtonClassName} src={props.card.link}
        alt={props.card.name} onClick={handleLikeClick}></button>
        <p className="elements__likes-quantity">{props.card.likes.length}</p>
      </div>
      <button type="button" className={`elements__delete-button
      ${(!isOwn)  && "elements__delete-button_hidden"}`} onClick={handleDeleteClick}></button>
    </div>
  )
}