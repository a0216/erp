import React, { useState, useEffect, useRef } from 'react';

import { Table, message, Modal, InputNumber } from 'antd';
import styles from './index.less';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import Modela from '../Model'
const { confirm } = Modal;

const handleAdd = async fields => {
  const hide = message.loading('正在添加');
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

const delConfirm = (e) => {
  confirm({
    title: '你确定要删除此商品吗?',
    icon: <ExclamationCircleOutlined />,
    content: '删除商品',
    onOk() {
      delUser({ method: "POST", data: { uid: e.id } }).then(res => {
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

const TableBordered = props => {
  props.list.map(res => {
    res.key = res.id;
    return res;
  })
  localStorage.setItem('productList', JSON.stringify(props.list))
  const [tableList, changeList] = useState(props.list)
  const [createModalVisible, handleModalVisible] = useState(false);
  const [nowId, changeId] = useState();
  const [names, changeName] = useState();
  const [type, addOrch] = useState('1');
  const expandedRowRender = (record) => {
    const columns = [
      { title: '商品名称', dataIndex: 'name', key: 'name' },
      { title: '商品编码', dataIndex: 'code', key: 'name' },
      { title: '颜色', dataIndex: 'color', key: 'name' },
      { title: '单位', dataIndex: 'unit', key: 'name' },
      {
        title: '基准价', dataIndex: 'cost_price', key: 'name',
        render: (text) => {
          return <span>{text / 100}</span>
        }
      },
      {
        title: '零售价', dataIndex: 'get_price', key: 'name',
        render: (text) => {
          return <span>{text / 100}</span>
        }
      },

    ];

    let data = record.skus;
    data.map(res => {
      res.key = res.id
      res.unit = record.unit.name;
      return res
    })
    return <Table columns={columns} dataSource={data} pagination={false} key={data.id} />;
  };
  useEffect(() => {


  }, []);

  const columns = [
    {
      title: '统一编码',
      dataIndex: 'code',
      render: (text) => <a>{text}</a>,
    },
    {
      title: '品牌',
      dataIndex: 'brand',
      render: (text) => <span>{text.name}</span>,

    },
    {
      title: '品类',
      dataIndex: 'category',
      render: (text) => <span>{text.name}</span>,

    },
    {
      title: '操作',
      key: 'category',
      render: (text, record) => (
        <span>
          <a style={{ marginRight: 16 }} onClick={() => { handleModalVisible(true); changeName(record); }}>修改</a>
          {/* <a style={{ marginRight: 16 }}>删除</a> */}
          <a onClick={() => { delConfirm(record.id); }}>删除</a>
        </span>
      ),
    },
  ];

  return (
    <div className={styles.container}>
      <div id="components-table-demo-bordered">
        <Table
          columns={columns}
          dataSource={props.list}
          bordered
          expandable={{
            expandedRowRender
          }}
          title={() => '商品列表'}
          footer={() => 'Footer'}
        >
        </Table>
        <Modela
          onSubmit={async value => {
            const success = await handleAdd(value);
            if (success) {
              handleModalVisible(false);
              props.actionRef.current();
            }
          }}
          nowMsg={names}
          onCancel={() => { handleModalVisible(false); changeName() }}
          modalVisible={createModalVisible}
          type={'2'}
        />
      </div>
    </div>
  );
}

export default TableBordered
