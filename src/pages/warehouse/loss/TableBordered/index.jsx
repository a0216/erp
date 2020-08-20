import React from 'react';
import { Table } from 'antd';
import styles from './index.less';

const columns = [
  {
    title: '报损日期',
    dataIndex: 'name',
    render: text => <a>{text}</a>,
  },
  {
    title: '商品编码',
    dataIndex: 'money',
  },
  {
    title: '商品名称',
    dataIndex: 'address',
  },
  {
    title: '数量',
    dataIndex: 'address',
  },
 {
    title: '备注',
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
        title={() => 'Header'}
        footer={() => 'Footer'}
      />
    </div>
  </div>
);
