import request from '@/utils/request';

export async function productList(data) {
    return request(`/goods/listSku${data}`, {method:'get'});
}

export async function sendPay(data) {
    return request('/warehouse/payment/apply', data);
}
export async function payment(e) {
    return request(`/warehouse/payment/list${e}`, {method:'get'});
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

export async function exports(data,e) {
    return request(`/warehouse/payment/export${e}`, data);
}
export async function billList(e) {
    return request(`/shop/listSupply${e}`, {method:'get'});
}
export async function logList(id,page) {
    return request(`/shop/balance/log/list?sid=${id}&page=${page}`, {method:'get'});
}
export async function detail(id) {
    return request(`/shop/balance/detail?id=${id}`, {method:'get'});
}

export async function payFor(data) {
    return request(`/shop/balance/add`, {method:'post',data});
}
export async function paySub(data) {
    return request(`/shop/balance/sub`, {method:'post',data});
}
export async function upLog(data) {
    return request(`/shop/balance/log/update`, {method:'post',data});
}




export function downLoads(url){
    return  fetch(`https://erpapi.owodian.com/api/warehouse/payment/export${url}`,{
        method:"get",
        headers: {
          "Authorization":`${JSON.parse(localStorage.getItem('tokenType'))} ${JSON.parse(localStorage.getItem('token'))}`,
        },
      }).then(res => res.blob()).then(blob => {
        var a = document.createElement('a');
        var url = window.URL.createObjectURL(blob);
        var filename = '采购单.xls';
        a.href = url;
        a.download = filename;
        a.click();
        window.URL.revokeObjectURL(url);
    })
}

  
