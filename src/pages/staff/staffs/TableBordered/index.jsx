import React, { useState, useEffect, useRef } from 'react';
import { ExclamationCircleOutlined } from '@ant-design/icons';

import { Table, message, Switch, Modal } from 'antd';
import styles from './index.less';
import { DownOutlined } from '@ant-design/icons';

import Modela from '../Model/index'
import { restPsd, delUser,changeStatus } from '../../api'

const { confirm } = Modal;

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
  const [userList, changeList] = useState(props.tableList)
  const [createModalVisible, handleModalVisible] = useState(false);
  const [createModalVisibles, handleModalVisibles] = useState(false);
  const [nowMsg, changeMsg] = useState({});
  const [type, addOrch] = useState('1');
  const changeSwitch = (e) => {
    console.log(e)
    changeStatus({method:"POST",data:{'uid':e.id}}).then(res=>{
      console.log(res)
    })
    // /user/add


  }
  const delConfirm = (e) => {
    confirm({
      title: '你确定要删除此用户吗?',
      icon: <ExclamationCircleOutlined />,
      content: '删除用户',
      onOk() {
        delUser({ method: "POST", data: { uid: e.id } }).then(res => {
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
 
  const showConfirm = (e) => {
    console.log(e)
    let formData = new FormData()
    formData.append("uid", e.id)
    formData.append("password", '123123')
    confirm({
      title: '你确定要重置此密码?',
      icon: <ExclamationCircleOutlined />,
      content: '重置为123123',
      onOk() {
        restPsd({ method: "POST", data: formData }).then(res => {
          if (res.code == '200') {
            message.success("重置成功")

          } else {
            message.error("请稍后重试")
          }
        })

      },
      onCancel() {
        message.error("已取消")
      },
    });
  }

  useEffect(() => {


  }, []);
  // const goModel=(e)=>{
  //   // handleModalVisible(true)
  //   console.log(e.id)
  // }
  const columns = [
    {
      title: '员工名称',
      dataIndex: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: '手机号',
      dataIndex: 'phone',
    },
    {
      title: '所在部门',
      dataIndex: 'departmentName',
    },
    {
      title: '职位',
      dataIndex: 'roleName',
    },
    {
      title: '备注',
      dataIndex: '',
    },
    {
      title: '状态',
      key:'id',
      // dataIndex: 'id',
      render: (text, record) => (
        <Switch defaultChecked onChange={()=>changeSwitch(record)} checked={record.status} />
      ),
    },
    {
      title: '操作',
      key: 'name',
      render: (text, record) => (
        <span>
          <a style={{ marginRight: 16 }} onClick={() => showConfirm(record)}>重置密码</a>
          <a style={{ marginRight: 16 }} onClick={() => { handleModalVisibles(true); changeMsg(record); }}>修改</a>
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
          dataSource={props.userList.map(res => {
            res.key = res.id;
            return res
          })}
          key={props.userList.id}
          onRow={record => {
            return {
              onClick: event => { changeThis }, // 点击行

            };
          }}
          bordered
          title={() => '员工列表'}
          footer={() => 'Footer'}
        >

        </Table>
      </div>
      <Modela
        onSubmit={async value => {
          const success = await handleAdd(value);
          if (success) {
            handleModalVisibles(false);
            props.actionRef.current()
          }
        }}
        onCancel={() => handleModalVisibles(false)}
        modalVisible={createModalVisibles}
        type={'2'}
        nowMsg={nowMsg}
      />

    </div>

  );
}

export default TableBordered
