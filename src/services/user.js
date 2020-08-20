import request from '@/utils/request';


export async function query() {
  return request(`${rootPath}/user/store`);
}
export async function queryCurrent() {
  return request('/auth/me');
}
export async function queryNotices() {
  return request('/server/notices');
}
