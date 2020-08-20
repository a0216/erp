import React, { useState, useEffect, useRef } from 'react';

import { Table, message } from 'antd';
import styles from './index.less';
import { DownOutlined } from '@ant-design/icons';

import Modela from '../Modela/index'
import Model from '../Model/index'
import { getList } from '../../api';

const handleAdd = async fields => {
  const hide = message.loading('正在添加');
  console.log(fields)
  //   hide();
  if (fields == '200') {
    setTimeout(() => {
      hide();
    }, 1000)
    return true;

  } else {
    setTimeout(() => {
      hide();
    }, 1000)
    return false;
  }

};

const changeThis = (e) => {
  console.log(e)
}


const TableBordered = props => {
  const [tableList, changeList] = useState(props.tableList)
  const [createModalVisible, handleModalVisible] = useState(false);
  const [createModalVisibles, handleModalVisibles] = useState(false);
  const [nowId, changeId] = useState();
  const [names, changeName] = useState();
  const [type, addOrch] = useState('1');
  // console.log(props.tableList)
  const expandedRowRender = (record) => {
    // console.log(record)
    const columns = [
      { title: '权限', dataIndex: 'name', key: 'name' },

      {
        title: '操作',
        dataIndex: 'name',
        key: 'name',
        render: (res) => (
          <span className="table-operation">
            <a onClick={(record) => { handleModalVisible(true); changeId(res); addOrch('2') }}>修改</a>
          </span>
        ),
      },
    ];
    const data = record.roles;
    data.map(res => {
      res.key = res.id
    })
    return <Table columns={columns} dataSource={data} pagination={false} key={data.id} />;
  };
  useEffect(() => {


  }, []);
  // const goModel=(e)=>{
  //   // handleModalVisible(true)
  //   console.log(e.id)
  // }
  const columns = [
    {
      title: '部门名称',
      dataIndex: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: '备注',
      dataIndex: 'id',
    },
    {
      title: '操作',
      key: 'name',

      render: (text, record) => (
        <span>
          <a style={{ marginRight: 16 }} onClick={() => { handleModalVisibles(true); changeName(record.name); changeId(record.id); }}>修改</a>
          {/* <a style={{ marginRight: 16 }}>删除</a> */}
          <a onClick={() => { handleModalVisible(true); changeId(record.id); }}>新增职位</a>
        </span>
      ),
    },
  ];

  return (
    <div className={styles.container}>
      <div id="components-table-demo-bordered">

        <Table
          columns={columns}
          dataSource={props.tableList.map(res => {
            res.key = res.id;
            return res
          })}
          key={props.tableList.id}
          onRow={record => {
            return {
              onClick: event => { changeThis }, // 点击行

            };
          }}
          bordered
          expandable={{
            expandedRowRender
          }}

          title={() => '部门列表'}
          footer={() => 'Footer'}
        >

        </Table>
      </div>
      <Model
        onSubmit={async value => {
          const success = await handleAdd(value);
          if (success) {
            handleModalVisibles(false);
            props.actionRef.current()

          }
        }}
        id={nowId}
        onCancel={() => handleModalVisibles(false)}
        modalVisible={createModalVisibles}
        type={'2'}
        names={names}
      />
      <Modela
        onSubmit={async value => {
          const success = await handleAdd(value);
          if (success) {
            handleModalVisible(false);
            props.actionRef.current()

          }
        }}
        list={props.tableList}
        nowId={nowId}
        type={type}
        onCancel={() => handleModalVisible(false)}
        modalVisible={createModalVisible}
      />
    </div>

  );
}

export default TableBordered
