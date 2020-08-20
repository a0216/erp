import React from 'react';
import { Table } from 'antd';
import styles from './index.less';

const columns = [
  {
    title: '店铺名称',
    dataIndex: 'name',
    render: text => <a>{text}</a>,
  },
  {
    title: '账号昵称',
    className: 'column-money',
    dataIndex: 'money',
  },
  {
    title: '授权平台',
    dataIndex: 'address',
  },
  {
    title: '店铺类型',
    dataIndex: 'address',
  },
  {
    title: '店铺地址',
    dataIndex: 'address',
  },

  {
    title: '授权状态',
    dataIndex: 'address',
  },
   {
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
