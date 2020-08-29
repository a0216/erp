import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import styles from './index.less';
import Model from '../Model'
const TableBordered = props => {
  const [createModalVisible, handleModalVisible] = useState(false);
  const [nowMsg, changeNowMsg] = useState(false);
  const handleAdd = async (res) => {
    if (res == '200') {
      return true
    } else {
      return false
    }
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
        dataIndex: 'all_price',
        render: (text) => {
          return <span>{text / 100}</span>
        }
      },  {
        title: '开单价',
        dataIndex: 'all_price',
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
      dataIndex: 'money',
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
      dataIndex: 'all_price',
      render: (text) => {
        return <span>{text / 100}</span>
      }
    },
    {
      title: '开单价',
      dataIndex: 'all_price',
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
        <Table
          columns={columns}
          dataSource={props.list}
          bordered
          expandable={{
            expandedRowRender
          }}
          scroll={{ x: 1500 }}
          title={() => 'Header'}
          footer={() => 'Footer'}
        />
      </div>
    </div>
  );
}
export default TableBordered