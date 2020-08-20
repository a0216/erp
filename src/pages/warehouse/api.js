import request from '@/utils/request';


export async function wareTrans(data) {
    return request('/warehouse/transfer/add', data);
}

export async function wareSelect(data) {
    return request('/warehouse/listSelect', data);
}
export async function getWareList(data,e) {
    return request(`/warehouse/inventory/list${e}`, data);
}
export async function productList(data) {
    return request('/goods/listSku', data);
}
export async function toPayment(data) {
    return request('/warehouse/payment/put', data);
}
export async function payment(data) {
    return request('/warehouse/payment/list', data);
}
export async function audit(data) {
    return request('/warehouse/transfer/audit', data);
}
export async function getList(data,e) {
    return request('/warehouse/out/goodsList'+e, data);
}
export async function outWare(data) {
    return request('/warehouse/out/add', data);
}
export async function outWareList(data) {
    return request('/warehouse/out/list', data);
}
export async function outAudit(data) {
    return request('/warehouse/out/audit', data);
}

