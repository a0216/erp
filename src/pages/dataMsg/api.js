import request from '@/utils/request';

export async function addWares(data) {
    return request('/warehouse/property/add', data);
}
export async function wareDeList(data) {
    return request('/warehouse/property/list', data);
}
export async function changeWare(data) {
    return request('/warehouse/property/update', data);
}
export async function delWare(data) {
    return request('/warehouse/property/del', data);
}
export async function addWare(data) {
    return request('/warehouse/add', data);
}
export async function shopAdd(data) {
    return request('/shop/add', data);
}
export async function shopMsgList(data) {
    return request('/shop/listProperty', data);
}

export async function shopList(data,send) {
    return request(`/shop/list${send}`, data);
}
export async function delShop(data) {
    return request('/shop/del', data);
}
export async function shopChange(data) {
    return request('/shop/update', data);
}
export async function addProductMsg(name,data) {
    return request(`/goods/property/${name}/add`, data);
}
export async function delProductMsg(name,data) {
    return request(`/goods/property/${name}/del`, data);
}
export async function getProductMsg(name,data) {
    return request(`/goods/property/${name}/list`, data);
}
export async function addProduct(data) {
    return request('/goods/add', data);
}
export async function getProduct(data) {
    return request('/goods/list', data);
}

export async function delProduct(data) {
    return request('/goods/del', data);
}

export async function getwareList(data,e) {
    return request(`/warehouse/list?${e}`, data);
}
export async function exports(data,e) {
    return request(`warehouse/export?${e}`, data);
}

export async function upWareList(data) {
    return request('/warehouse/update', data);
}
export async function delWareList(data) {
    return request('/warehouse/del', data);
}
export async function productList(data) {
    return request('/goods/listSku', data);
}
export async function storeList(data) {
    return request('/store/list', data);
}
export async function searchGood(data,e) {
    return request(e, data);
}
export async function upGoods(name,data) {
    return request(`/goods/property/${name}/update`, data);
}
export async function addJd(data) {
    return request(`/goods/jdSku/add`, data);
}
export async function addTb(data) {
    return request(`/goods/tbSku/add`, data);
}
export async function getJd(skuId) {
    return request(`/goods/jdSku/get?skuId=${skuId}`,  {method:'get'});
}
export async function getTb(skuId) {
    return request(`/goods/tbSku/get?skuId=${skuId}`, {method:'get'});
}
// /goods/tbSku/add
export async function goodsUp(data) {
    return request(`/goods/update`, data);
}
export async function goodsDel(data) {
    return request(`/goods/del`, data);
}

export function downLoada(url){
    return  fetch(`https://erpapi.owodian.com/api/warehouse/export${url}`,{
        method:"get",
        headers: {
          "Authorization":`${JSON.parse(localStorage.getItem('tokenType'))} ${JSON.parse(localStorage.getItem('token'))}`,
        },
      }).then(res => res.blob()).then(blob => {
        var a = document.createElement('a');
        var url = window.URL.createObjectURL(blob);
        var filename = '仓库.xls';
        a.href = url;
        a.download = filename;
        a.click();
        window.URL.revokeObjectURL(url);
    })
}

export function downLoadPro(url){
    return  fetch(`https://erpapi.owodian.com/api/goods/export${url}`,{
        method:"get",
        headers: {
          "Authorization":`${JSON.parse(localStorage.getItem('tokenType'))} ${JSON.parse(localStorage.getItem('token'))}`,
        },
      }).then(res => res.blob()).then(blob => {
        var a = document.createElement('a');
        var url = window.URL.createObjectURL(blob);
        var filename = '商品.xls';
        a.href = url;
        a.download = filename;
        a.click();
        window.URL.revokeObjectURL(url);
    })
}
export function downLoadShop(url){
    return  fetch(`https://erpapi.owodian.com/api/shop/export${url}`,{
        method:"get",
        headers: {
          "Authorization":`${JSON.parse(localStorage.getItem('tokenType'))} ${JSON.parse(localStorage.getItem('token'))}`,
        },
      }).then(res => res.blob()).then(blob => {
        var a = document.createElement('a');
        var url = window.URL.createObjectURL(blob);
        var filename = '商品.xls';
        a.href = url;
        a.download = filename;
        a.click();
        window.URL.revokeObjectURL(url);
    })
}
// shop/export






// /warehouse/property/del

