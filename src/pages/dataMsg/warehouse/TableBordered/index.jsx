import React ,{useState,useEffect}from 'react';
import { Table, Modal,message } from 'antd';
import styles from './index.less';
const { confirm } = Modal;
import {delWareList} from '../../api'
import { ExclamationCircleOutlined } from '@ant-design/icons';
import Model from '../Model'

const TableBordered = props => {
  const [createModalVisible, handleModalVisible] = useState(false);
  const [nowMsg, changeMsg] = useState({});

  const handleAdd = (e) => {
    if (e == '200') {
      return true;
    } else {
      return false;
    }
  }
  props.wareList.map(res => {
    res.key = res.id;
    return res;
  })
  const delConfirm = (e) => {
    confirm({
      title: '你确定要删除此仓库吗?',
      icon: <ExclamationCircleOutlined />,
      content: '删除仓库',
      onOk() {
        delWareList({ method: "POST", data: { id: e} }).then(res => {
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
      title: '仓库编码',
      dataIndex: 'code',
      render: text => <a>{text}</a>,
    },
    {
      title: '仓库名称',
      dataIndex: 'name',
    },
    {
      title: '仓库类型',
      dataIndex: 'property',
      render: text => <span>{text.name}</span>,

    },
    {
      title: '仓库状态',
      dataIndex: 'status',
      render: text => {
        if (text == '1') {
          return <span>正常</span>
        } else {
          return <span>冻结</span>
        }
      }
    },
    {
      title: '负责人',
      dataIndex: 'user',
      render: text => <span>{text.name}</span>,
    },
    {
      title: '联系方式',
      dataIndex: 'phone',
    },
    {
      title: '仓库区域',
      dataIndex: 'area',
    },
    {
      title: '备注',
      dataIndex: 'comment',
    }, {
      title: '操作',
      key:'id',
      render: (text, record) => (
        <span>
          <a style={{ marginRight: 16 }} onClick={() => { handleModalVisible(true); changeMsg(record); }}>修改</a>
          {/* <a style={{ marginRight: 16 }}>删除</a> */}
          <a onClick={() => { delConfirm(record.id) }}>删除</a>
        </span>
      ),
    },
  ];

  return (
    <div className={styles.container}>
      <div id="components-table-demo-bordered">
        <Table
          columns={columns}
          dataSource={props.wareList}
          bordered
          title={() => '仓库列表'}
          pagination={false}
        />
        <Model
          onSubmit={async value => {
            const success = await handleAdd(value);
            if (success) {
              handleModalVisible(false);
              props.actionRef.current();
            }
          }}
          onCancel={() => handleModalVisible(false)}
          modalVisible={createModalVisible}
          nowMsg={nowMsg}
          type={'2'}
        />
      </div>
    </div>
  );
}
export default TableBordered
