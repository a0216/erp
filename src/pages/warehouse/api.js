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
export async function payment(data,e) {
    return request(`/warehouse/payment/list${e}`, data);
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
export async function outWareList(data,e) {
    return request(`/warehouse/out/list${e}`, data);
}
export async function outAudit(data) {
    return request('/warehouse/out/audit', data);
}

export async function searchUser() {
    return request(`/warehouse/payment/listMadeUser`, {method:'get'});
}
export async function listApplyUser(data) {
    return request('/warehouse/payment/listAuditUser', data);
}
//审核人
export async function outUser(data) {
    return request('/warehouse/out/listAuditUser', data);
}
export async function outApplyUser(data) {
    return request('/warehouse/out/listApplyUser', data);
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
export function downLoada(url){
    return  fetch(`https://erpapi.owodian.com/api/warehouse/inventory/export${url}`,{
        method:"get",
        headers: {
          "Authorization":`${JSON.parse(localStorage.getItem('tokenType'))} ${JSON.parse(localStorage.getItem('token'))}`,
        },
      }).then(res => res.blob()).then(blob => {
        var a = document.createElement('a');
        var url = window.URL.createObjectURL(blob);
        var filename = '库存单.xls';
        a.href = url;
        a.download = filename;
        a.click();
        window.URL.revokeObjectURL(url);
    })
}
export function downLoadOut(url){
    return  fetch(`https://erpapi.owodian.com/api/warehouse/out/export${url}`,{
        method:"get",
        headers: {
          "Authorization":`${JSON.parse(localStorage.getItem('tokenType'))} ${JSON.parse(localStorage.getItem('token'))}`,
        },
      }).then(res => res.blob()).then(blob => {
        var a = document.createElement('a');
        var url = window.URL.createObjectURL(blob);
        var filename = '出库单.xls';
        a.href = url;
        a.download = filename;
        a.click();
        window.URL.revokeObjectURL(url);
    })
}

