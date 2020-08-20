import React,{useEffect,useState} from 'react';
import { Table, Switch,Modal,message } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

import styles from './index.less';
import Modela from '../Model'
import {delShop} from '../../api'
const { confirm } = Modal;

const TableBordered = props => {
  const [createModalVisible, handleModalVisible] = useState(false);
  const [nowMsg, changeMsg] = useState(false);

  const changeSwitch = (e) => {

  }
  const delConfirm = (e) => {
    confirm({
      title: '你确定要删除此商家吗?',
      icon: <ExclamationCircleOutlined />,
      content: '删除商家',
      onOk() {
        delShop({ method: "POST", data: { id: e.id } }).then(res => {
          console.log(res)
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
      title: '商家编码',
      dataIndex: 'code',
    },
    {
      title: '商家名称',
      dataIndex: 'name',
      render: text => <a>{text}</a>,

    },
    {
      title: '商家类型',
      dataIndex: 'propertyName',
    },
    {
      title: '联系人',
      dataIndex: 'contact_name',
    },
    {
      title: '电话',
      dataIndex: 'contact_phone',
    },

    {
      title: '地址',
      dataIndex: 'contact_address',
    },
    {
      title: '状态',
      key: 'status',
      render: (text, record) => (
        <Switch defaultChecked onChange={() => changeSwitch(record)} checked={record.status} />
      ),
    },
    {
      title: '操作',
      key: 'id',
      render: (text, record) => (
        <span>
          <a style={{ marginRight: 16 }} onClick={() => { handleModalVisible(true); changeMsg(record); }}>修改</a>
          {/* <a style={{ marginRight: 16 }}>删除</a> */}
          <a onClick={() => { delConfirm(record) }}>删除</a>
        </span>
      ),
    }
  ];
  const handleAdd = (e) => {
    if (e == '200') {
      return true;
    } else {
      return false;
    }
  }
  return (
    <div className={styles.container}>
      <div id="components-table-demo-bordered">
        <Table
          columns={columns}
          dataSource={props.shopList}
          bordered
          title={() => 'Header'}
          footer={() => 'Footer'}
        />
      </div>
      <Modela
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
        nowMsg={nowMsg}
      />
    </div>
  );
}

export default TableBordered