import React, { useState, useEffect,useRef } from 'react';
import { ExclamationCircleOutlined } from '@ant-design/icons';

import { Table, Button,Modal,message } from 'antd';
import styles from './index.less';
const { confirm } = Modal;

import { getProductMsg,delProductMsg } from '../../api'
import Model from '../Model'

const TableBordered = props => {
  const [createModalVisible, handleModalVisible] = useState(false);
  const [nowList,getList]=useState([])
  const [type, settype] = useState('1');
  const [nowMsg, changeMsg] = useState({});
  const handleAdd=(e)=>{
    if(e=='200'){
      return true;
    }else{
      return false;
    }
  }

const actionRef = useRef(props.getData);
const delConfirm = (e) => {
  confirm({
    title: '你确定要删除此属性吗?',
    icon: <ExclamationCircleOutlined />,
    content: '删除属性',
    onOk() {
      let data = {}
      data.id = e.id;
      delProductMsg(props.nowName,{ method: "POST", data }).then(res => {
        if (res.code == '200') {
          message.success("已删除")
          props.actionRef.current(props.nowName)

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
 useEffect(() => {
  // getData()
 }, []);
  const columns = [
    {
      title: '属性名称 ',
      dataIndex: 'name',
      render: text => <a>{text}</a>,
    },
    {
      title: '备注',
      className: 'column-money',
      dataIndex: 'comment',
    },
     {
      title: '操作',
      key: 'id',
      render: (text, record) => (
        <span>
          <a style={{ marginRight: 16 }} onClick={() => { handleModalVisible(true); changeMsg(record);settype('2') }}>修改</a>
          {/* <a style={{ marginRight: 16 }}>删除</a> */}
          <a onClick={() => { delConfirm(record) }}>删除</a>
        </span>
      ),
    },
  ];
 
  return (
    <div className={styles.container}>
      <div id="components-table-demo-bordered">
        <Button type="primary"  onClick={()=>{handleModalVisible(true);settype('1')}}>
          添加商品属性
            </Button>
        <Table
          columns={columns}
          dataSource={props.nowList}
          bordered
          footer={() => 'Footer'}
          pagination={false}
        />
      </div>
      <Model
        onSubmit={async value => {
          const success = await handleAdd(value);
          if (success) {
            handleModalVisible(false);
            actionRef.current(props.nowName);
          }
        }}
        onCancel={() => handleModalVisible(false)}
        modalVisible={createModalVisible}
        type={type}
        nowMsg={nowMsg}
        nowName={props.nowName}
      />
    </div>
  );

}
export default TableBordered
