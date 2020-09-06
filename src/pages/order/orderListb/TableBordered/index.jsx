import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import styles from './index.less';
import Model from '../Model'
import Models from './Model'
import {goods} from '../../api'
const TableBordered = props => {
  const [createModalVisible, handleModalVisible] = useState(false);
  const [createModalVisibleb, handleModalVisibleb] = useState(false);
  const [product, changeProduct] = useState(false);
  const [sendMsg,changeMsg]=useState({})
  
  const [nowMsg, changeNowMsg] = useState(false);
  const handleAdd = async (res) => {
    if (res == '200') {
      return true
    } else {
      return false
    }
  }
  const sendGood=e=>{
    changeMsg(e)
    goods(e.id).then(res=>{
      if(res.code=='200'){
        changeProduct(res.data.map(item=>{
          item.key=item.id;
          return item;
        }))
      }
    })
    handleModalVisibleb(true);
  }
  const expandedRowRender = (record) => {
    const columns = [
      {
        title: '商品名称',
        dataIndex: 'name',
      }, {
        title: '商品编码',
        dataIndex: 'code',
      },
      {
        title: '数量',
        dataIndex: 'num',
      },
      {
        title: '销售单价',
        dataIndex: 'get_real_price',
        render: (text) => {
          return <span>{text / 100}</span>
        }
      }, {
        title: '开单价',
        dataIndex: 'open_price',
        render: (text) => {
          return <span>{text / 100}</span>
        }
      },
      {
        title: '合计',
        dataIndex: 'all_price',
        render: (text) => {
          return <span>{text / 100}</span>
        }
      }, {
        title: '单位',
        dataIndex: 'unit_name',
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
      title: '下单日期 ',
      dataIndex: 'updated_at',
    },
    {
      title: '订单号',
      dataIndex: 'code',
    },
    {
      title: '订单状态',
      dataIndex: 'status_name',
    },
    {
      title: '姓名',
      dataIndex: 'name',
    },
    {
      title: '联系方式',
      dataIndex: 'phone',
    },

    {
      title: '地址',
      dataIndex: 'address',
    },
    {
      title: '供应商',
      dataIndex: 'store_name',
    },
    {
      title: '付款状态',
      dataIndex: 'pay_name',
      // render: (text) => {if(text=='1'){<span></span>}else if(text=='2'){<span></span>}},
    },
    {
      title: '补差合计',
      dataIndex: 'all_sub_price',
      render: (text) => {
        return <span>{text / 100}</span>
      }
    },
    {
      title: '开单价',
      dataIndex: 'all_open_price',
      render: (text) => {
        return <span>{text / 100}</span>
      }
    },
    {
      title: '总价格',
      dataIndex: 'all_price',
      render: (text) => {
        return <span>{text / 100}</span>
      }
    },
    {
      title: '操作', render: (text, record) => (
        <span>
          {record.pay_type == '1' ? <a onClick={() => { changeNowMsg(record); handleModalVisible(true) }}>付款</a> : ""}
          <br/>
          {record.status == '0' ? <a onClick={() => { changeNowMsg(record);sendGood(record) }}>发货</a> : ""}
        </span>
      ),
    },
  ];
  return (
    <div >
      <div id="components-table-demo-bordered">
        <Model
          onSubmit={async value => {
            const success = await handleAdd(value);
            if (success) {
              handleModalVisible(false);

              props.actionRef.current();
            }
          }}
          handleAdd={handleAdd}
          onCancel={() => handleModalVisible(false)}
          nowMsg={nowMsg}
          modalVisible={createModalVisible}
        >

        </Model>
        <Models
          onSubmit={async value => {
            const success = await handleAdd(value);
            if (success) {
              handleModalVisibleb(false);
              props.actionRef.current('',1)
            }
          }}
          onCancel={() => handleModalVisibleb(false)}
          modalVisible={createModalVisibleb}
          type={"2"}
          lists={props.lists}
          store={props.store}
          nowMsg={sendMsg}
          product={product}
          // storeId={storeId}
        />
        {props.list && props.list.length > 0 ?
          <Table
            defaultExpandAllRows={true}
            columns={columns}
            dataSource={props.list}
            bordered
            expandable={{
              expandedRowRender
            }}
            scroll={{ x: 1500 }}
            title={() => '销售订单'}
            pagination={{
              showSizeChanger: false,//设置每页显示数据条数
              showQuickJumper: false,
              showTotal: () => `共${props.allMsg.total}条`,
              pageSize: '10',
              total: props.allMsg.total,  //数据的总的条数
              defaultCurrent: 1,
              current:props.allMsg.current_page,
              onChange: (current) => { props.getData(current);props.changePage(current) }, //点击当前页码
            }}             
          /> : ''}
      </div>
    </div>
  );
}
export default TableBordered