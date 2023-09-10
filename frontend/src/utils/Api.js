class Api {
    constructor({headers, myUrl, authUrl}) {
        this._headers = headers;
        this._myUrl = myUrl;
        this._authUrl = authUrl;
    }

    _getResponseData(res) {
      if (res.ok) {
          return res.json();
      }
      else return Promise.reject(`Ошибка: ${res.status}`);
    }

    getUser() {
      return fetch(`${this._myUrl}/users/me`, {
        headers: this._headers
      })
      .then(res => {
        return this._getResponseData(res);
      })
    }

    getCards() {
      return fetch(`${this._myUrl}/cards`, {
        headers: this._headers
      })
      .then(res => {
        return this._getResponseData(res);
      })
    }

    setUser({name, about}) {
      return fetch(`${this._myUrl}/users/me`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          name,
          about,
        }),
      })
      .then(res => {
        return this._getResponseData(res);
      })
    }

    setAvatar(avatar) {
      return fetch(`${this._myUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify(avatar)
      })
      .then(res => {
        return this._getResponseData(res);
      })
    }

    addCard(card) {
      return fetch(`${this._myUrl}/cards`, {
          method: 'POST',
          headers: this._headers,
          body: JSON.stringify(card)
        })
        .then(res => {
          return this._getResponseData(res);
        })  
    }

    deleteCard(cardData) {
      return fetch(`${this._myUrl}/cards/${cardData}`, {
        method: 'DELETE',
        headers: this._headers
      })
      .then(res => {
        return this._getResponseData(res);
      })
    }

    changeLikeCardStatus(cardId, isLiked) {
      return fetch(`${this._myUrl}/cards/${cardId}/likes`, {
        method: isLiked ? "DELETE" : "PUT",
        headers: this._headers,
      })
      .then(res => {
        return this._getResponseData(res);
      })
    }

    register(email, password) {
      return fetch(`${this._authUrl}/signup`, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })
      .then(res => {
        return this._getResponseData(res);
      })
    }

    login(email, password) {
      return fetch(`${this._authUrl}/signin`, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })
      .then(res => {
        return this._getResponseData(res);
      })
    }

    checkToken(token) {
      return fetch(`${this._authUrl}/users/me`, {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      })
      .then(res => {
        return this._getResponseData(res);
      })
    }
}
const api = new Api({
  headers: {
    authorization: '9747cacb-cd33-472a-8f54-1926cc52a8f6',
    'Content-Type': 'application/json',
  },
  myUrl: 'https://mesto.nomoreparties.co/v1/cohort-63',
  authUrl: 'https://auth.nomoreparties.co',
});

export default api;