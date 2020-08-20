import React, { useState, useEffect, useRef } from 'react';

import { Table, message, Modal, Drawer } from 'antd';
import styles from './index.less';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import Modals from '../Modal'
import { delPayment, paymentDetail } from '../../api'
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


const TableBordered = props => {
  const [drawerVisible, openDrawer] = useState(false);

  props.paymentList.map(res => {
    res.key = res.id;
    let time = new Date(res.created_at)
    let d = new Date(time);
    res.created_at = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
    return res;
  })
  const [createModalVisible, handleModalVisible] = useState(false);
  const [nowMsg, changeMsg] = useState();
  // console.log(props.tableList)

  const [detail, changeDe] = useState([])
  const [endList, changeEndList] = useState([])
  const [playList, changeplayList] = useState([])
  const [allMsg, changeAll] = useState({ 'shop': {} })
  const changeNow = (e) => {
    paymentDetail({ method: 'get' }, `?id=${e.id}`).then(res => {
      console.log(res)
      if (res.code == '200') {
        res.data.transfer.map(item => {
          item.allPrice = item.purchase_price * item.num;
          item.key = item.id;
          return item
        })
        res.data.log.map(item => {
          item.key = item.id;
          let time = new Date(item.updated_at)
          let d = new Date(time);
          item.updated_at = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
          return item;
        })
        changeDe(res.data.transfer)
        let payMsg=[];
        let time = new Date(res.data.created_at)
        let d = new Date(time);
        let payObj={
          type:res.data.type_name,
          user:res.data.user.name,
          credential:res.data.credential
        }
        payObj.created_at = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
        payMsg.push(payObj)
        changeplayList(payMsg)
        changeAll(res.data)
      }
    })
  }
  const expandedRowRender = (record) => {
    const columns = [
      {
        title: '商品名称', dataIndex: 'skus', key: 'name',
        render: (text) => <span>{text.name}</span>,
      },
      {
        title: '商品编码', dataIndex: 'skus', key: 'name',
        render: (text) => <span>{text.code}</span>,
      },
      {
        title: '接收仓库', dataIndex: 'accept_warehouse', key: 'name',
        render: (text) => <span>{text.name}</span>,

      },
      {
        title: '基准价', dataIndex: 'skus', key: 'name',
        render: (text) => <span>{text.cost_price}</span>,

      },
      {
        title: '零售价', dataIndex: 'skus', key: 'name',
        render: (text) => <span>{text.get_price}</span>,

      },
      {
        title: '商品数量', dataIndex: 'num', key: 'name',

      },
      { title: '已入库数量', dataIndex: 'put_num', key: 'name' },
      {
        title: '单位', dataIndex: 'skus', key: 'name',
        render: (text) => <span>{text.unit}</span>,
      },
      { title: '备注', dataIndex: 'comment', key: 'name' },

    ];
    let data = record.transfer;
    data.map(res => {
      res.key = res.id
      return res
    })
    return <Table columns={columns} dataSource={data} pagination={false} key={data.id} />;
  };


  const columns = [
    {
      title: '采购申请日期',
      dataIndex: 'created_at',
      render: (text) => <span>{text}</span>,
    },
    {
      title: '采购单号',
      dataIndex: 'code',
      render: (text, record) => (
        <span>
          <a style={{ marginRight: 16 }} onClick={() => { openDrawer(true); changeNow(record) }}>{text}</a>
        </span>
      ),
    },
    {
      title: '供应商',
      dataIndex: 'shop',
      render: (text) => <span>{text.name}</span>,
    },
    // {
    //   title: '单据类型',
    //   dataIndex: 'category',
    //   render: (text) => <span>{text}</span>,
    // },
    {
      title: '制单人',
      dataIndex: 'user',
      render: (text) => <span>{text.name}</span>,
    },
    {
      title: '操作', dataIndex: 'unit', key: 'name', render: (text, record) => (
        <span>
          {
            record.time == '0' ? (
              <a style={{ marginRight: 16 }} onClick={() => { handleModalVisible(true); changeMsg(record) }}>付款</a>
            ) : null
          }
          {/* <a style={{ marginRight: 16 }} onClick={() => { handleModalVisibles(true); changeId(record.id); }}>修改</a> */}
          {/* <a onClick={() => { delConfirm(record); }}>删除</a> */}
        </span>
      ),

    },

  ];
  const drawColumns = [
    {
      title: '商品编码',
      dataIndex: 'sku',
      render: (text) =>
        <span>{text.code}</span>,
    },
    {
      title: '商品名称',
      dataIndex: 'sku',
      render: (text) =>
        <span>{text.name}</span>,

    },
    {
      title: '品牌',
      dataIndex: 'sku',
      render: (text) =>
        <span>{text.brand_name}</span>,
    },
    {
      title: '品类',
      dataIndex: 'sku',
      render: (text) =>
        <span>{text.category_name}</span>,
    },
    {
      title: '颜色',
      dataIndex: 'sku',
      render: (text) =>
        <span>{text.color}</span>,
    },
    {
      title: '基准价',
      dataIndex: 'sku',
      render: (text) =>
        <span>{text.cost_price}</span>,
    },

    {
      title: '采购价',
      dataIndex: 'purchase_price',
      render: (text) => <span>{text}</span>,
    },
    {
      title: '差额',
      dataIndex: 'reduce_price',
      render: (text) => <span>{text}</span>,
    },
    {
      title: '数量',
      dataIndex: 'num',
      render: (text) => <span>{text}</span>,
    },
    {
      title: '采购合计',
      dataIndex: 'allPrice',
      render: (text) => <span>{text}</span>,
    },
    {
      title: '接收仓库',
      dataIndex: 'accept_warehouse',
      render: (text) => <span>{text.name}</span>,
    },
    {
      title: '已入库数量',
      dataIndex: 'put_num',
      render: (text) => <span>{text}</span>,
    },
    {
      title: '入库合计',
      dataIndex: 'purchase_price',
      render: (text) => <span>{text}</span>,
    },

    {
      title: '备注',
      dataIndex: 'comment',
      render: (text) => <span>{text}</span>,
    },

  ];
  const operation = [
    {
      title: '操作类型 ',
      dataIndex: 'typ_name',
      render: (text) =>
        <span>{text}</span>,
    },

    {
      title: '操作人',
      dataIndex: 'user',
      render: (text) =>
        <span>{text.name}</span>,
    },

    {
      title: '时间',
      dataIndex: 'updated_at',
      render: (text) =>
        <span>{text}</span>,
    },
    {
      title: '记录',
      dataIndex: 'content',
      render: (text) =>
        <span>{text}</span>,
    },
  ]
  const payMsg = [
    {
      title: '付款方式',
      dataIndex: 'type',
      render: (text) =>
        <span>{text}</span>,
    },
    {
      title: '操作人',
      dataIndex: 'user',
      render: (text) =>
        <span>{text}</span>,
    },
    {
      title: '时间',
      dataIndex: 'created_at',
      render: (text) =>
        <span>{text}</span>,
    },
    {
      title: '凭据信息',
      dataIndex: 'credential',
      render: (text) =>
        <span>{text}</span>,
    },

  ]
  return (
    <div className={styles.container}>
      <div id="components-table-demo-bordered">
        <Drawer
          title="入库详情"
          width={1020}
          closable={false}
          onClose={() => { openDrawer(false) }}
          visible={drawerVisible}
        >
          <h2 >{allMsg.shop.name}</h2>
          <h2>总计：{allMsg.sum_purchase_price}<span style={{ float: 'right' }}>运费：{allMsg.fare}</span></h2>
          <Table
            columns={drawColumns}
            dataSource={detail}
            bordered
          >
          </Table>
          {allMsg.time == '0' ? '' : <div>
            <h2>付款信息</h2>
            <Table
              columns={payMsg}
              dataSource={playList}
              bordered
            >
            </Table>
          </div>}


          <h2>操作记录</h2>
          <Table
            columns={operation}
            dataSource={allMsg.log}
            bordered
          >
          </Table>
        </Drawer>
        <Table
          columns={columns}
          dataSource={props.paymentList}
          bordered
          expandable={{
            expandedRowRender
          }}
          title={() => '商品列表'}
          footer={() => 'Footer'}
        >
        </Table>
        <Modals
          onSubmit={async value => {
            const success = await handleAdd(value);
            if (success) {
              handleModalVisible(false);
              if (props.actionRef.current) {
                props.actionRef.current('0');
              }
            }
          }}
          nowMsg={nowMsg}
          onCancel={() => handleModalVisible(false)}
          modalVisible={createModalVisible}
        />

      </div>
    </div>
  );
}

export default TableBordered
