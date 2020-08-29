import React, { useEffect, useState } from 'react';
import { Table, Pagination } from 'antd';
import styles from './index.less';
import Model from './Model'
import { getVenderCarrier } from '../../api'
const TableBordered = props => {
  const [createModalVisible, handleModalVisible] = useState(false);
  const [storeId, changeId] = useState();
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
      title: '下单日期 ',
      dataIndex: 'updated_at',
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
      title: '操作', render: (record) => (
        <span>
          {record.order_state == 'WAIT_SELLER_SEND_GOODS' || record.order_state == 'WAIT_SELLER_DELIVERY' ? <a style={{ marginRight: 16 }} onClick={() => { handleModalVisible(true); changeId(record.order_id) }}>发货</a> : ''}
        </span>
      ),

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
              props.actionRef.current()
            }
          }}
          onCancel={() => handleModalVisible(false)}
          modalVisible={createModalVisible}
          type={"2"}
          storeId={storeId}
          lists={props.lists}
          store={props.store}
        />

        <Table
          columns={columns}
          dataSource={props.list}
          bordered
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
        />
      </div>
    </div>
  );
}
export default TableBordered