import request from '@/utils/request';

export async function getProductMsg(name, data) {
    return request(`/goods/property/${name}/list`, data);
}
export async function shopList(data) {
    return request('/shop/list', data);
}
export async function wareDeLists(data) {
    return request('/warehouse/property/list', data);
}
export async function wareSelects(data) {
    return request('/warehouse/listSelect', data);
}

