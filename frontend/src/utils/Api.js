import {BASE_URL} from './constants';

class Api {
  constructor({ url, credentials, headers}) {
    this.url = url;
    this._credentials = credentials;
    this._headers = headers;
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  _request(url, options) {
    return fetch(url, options).then(this._getResponseData)
  }

  getUsersInfo() {
    return this._request(this.url + '/users/me', {
      headers: this._headers,
      credentials: this._credentials,
    });
  }

  getInitCards() {
    return this._request(this.url + '/cards', {
      headers: this._headers,
      credentials: this._credentials,
    });
  }

  getInitialAppState() {
    return Promise.all([this.getUsersInfo(), this.getInitCards()])
  }

  patchProfile(name, about) {
    return this._request(this.url + '/users/me', {
      method: 'PATCH',
      headers: this._headers,
      credentials: this._credentials,
      body: JSON.stringify({
        name,
        about
      }),
    });
  }

  postNewCard(name, link) {
    return this._request(this.url + '/cards', {
      method: 'POST',
      headers: this._headers,
      credentials: this._credentials,
      body: JSON.stringify({
        name,
        link
      }),
    });
  }

  deleteCard(id) {
    return this._request(`${this.url}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers,
      credentials: this._credentials,
    });
  }

  toggleLikeCard(id, method) {
    return this._request(`${this.url}/cards/${id}/likes`, {
      method: `${method ? 'PUT' : 'DELETE'}`,
      headers: this._headers,
      credentials: this._credentials,
    });
  }

  patchAvatar(avatar) {
    return this._request(this.url + '/users/me/avatar', {
      method: 'PATCH',
      headers: this._headers,
      credentials: this._credentials,
      body: JSON.stringify({
        avatar
      }),
    });
  }

}

export const api = new Api({
  url: BASE_URL,
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json'
  }
});