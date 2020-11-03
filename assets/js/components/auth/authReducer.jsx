export const LOGIN = 'login';
export const LOGOUT = 'logout';
export const REFRESH = 'refresh';
export const initialState = {
  isAuth: false,
  role: '',
  id: '',
  firstname: '',
  lastname: '',
  email: '',
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
