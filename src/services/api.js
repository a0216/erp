import request from '@/utils/request';
export async function Download(params = {}) {
  return request(`/api/download`, {
    method: 'POST', // GET / POST 均可以
    data: params,
    responseType : 'blob', // 必须注明返回二进制流
  });
}