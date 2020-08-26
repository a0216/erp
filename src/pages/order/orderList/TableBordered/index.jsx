import React from 'react';
import { Table } from 'antd';
import styles from './index.less';
const TableBordered=props=>{

const expandedRowRender = (record) => {
  const columns = [
    {
      title: '商品名称',
      dataIndex: 'sku_name',
      ellipsis: true,

    },{
      title: '商品编码',
      dataIndex: 'sku_id',
    },
   {
      title: '数量',
      dataIndex: 'total',
    },{
      title: '京东售价',
      dataIndex: 'jd_price',
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
    dataIndex: 'order_id',
  },
  {
    title: '订单状态',
    dataIndex: 'order_state_remark',
  },
  {
    title: '姓名',
    dataIndex: 'full_name',
    ellipsis: true,
  },
  {
    title: '联系方式',
    dataIndex: 'mobile',
    ellipsis: true,
  },
  {
    title: '地址',
    dataIndex: 'full_address',
    ellipsis: true,
  },
  {
    title: '用户应付金额',
    dataIndex: 'order_payment',
  },
   
  {
    title: '订单货款金额',
    dataIndex: 'order_seller_price',
  },
   
  {
    title: '订单总金额',
    dataIndex: 'order_total_price',
  },
  {
    title: '订单总金额',
    dataIndex: 'order_total_price',
  },
  {
    title: '支付方式',
    dataIndex: 'pay_type',
  },
  {
    title: '订单备注',
    dataIndex: 'order_remark',
  },{
    title: '结单时间',
    dataIndex: 'order_end_time',
  },
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
        footer={() => 'Footer'}
      />
    </div>
  </div>
);
}
export default TableBordered