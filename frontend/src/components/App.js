import '../index.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from './Header';
import ProtectedRoute from './ProtectedRoute';
import Register from './Register';
import Login from './Login';
import Main from './Main';
import InfoTooltip from './InfoTooltip';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import React from 'react';
import ImagePopup from "./ImagePopup";
import api from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
const { useState } = React;

function App() {
  const [isEditProfilePopupOpen, openEditProfilePopup] = useState(false);
  const [isAddPlacePopupOpen, openAddPlacePopup] = useState(false);
  const [isEditAvatarPopupOpen, openEditAvatarPopup] = useState(false);
  const [selectedCard, openCardPopup] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [currentUserEmail, setCurrentUserEmail] = useState("");
  const [cards, setCards] = useState([]);
  const [isSucceeded, setIsSucceeded] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isInfoTooltipPopup, openIsInfoTooltipPopup] = useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (isLoggedIn) {
      Promise.all([api.getUser(), api.getCards()])
        .then(([userData, cards]) => {
          setCurrentUser(userData);
          setCards(cards);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    }
  }, [isLoggedIn]);

  React.useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      api.checkToken(jwt)
        .then((res) => {
          if (res) {
            setCurrentUserEmail(res.data.email);
            setIsLoggedIn(true);
            navigate("/", { replace: true });
          }
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    }
  }, []);

  function handleEditAvatarClick() {
    openEditAvatarPopup(true);
  }

  function handleEditProfileClick() {
    openEditProfilePopup(true);
  }

  function handleAddPlaceClick() {
    openAddPlacePopup(true);
  }

  function handleCardClick(card) {
    openCardPopup(card);
  }

  function closeAllPopups() {
    openEditAvatarPopup(false);
    openEditProfilePopup(false);
    openAddPlacePopup(false);
    openCardPopup(null);
    openIsInfoTooltipPopup(false);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((cards) =>
          cards.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  function handleUpdateAvatar({ avatar }) {
    api.setAvatar({ avatar })
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  function handleAddPlaceSubmit({ name, link }) {
    api.addCard({ name, link })
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  function handleUpdateUser({ name, about }) {
    api.setUser({ name, about })
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  function handleRegister(email, password) {
    api.register(email, password)
      .then((res) => {
        if (res) {
          setIsSucceeded(true);
          openIsInfoTooltipPopup(true);
          navigate("/sign-in", { replace: true });
        }
      })
      .catch((err) => {
        setIsSucceeded(false);
        openIsInfoTooltipPopup(true);
        console.log(`Ошибка: ${err}`);
      });
  }

  function handleLogin(email, password) {
    api.login(email, password)
      .then((res) => {
        if (res) {
          localStorage.setItem("jwt", res.token);
          setIsLoggedIn(true);
          setCurrentUserEmail(email);
          navigate("/", { replace: true });
        }
      })
      .catch((err) => {
        setIsSucceeded(false);
        openIsInfoTooltipPopup(true);
        console.log(`Ошибка: ${err}`);
      });
  }

  function handleLogout() {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUserEmail("");
    navigate("/sign-in", { replace: true });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <div className="page">
          <Header
            onLogout={handleLogout}
            currentUserEmail={currentUserEmail}
          />
          <Routes>
            <Route path="/" element={
              <ProtectedRoute loggedIn={isLoggedIn}>
                <Main
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onOpenCard={handleCardClick}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                  cards={cards}
                />
                <Footer />
              </ ProtectedRoute>
            } />
            <Route path="/sign-up" element={<Register onRegister={handleRegister}></ Register>} />
            <Route path="/sign-in" element={<Login onLogin={handleLogin}> </ Login>} />
          </Routes>
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <PopupWithForm
            name="card-delete"
            title="Вы уверены?"
            buttonText="Да"
            onClose={closeAllPopups}
          />
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
          <InfoTooltip
            isOpen={isInfoTooltipPopup}
            onClose={closeAllPopups}
            isSucceeded={isSucceeded}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}
export default App;