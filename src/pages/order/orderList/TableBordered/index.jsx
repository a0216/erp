import React, { useEffect, useState } from 'react';
import { Table, Pagination } from 'antd';
import styles from './index.less';
import Model from './Model'
import Modelb from './Modelb'
import { listGoods } from '../../api'
const TableBordered = props => {
  const [createModalVisible, handleModalVisible] = useState(false);
  const [createModalVisibleb, handleModalVisibleb] = useState(false);
  const [nowMsg, changeMsg] = useState();
  const [storeId, changeId] = useState();
  const [product, changePro] = useState([])

  const getData = (order, store) => {
    listGoods(`?oid=${order}&storeId=${store}`).then(res => {
      if (res.code == '200') {
        changePro(res.data.map(item => {
          item.key = item.id;
          return item;
        }))
      }
    })
  }
  const handleAdd = (e) => {
    if (e == '200') {
      return true
    } else {
      return false
    }
  }

  const [lists, setlists] = useState([]);
  useEffect(() => {
    return () => {

    };
  }, []);
  const expandedRowRender = (record) => {
    const columns = [
      {
        title: '商品名称',
        dataIndex: 'sku_name',
        ellipsis: true,

      }, {
        title: '商品编码',
        dataIndex: 'sku_id',
      },
      {
        title: '数量',
        dataIndex: 'total',
      }, {
        title: '京东售价',
        dataIndex: 'jd_price',
      },

      // {
      //   title: '仓库名称',
      //   dataIndex: 'address',
      // },
      // {
      //   title: '物流公司',
      //   dataIndex: 'address',
      // },
      // {
      //   title: '物流单号',
      //   dataIndex: 'address',
      // },
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
      title: '同步日期 ',
      dataIndex: 'created_at',
    },
    {
      title: '订单创建日期 ',
      dataIndex: 'order_start_time',
    },
    {
      title: '订单号',
      dataIndex: 'order_id',
    },
    {
      title: '订单状态',
      dataIndex: 'order_state_remark',
    },
    {
      title: '姓名',
      dataIndex: 'full_name',
      ellipsis: true,
    },
    {
      title: '联系方式',
      dataIndex: 'mobile',
      ellipsis: true,
    },
    {
      title: '地址',
      dataIndex: 'full_address',
      ellipsis: true,
    },
    {
      title: '用户应付金额',
      dataIndex: 'order_payment',
    },

    {
      title: '订单货款金额',
      dataIndex: 'order_seller_price',
    },

    {
      title: '订单总金额',
      dataIndex: 'order_total_price',
    },
    {
      title: '订单总金额',
      dataIndex: 'order_total_price',
    },
    {
      title: '支付方式',
      dataIndex: 'pay_type',
    },
    {
      title: '订单备注',
      dataIndex: 'order_remark',
    }, {
      title: '结单时间',
      dataIndex: 'order_end_time',
    },
    {
      title: '操作', render: (record) => {
        if (record.inventory_status == '1') {
          return <span></span>
        } else if (record.inventory_status == '0') {
          if (record.type != 'fenxiao') {
            if (record.order_state == 'WAIT_SELLER_SEND_GOODS' || record.order_state == 'WAIT_SELLER_DELIVERY') {
              return <span>
                <a style={{ marginRight: 16 }} onClick={() => { handleModalVisible(true); changeMsg(record); changeId(record.order_id); getData(record.id, record.store_id) }}>发货</a>
                <a style={{ marginRight: 16 }} onClick={() => { handleModalVisibleb(true); changeMsg(record); changeId(record.order_id); getData(record.id, record.store_id) }}>同步库存</a>
              </span>
            }
          }
          return <a style={{ marginRight: 16 }} onClick={() => { handleModalVisibleb(true); changeMsg(record); changeId(record.order_id); getData(record.id, record.store_id) }}>同步库存</a>

        }
      }

    },
  ];
  // var paginationProps = {
  //   showSizeChanger: false,//设置每页显示数据条数
  //   showQuickJumper: false,
  //   showTotal: () => `共${props.allMsg.total}条`,
  //   pageSize: props.allMsg.pageSize,
  //   total: props.allMsg.total,  //数据的总的条数
  //   defaultCurrent: 1,
  //   onChange: (current) => props.actionRef.current(props.store, current), //点击当前页码
  // }

  useEffect(() => {

  }, [])

  return (
    <div >
      <div id="components-table-demo-bordered">
        <Model
          onSubmit={async value => {
            const success = await handleAdd(value);
            if (success) {
              handleModalVisible(false);
              props.actionRef.current('',1)
            }
          }}
          onCancel={() => handleModalVisible(false)}
          modalVisible={createModalVisible}
          type={"2"}
          lists={props.lists}
          store={props.store}
          nowMsg={nowMsg}
          product={product}
          storeId={storeId}
        />
        <Modelb
          onSubmit={async value => {
            const success = await handleAdd(value);
            if (success) {
              handleModalVisibleb(false);
              props.actionRef.current('',1)
            }
          }}
          onCancel={() => handleModalVisibleb(false)}
          modalVisible={createModalVisibleb}
          storeId={storeId}
          lists={props.lists}
          store={props.store}
          nowMsg={nowMsg}
          product={product}
          storeId={storeId}
        />
        {props.list && props.list.length > 0 ?
          <Table
            columns={columns}
            dataSource={props.list}
            bordered
            defaultExpandAllRows={true}
            expandable={{
              expandedRowRender
            }}
            scroll={{ x: 1500 }}
            pagination={{
              showSizeChanger: false,//设置每页显示数据条数
              showQuickJumper: false,
              showTotal: () => `共${props.allMsg.total}条`,
              pageSize: props.allMsg.pageSize,
              total: props.allMsg.total,  //数据的总的条数
              defaultCurrent: 1,
              onChange: (current) => { props.actionRef.current(props.store, current); props.changePage(current) }, //点击当前页码
            }}
          /> : ''}
      </div>
    </div>
  );
}
export default TableBordered