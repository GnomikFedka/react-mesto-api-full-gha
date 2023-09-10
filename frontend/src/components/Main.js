import pen from '../images/pen.svg';
import plus from '../images/plus.svg';
import React from 'react';
import Card from './Card';
import { CurrentUserContext } from "../contexts/CurrentUserContext";
const { useContext } = React;
export default function Main(props) {
  const currentUser = useContext(CurrentUserContext);
  
  return (
    <main>
      <section className="profile">
        <div className="profile__avatar">
          <img className="profile__avatar-foto" src={currentUser.avatar} alt="аватарка пользователя" />
          <div onClick={props.onEditAvatar} className="profile__overlay">
            <img onClick={props.onEditAvatar} className="profile__pen-avatar" src={pen} alt="изменение имени и вида деятельности" />
          </div>
        </div>
        <div className="profile__profile-info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button onClick={props.onEditProfile} type="button" className="profile__edit-button">
            <img className="profile__pen" src={pen} alt="изменение имени и вида деятельности" />
          </button>
          <p className="profile__field-of-activity">{currentUser.about}</p>
        </div>
        <button onClick={props.onAddPlace} type="button" className="profile__add-button">
          <img className="profile__plus" src={plus} alt="добавление новой карточки" />
        </button>
      </section>
      <section className="elements">
        {props.cards.map((card) => (
          <Card 
          card={card}
          key={card._id}
          onOpenCard={props.onOpenCard}
          onCardLike={props.onCardLike}
          onCardDelete={props.onCardDelete} />
        ))}
      </section>
    </main>
  )
}