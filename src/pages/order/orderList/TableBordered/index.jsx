import React from 'react';
import { Table } from 'antd';
import styles from './index.less';
const TableBordered=props=>{
console.log(props)

const expandedRowRender = (record) => {
  const columns = [
    {
      title: '商品名称',
      dataIndex: 'name',
    },{
      title: '商品编码',
      dataIndex: 'code',
    },
   {
      title: '数量',
      dataIndex: 'num',
    },{
      title: '单位',
      dataIndex: 'unit_name',
    },
    
    // {
    //   title: '仓库名称',
    //   dataIndex: 'address',
    // },
    // {
    //   title: '物流公司',
    //   dataIndex: 'address',
    // },
    // {
    //   title: '物流单号',
    //   dataIndex: 'address',
    // },
  ];
  let data = record.skus;
  data.map(res => {
    res.key = res.id
    return res
  })
  return <Table columns={columns} dataSource={data} pagination={false} key={data.id} />;
};
const columns = [
  {
    title: '下单日期 ',
    dataIndex: 'updated_at',
  },
  {
    title: '订单号',
    dataIndex: 'money',
  },
  {
    title: '订单状态',
    dataIndex: 'status_name',
  },
  {
    title: '姓名',
    dataIndex: 'name',
  },
  {
    title: '联系方式',
    dataIndex: 'phone',
  },

  {
    title: '地址',
    dataIndex: 'address',
  },
   {
    title: '付款状态',
    dataIndex: 'pay_name',
    // render: (text) => {if(text=='1'){<span></span>}else if(text=='2'){<span></span>}},

  }, 
  {
    title: '平台金额',
    dataIndex: 'address',
  },
  {
    title: '实际付款',
    dataIndex: 'address',
  },{
    title: '付款/退款日期',
    dataIndex: 'address',
  },{
    title: '店铺名称',
    dataIndex: 'store_name',
  }
];
return (
  <div >
    <div id="components-table-demo-bordered">
      <Table
        columns={columns}
        dataSource={props.list}
        bordered
        expandable={{
          expandedRowRender
        }}
        scroll={{ x: 1500}} 
        title={() => 'Header'}
        footer={() => 'Footer'}
      />
    </div>
  </div>
);
}
export default TableBordered