import React, { useState, useEffect,useRef } from 'react';

import { Table, Button } from 'antd';
import styles from './index.less';

import { getProductMsg } from '../../api'
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
      dataIndex: 'money',
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
