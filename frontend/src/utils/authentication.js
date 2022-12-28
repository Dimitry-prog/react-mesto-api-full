import { BASE_URL } from "./constants";

const request = (url, options) => {
  return fetch(url, options).then(getResponseData)
}

const getResponseData = (res) => {
  if (!res.ok) {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  return res.json();
}

export const registerUser = (email, password) => {
  return request(`${BASE_URL}/signup`,
    {
      method: 'POST',
      credentials: 'include',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        password
      })
    });
};

export const authorizeUser = (email, password) => {
  return request(`${BASE_URL}/signin`,
    {
      method: 'POST',
      credentials: 'include',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        password
      })
    });
}

export const checkUserToken = () => {
  return request(`${BASE_URL}/users/me`,
    {
      method: 'GET',
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      }
    });
}

export const logout = () => {
    return request(`${BASE_URL}/logout`,
        {
            method: 'GET',
            credentials: 'include',
            headers: {
                "Content-Type": "application/json"
            },
        });
}