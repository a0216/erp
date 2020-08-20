import React from 'react';
import { Table } from 'antd';
import styles from './index.less';

const columns = [
  {
    title: '退货单号 ',
    dataIndex: 'name',
    render: text => <a>{text}</a>,
  },
  {
    title: '退货日期',
    className: 'column-money',
    dataIndex: 'money',
  },
  {
    title: '订单号',
    dataIndex: 'address',
  },
  {
    title: '退货状态',
    dataIndex: 'address',
  },
  {
    title: '姓名',
    dataIndex: 'address',
  },

  {
    title: '联系方式',
    dataIndex: 'address',
  },
   {
    title: '地址',
    dataIndex: 'address',
  }, 
  {
    title: '退款状态',
    dataIndex: 'address',
  },
  {
    title: '退款金额',
    dataIndex: 'address',
  },{
    title: '退款方式',
    dataIndex: 'address',
  },{
    title: '退款日期',
    dataIndex: 'address',
  },{
    title: '店铺名称',
    dataIndex: 'address',
  },{
    title: '商品型号',
    dataIndex: 'address',
  },{
    title: '操作',
    dataIndex: 'address',
  },
];
const data = [
  {
    key: '1',
    name: 'John Brown',
    money: '￥300,000.00',
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    money: '￥1,256,000.00',
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Joe Black',
    money: '￥120,000.00',
    address: 'Sidney No. 1 Lake Park',
  },
];
export default () => (
  <div className={styles.container}>
    <div id="components-table-demo-bordered">
      <Table
        columns={columns}
        dataSource={data}
        bordered
        scroll={{x:1500}}
        title={() => 'Header'}
        footer={() => 'Footer'}
      />
    </div>
  </div>
);
