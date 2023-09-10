import React from 'react';
import { Routes, Route, Link } from "react-router-dom";
import vector from '../images/Vector.svg';
export default function Header(props) {
  return (
    <header className="header">
      <img className="header__logo" src={vector} alt="логотип Место Россия" />
      <Routes>
        <Route
          path="/"
          element={
            <div className="header__info">
              <p className="header__email">{props.currentUserEmail}</p>
              <Link
                className="header__sign header__sign_exit"
                onClick={props.onLogout}
              >
                Выйти
              </Link>
            </div>
          }
        />
        <Route
          path="/sign-in"
          element={
            <Link className="header__sign" to="/sign-up">
              Регистрация
            </Link>
          }
        />
        <Route
          path="/sign-up"
          element={
            <Link className="header__sign" to="/sign-in">
              Войти
            </Link>
          }
        />
      </Routes>
    </header>
  )
}