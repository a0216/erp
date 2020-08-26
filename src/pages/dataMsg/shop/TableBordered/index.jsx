import React from 'react';
import { Table } from 'antd';
import styles from './index.less';
const TableBordered = props => {


  const columns = [
    {
      title: '店铺名称',
      dataIndex: 'name',
      render: text => <a>{text}</a>,
    },
    {
      title: '账号昵称',
      dataIndex: 'nickname',
    },
    {
      title: '授权平台',
      dataIndex: 'platform',
    },
    {
      title: '店铺地址',
      dataIndex: 'uri',
      render: (text) => (
        <a target="_blank" href={text}  >点击跳转</a>

      ),
    },
    {
      title: '操作',
      key: 'category',
      render: (text, record) => (
        <span>
          <a target="_blank" href={record.auth_uri}  >授权</a>
        </span>
      ),
    },
  ];

  return (
    <div className={styles.container}>
      <div id="components-table-demo-bordered">
        <Table
          columns={columns}
          dataSource={props.store}
          bordered
          title={() => '店铺'}
          footer={() => 'Footer'}
        />
      </div>
    </div>
  );
}
export default TableBordered