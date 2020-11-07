export const LOGIN = 'login';
export const LOGOUT = 'logout';
export const REFRESH = 'refresh';
export const initialState = {
  // isAuth: false,
  // role: '',
  // id: '',
  // firstname: '',
  // lastname: '',
  // email: '',
  // TODO : mocking user info for development
  isAuth: true,
  role: '1',
  id: '1',
  firstname: 'Fred',
  lastname: 'Gauthier',
  email: 'fred.gauthier@blogify.com',
};

export default function AuthReducer(state, action) {
  const { type, payload } = action;

  switch (type) {
    case LOGIN:
      return payload;
    case LOGOUT:
      return initialState;
    default:
      throw new Error(`Action type : ${type} is not defined`);
  }
}
