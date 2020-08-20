import React from 'react';
import { Table } from 'antd';
import styles from './index.less';
const TableBordered=props=>{


const columns = [
  {
    title: '采购申请日期 ',
    dataIndex: 'name',
    render: text => <a>{text}</a>,
  },
  {
    title: '采购单号',
    className: 'column-money',
    dataIndex: 'money',
  },
  {
    title: '供应商',
    dataIndex: 'address',
  },
  {
    title: '单据类型',
    dataIndex: 'address',
  },
  {
    title: '商品编码',
    dataIndex: 'address',
  },

  {
    title: '商品名称',
    dataIndex: 'address',
  },
   {
    title: '接受仓库',
    dataIndex: 'address',
  }, 
  {
    title: '成本价',
    dataIndex: 'address',
  },
  {
    title: '零售价',
    dataIndex: 'address',
  },{
    title: '商品数量',
    dataIndex: 'address',
  },{
    title: '已入库数量',
    dataIndex: 'address',
  },{
    title: '备注',
    dataIndex: 'address',
  },{
    title: '操作',
    dataIndex: 'address',
  },
];
const data = [
  {
    key: '1',
    name: 'John Brown',
    money: '￥300,000.00',
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    money: '￥1,256,000.00',
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Joe Black',
    money: '￥120,000.00',
    address: 'Sidney No. 1 Lake Park',
  },
];
return(
  <div className={styles.container}>
    <div id="components-table-demo-bordered">
      <Table
        columns={columns}
        dataSource={data}
        bordered
        title={() => 'Header'}
        footer={() => 'Footer'}
      />
    </div>
  </div>
);
}
export default TableBordered