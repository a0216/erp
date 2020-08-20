import request from '@/utils/request';

export async function productList(data) {
    return request('/goods/listSku', data);
}
export async function addOrder(data) {
    return request('/order/add', data);
}
export async function saleUser(data) {
    return request('/order/list/user', data);
}
export async function orderList(data) {
    return request('/order/list', data);
}
export async function searchOrder(data,e) {
    return request(`/order/search?${e}`, data);
}
export async function payType(data) {
    return request('/order/list/payType', data);
}




