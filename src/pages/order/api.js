import request from '@/utils/request';

export async function productList(data) {
    return request(`/goods/listSku${data}`, {method:'get'});
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
export async function syncInventory(data) {
    return request(`/jd/order/syncInventory`,  data);
}

export async function syncState(store) {
    return request(`/jd/order/syncState?${store}`, {method:'get'});
}
export function downLoads(url){
    return  fetch(`https://erpapi.owodian.com/api/jd/order/export${url}`,{
        method:"get",
        headers: {
          "Authorization":`${JSON.parse(localStorage.getItem('tokenType'))} ${JSON.parse(localStorage.getItem('token'))}`,
        },
      }).then(res => res.blob()).then(blob => {
        var a = document.createElement('a');
        var url = window.URL.createObjectURL(blob);
        var filename = '订单.xls';
        a.href = url;
        a.download = filename;
        a.click();
        window.URL.revokeObjectURL(url);
    })
}
export function downLoadOrder(url){
    return  fetch(`https://erpapi.owodian.com/api/order/export${url}`,{
        method:"get",
        headers: {
          "Authorization":`${JSON.parse(localStorage.getItem('tokenType'))} ${JSON.parse(localStorage.getItem('token'))}`,
        },
      }).then(res => res.blob()).then(blob => {
        var a = document.createElement('a');
        var url = window.URL.createObjectURL(blob);
        var filename = '销售订单.xls';
        a.href = url;
        a.download = filename;
        a.click();
        window.URL.revokeObjectURL(url);
    })
}
