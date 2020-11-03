import Parameters from './parameters';

const get = async (route, headers = {}) =>
  fetch(route, {
    method: 'GET',
    headers,
  });

const post = (route, body = null, headers = {}) =>
  fetch(route, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(body),
  });

const login = (body) => post(Parameters.api.login, body);
const logout = () => get(Parameters.api.logout);
const createUser = (body) => post(Parameters.api.user, body);
const findUser = (id) => get(`${Parameters.api.user}/${id}`);

export { login, logout, createUser, findUser };
