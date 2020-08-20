import request from '@/utils/request';

export async function productList(data) {
    return request('/goods/listSku', data);
}

export async function sendPay(data) {
    return request('/warehouse/payment/apply', data);
}
export async function payment(data,e) {
    return request(`/warehouse/payment/list${e}`, data);
}
export async function delPayment(data) {
    return request('/warehouse/payment/del', data);
}
export async function payPayment(data) {
    return request('/warehouse/payment/pay', data);
}
export async function paymentDetail(data,e) {
    return request(`/warehouse/payment/detail${e}`, data);
}
export async function upApply(data) {
    return request(`/warehouse/payment/apply/update`, data);
}
export async function searchUser() {
    return request(`/warehouse/payment/listMadeUser`, {method:'get'});
}
