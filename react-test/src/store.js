import { createStore } from 'redux';

const userReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_USER_INFO':
      return action.payload;
    default:
      return state;
  }
};

const store = createStore(userReducer);

export default store;