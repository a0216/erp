import React, { useState, useEffect, useRef } from 'react';

import { Table, message, Modal } from 'antd';
import styles from './index.less';
import { ExclamationCircleOutlined } from '@ant-design/icons';
// import Model from '../Model'
// import { delPayment } from '../../api'
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

const TableBordered = props => {
  const [createModalVisible, handleModalVisible] = useState(false);
  props.showMsg.goods.map(res=>{
    res.key=res.id
    return res
  })
  // console.log(props.tableList)
  // const delConfirm = (e) => {
  //   confirm({
  //     title: '你确定要删除此订单吗?',
  //     icon: <ExclamationCircleOutlined />,
  //     content: '删除订单',
  //     onOk() {
  //       console.log(e)
  //       delPayment({ method: "POST", data: { id: e.id } }).then(res => {
  //         console.log(res)
  //         if (res.code == '200') {
  //           message.success("已删除")
  //           props.actionRef.current()
  //         } else {
  //           message.error("删除失败")
  //         }
  //       })
  //     },
  //     onCancel() {
  //       message.error("已取消")
  //     },
  //   });
  // }
  const expandedRowRender = (record) => {
    const columns = [
      {
        title: '商品名称',
        dataIndex: 'name',
        render: (text) => <span>{text}</span>,
      },
      {
        title: '商品编码', dataIndex: 'code', key: 'name',
        render: (text) => <span>{text}</span>,
      },
      {
        title: '颜色', dataIndex: 'color', key: 'name',
        render: (text) => <span>{text}</span>,
      },
      {
        title: '数量', dataIndex: 'num', key: 'name',
        render: (text) => <span>{text}</span>,
      },
     
      

    ];
    let data = record.skus;
    data.map(res => {
      res.key = res.id
      return res
    })
    return <Table columns={columns} dataSource={data} pagination={false} key={data.id} />;
  };


  const columns = [
    {
      title: '统一编码',
      dataIndex: 'code',
      render: (text) =>
        <span>{text}</span>,
    },
   
    {
      title: '品牌',
      dataIndex: 'brand_name',
      render: (text) => <span>{text}</span>,
    },
    // {
    //   title: '单据类型',
    //   dataIndex: 'category',
    //   render: (text) => <span>{text}</span>,
    // },
    {
      title: '品类',
      dataIndex: 'category_name',
      render: (text) => <span>{text}</span>,
    },
    {
      title: '单位', dataIndex: 'unit_name' ,
      render: (text) => <span>{text}</span>,
    },

  ];
  const data = []
  return (
    <div className={styles.container}>
      <div id="components-table-demo-bordered">
        <Table
          columns={columns}
          dataSource={props.showMsg.goods}
          bordered
          expandable={{
            expandedRowRender
          }}
          title={() => <h3>{props.showMsg.code} {props.showMsg.name} {props.showMsg.property_name} <span style={{float:'right'}}>{props.showMsg.status == '1' ? '正常' : '冻结'}</span></h3>}
          // footer={() => 'Footer'}
        >
        </Table>
        {/* <Model
          onSubmit={async value => {
            const success = await handleAdd(value);
            if (success) {
              handleModalVisible(false);
            }
          }}
          onCancel={() => handleModalVisible(false)}
          modalVisible={createModalVisible}
        /> */}

      </div>
    </div>
  );
}

export default TableBordered
