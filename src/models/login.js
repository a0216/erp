import { stringify } from 'querystring';
import { history } from 'umi';
import { fakeAccountLogin } from '@/services/login';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';

const Model = {
  namespace: 'login',
  state: {
    status: undefined,
  },
  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(fakeAccountLogin, payload);
    // Login successfully
  
      if (response.code == '200') {
        localStorage.setItem("tokenType",JSON.stringify(response.data.token_type))
        localStorage.setItem("token",JSON.stringify(response.data.access_token))
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        yield put({
          type: 'changeLoginStatus',
          payload: localStorage.getItem("name"),
        }); 
        let { redirect } = params;
        if (redirect) {
          const redirectUrlParams = new URL(redirect);

          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
            // alert(1111)
            window.location.href = '/';

          } else {
            window.location.href = '/';
            return;
          }
        }

        history.replace(redirect || '/');
      }
    },

    logout() {
      const { redirect } = getPageQuery(); // Note: There may be security issues, please note
      if (window.location.pathname !== '/user/login' && !redirect) {
        history.replace({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
        });
      }
    },
  },
  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(localStorage.getItem("name"));
      return { ...state, status: localStorage.getItem("name"), type: "1" };
    },
  },
};
export default Model;
