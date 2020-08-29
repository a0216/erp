import request from '@/utils/request';

export async function productList(data) {
    return request('/goods/listSku', data);
}
export async function addOrder(data) {
    return request('/order/add', data);
}
export async function saleUser(data) {
    return request('/shop/list?property=3', data);
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
export async function shopList(data,send) {
    return request(`/shop/list${send}`, data);
}
// https://erpapi.owodian.com/api/shop/list?property=3

export async function payOrder(data) {
    return request('/order/pay', data);
}
export async function jdOrder(store) {
    return request(`/jd/order/sync?store=${store}`, {method:'get'});
}
export async function getWare(store) {
    return request(`/warehouse/list`, {method:'get'});
}

export async function orderLists(send) {
    return request(`/jd/order/list${send}`, {method:'get'});
}
export async function orderState(store) {
    return request(`/jd/order/state?store=${store}`, {method:'get'});
}
export async function storeList() {
    return request('/store/list',  {method:'get'});
}
export async function getVenderCarrier(store) {
    return request(`/jd/order/getVenderCarrier?storeId=${store}`,  {method:'get'});
}
export async function shipping(data) {
    return request(`/jd/order/shipping`,  data);
}


