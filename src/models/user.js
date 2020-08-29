import { queryCurrent, query as queryUsers } from '@/services/user';

const UserModel = {
  
  namespace: 'user',
  state: {
    currentUser: {

    },
  },
  effects: {
    // *fetch(_, { call, put }) {
    //   const response = yield call(queryUsers);
    //   console.log(response)
     
    //   yield put({
    //     type: 'save',
    //     payload: response.data,
    //   });
    // },

    *fetchCurrent(_, { call, put }) {
      const response = yield call(queryCurrent);
      yield put({
        type: 'saveCurrentUser',
        payload: response.data,
      });
    },
  },
  reducers: {
    saveCurrentUser(state, action) {
      localStorage.setItem("name",JSON.stringify(action.payload.name))
      localStorage.setItem("roles",JSON.stringify(action.payload.roles))
      return { ...state, currentUser: action.payload || {} };
    },

    changeNotifyCount(
      state = {
        currentUser: {},
      },
      action,
    ) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
        },
      };
    },
  },
};
export default UserModel;
