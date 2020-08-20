import React, { useState, useEffect, useRef } from 'react';

import { Table, message, Modal, Drawer, Statistic, Row, Col, Typography } from 'antd';
import styles from './index.less';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import Model from '../Model'
import { delPayment, paymentDetail } from '../../api'
import { wareSelects } from '../../../allNeed'

const { confirm } = Modal;
const { Countdown } = Statistic;
const { Text } = Typography;


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
  const [wareList, changetWare] = useState([]);
  useEffect(() => {
    wareSelects({ method: 'GET' }).then(res => {
      if (res.code == '200') {
        res.data.map(item => {
          item.key = item.id;
          return item;
        })
        changetWare(res.data)
      }
    })
    return () => {

    };
  }, []);
  props.paymentList.map(res => {
    res.key = res.id;
    let time = new Date(res.created_at)
    let d = new Date(time);
    // res.time="11111111111"
    res.created_at = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
    return res;
  })

  const [createModalVisible, handleModalVisible] = useState(false);
  const [drawerVisible, openDrawer] = useState(false);

  // console.log(props.tableList)
  const delConfirm = (e) => {
    confirm({
      title: '你确定要删除此订单吗?',
      icon: <ExclamationCircleOutlined />,
      content: '删除订单',
      onOk() {
        console.log(e)
        delPayment({ method: "POST", data: { id: e.id } }).then(res => {
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
  const [detail, changeDe] = useState([])
  const [endList, changeEndList] = useState([])
  const [nowMsg, changeNowMsg] = useState({})
  const [allMsg, changeAll] = useState({ 'shop': {} })

  const changeNowMsgs = (e) => {
    changeNowMsg(e)
    console.log(e)
  }
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
          let time = new Date(item.created_at)
          let d = new Date(time);
          item.created_at = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
          return item;
        })
        changeDe(res.data.transfer)
        changeAll(res.data)
      }
    })
  }
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

  const columns = [
    {
      title: '采购申请日期',
      dataIndex: 'created_at',
      render: (text) =>
        <span>{text}</span>,
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
        <span>{record.update=='1'?<a style={{ marginRight: 16 }} onClick={() => { handleModalVisible(true); changeNowMsgs(record) }}>修改</a>:''}
          
          {/* <a style={{ marginRight: 16 }}>删除</a> */}
          <a onClick={() => { delConfirm(record); }}>删除</a>
        </span>
      ),

    },
  ];

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
        >
        </Table>

        <Model
          onSubmit={async value => {
            const success = await handleAdd(value);
            if (success) {
              handleModalVisible(false);
              props.actionRef.current('0')
            }
          }}
          onCancel={() => handleModalVisible(false)}
          modalVisible={createModalVisible}
          type={"2"}
          nowMsg={nowMsg}
          wareList={wareList}
        />

      </div>
    </div>
  );
}

export default TableBordered
