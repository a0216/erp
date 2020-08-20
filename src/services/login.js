import request from '@/utils/request';

export async function fakeAccountLogin(params) {
  console.log(params);
  return request('/auth/login', {
    method: 'POST',
    data: {  phone: params.userName, password: params.password  },
  });
}
// export async function fakeAccountLogin(params) {
//   return request('accoun/api/login/account', {
//     method: 'POST',
//     data: params,
//   });
// }
export async function getFakeCaptcha(mobile) {
  // return request(`/api/login/captcha?mobile=${mobile}`);
}
