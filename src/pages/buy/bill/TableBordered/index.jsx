import React, { useState, useEffect, useRef } from 'react';

import { Table, message, Modal, Drawer } from 'antd';
import styles from './index.less';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Link, connect } from 'umi';
import  Model  from '../Model';
import  Modelb  from '../Modelb';


const TableBordered = props => {
  const [createModalVisible, handleModalVisible] = useState(false);
  const [createModalVisibleb, handleModalVisibleb] = useState(false);
  const [nowMsg, changeMsg] = useState();


  const handleAdd = (e) => {
    console.log(e)
    if(e=='200'){
      return true
    }else{
      return false
    }
  }
  const columns = [
    {
      title: '商家编码', dataIndex: 'code', key: 'name',
      render: (text) => <span>{text}</span>,
    },
    {
      title: '商家名称', dataIndex: 'name', key: 'name',
      render: (text) => <span>{text}</span>,
    },
    {
      title: '联系人', dataIndex: 'contact_name', key: 'name',
      render: (text) => <span>{text}</span>,

    },
    {
      title: '账户余额', dataIndex: 'balance', key: 'name',
      render: (text) => <span>{text/100}</span>,

    },
    {
      title: '操作', dataIndex: 'unit', key: 'name', render: (text, record) => (
        <span>
          <a style={{ marginRight: 16 }} onClick={() => { handleModalVisible(true); changeMsg(record) }}>账户付款</a>
          <a style={{ marginRight: 16 }} onClick={() => { handleModalVisibleb(true); changeMsg(record) }}>余额扣款 </a>
          <Link to={{
            pathname: '/buy/detail/index.jsx',
            query: {
              id: record.id,
            }
          }}>
            查看详情
          </Link>
        </span>
      ),
    },
  ];
  return (
    <div className={styles.container}>
      <div id="components-table-demo-bordered">
        <Table
          columns={columns}
          dataSource={props.paymentList}
          bordered
        >
        </Table>

      </div>
      <Model
          onSubmit={async value => {
            const success = await handleAdd(value);
            if (success) {
              handleModalVisible(false);
              props.actionRef.current()
            }
          }}
          onCancel={() => handleModalVisible(false)}
          modalVisible={createModalVisible}
          nowMsg={nowMsg}
        />
        <Modelb
          onSubmit={async value => {
            const success = await handleAdd(value);
            if (success) {
              handleModalVisibleb(false);
              props.actionRef.current()
            }
          }}
          onCancel={() => handleModalVisibleb(false)}
          modalVisible={createModalVisibleb}
          nowMsg={nowMsg}
        />
    </div>
  );
}

export default TableBordered
