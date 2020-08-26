import React, { useState } from 'react';
import { Table } from 'antd';
import styles from './index.less';
import Model from '../Model'

import {delWare} from '../../api'
const TableBordered = props => {
  const [createModalVisible, handleModalVisible] = useState(false);
  const [thisMsg, changeMsgs] = useState({});
  const changeMsg = (e) => {
    changeMsgs(e)
  }

  const handleAdd = (e) => {
    if (e == '200') {
      return true
    } else {
      return false
    }
  }
  props.Lists.map(res => {
    return res.key = res.id;
  })
  const delConfirm = (e) => {
    confirm({
      title: '你确定要删除此用户吗?',
      icon: <ExclamationCircleOutlined />,
      content: '删除用户',
      onOk() {
        delWare({ method: "POST", data: { uid: e.id } }).then(res => {
          if (res.code == '200') {
            message.success("已删除")
            props.actionRef.current()

          } else {
            message.error("删除失败")
          }
        })
      },
      onCancel() {
        message.error("已取消")
      },
    });
  }
  const columns = [
    {
      title: '仓库属性 ',
      dataIndex: 'name',
      key: "id",
      render: text => <a>{text}</a>,
    },
    {
      title: '备注',
      key: "id",
      dataIndex: 'comment',
    },
    {
      title: '操作',
      key: "id",
      render: (text, record) => (
        <span>
          <a style={{ marginRight: 16 }} onClick={() => { handleModalVisible(true); changeMsg(record); }}>修改</a>
          {/* <a style={{ marginRight: 16 }}>删除</a> */}
          <a onClick={() => { delConfirm(record) }}>删除</a>
        </span>
      ),
    },
  ];

  return (
    <div className={styles.container}>
      <div id="components-table-demo-bordered">
        <Table
          columns={columns}
          dataSource={props.Lists}
          bordered
          title={() => '仓库属性'}
          footer={() => 'Footer'}
          pagination={false}
        />
      </div>
      <Model
        thisMsg={thisMsg}
        onSubmit={async value => {
          const success = await handleAdd(value);
          if (success) {
            handleModalVisible(false);
            props.actionRef.current();
          }
        }}
        onCancel={() => handleModalVisible(false)}
        modalVisible={createModalVisible}
        type={'2'}
      />
    </div>
  );
}
export default TableBordered