import request from '@/utils/request';

export async function addCompany(data) {
  return request('/company/department/add', data);
}
export async function changeCompany(data) {
  return request('/company/department/update', data);
}
export async function searchDe(data) {
  return request('/company/department/search', data);
}
export async function getList(data,e) {
  return request('/company/department/list'+e, data);
}
export async function roleList(data) {
  return request('/company/department/role/list', data);
}
export async function sendRole(data) {
  return request('/company/department/role/add', data);
}
export async function changeRole(data) {
  return request('/company/department/role/update', data);
}
export async function addUser(data) {
  return request('/user/register', data);
}
export async function getRole(data,id) {
  return request(`/company/department/role/listByDepartment?did=${id}`, data);
}

export async function getUser(data) {
  return request('/user/list', data);
}
export async function restPsd(data) {
  return request('/user/resetPwd', data);
}
export async function delUser(data) {
  return request('/user/del', data);
}
export async function changeStatus(data) {
  return request('/user/changeStatus', data);
}
export async function searchUser(url,data) {
  return request(url, data);
}
export async function changePsd(data) {
  return request('/auth/resetPwd', data);
}





