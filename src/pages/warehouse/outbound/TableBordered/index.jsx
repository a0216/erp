import React, { useState, useEffect } from 'react';
import { Table, Modal, message, Select } from 'antd';
import styles from './index.less';
const { confirm } = Modal;
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { outAudit } from '../../api'
import { wareSelects } from '../../../allNeed'
const { Option } = Select;

const TableBordered = props => {
  if (props.outWare.length > 0) {
    props.outWare.map(res => {
      res.key = res.id;
      return res;
    })
  }
  const getData = () => {
    wareSelects({ method: 'get' }).then(res => {
      if (res.code == '200') {
        changeWareList(res.data.map(item=>{
          item.key=item.id;
          return item
        }))
      }
    })
  }
  const [wareList, changeWareList] = useState([]);

  useEffect(() => {
    getData()

    return () => {
    };
  }, []);
  const handleChange=(e)=>{
    changeWareId(e)
  }
  const [wareId, changeWareId] = useState('1');
 
  const delConfirm = (e) => {
    let nowId=''
    confirm({
      icon: <ExclamationCircleOutlined />,
      // content: '审核通过此项',
      content: <Select placeholder="请选择仓库" style={{ width: 120 }} onSelect={(e)=>{
        nowId=e;
        changeWareId(e)
      }}>
        {wareList.map(res=>{
        return <Option value={res.id} key={res.key}>{res.name}</Option>
        })}
      </Select>,
      onOk() {
        outAudit({ method: "POST", data: { id: e.id, wid: nowId } }).then(res => {
          if (res.code == '200') {
            message.success("已审核")
            // props.actionRef.current()
          } else {
            message.error("审核失败")
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
      title: '出库申请日期',
      dataIndex: 'created_at',
      // render: text => <a>{text}</a>,
    },

    {
      title: '出库单号',
      dataIndex: 'code',
    },
    // {
    //   title: '单据类型',
    //   dataIndex: 'type',
    // },
    {
      title: '出库原因',
      dataIndex: 'type_name',
    },
    {
      title: '仓库名称',
      dataIndex: 'warehouse_name',
    },
    {
      title: '制单人',
      dataIndex: 'apply_user_name',
    },
    {
      title: '审核人',
      dataIndex: 'audit_user_name',
    },
    {
      title: '审核时间',
      dataIndex: 'audit_time',
    },
    {
      title: '商品编码',
      dataIndex: 'shop_code',
    },

    {
      title: '商品名称',
      dataIndex: 'sku_name',
    },
    {
      title: '商品数量',
      dataIndex: 'num',
    },
    {
      title: '基准价',
      dataIndex: 'cost_price',
      render:(text)=>{
      return <span>{text/100}</span>
      }
    },
    {
      title: '零售价',
      dataIndex: 'get_price',
      render:(text)=>{
        return <span>{text/100}</span>
        }
    },
    {
      title: '操作', render: (text, record) => (
        <span>
          {record.status == '0' ? <a onClick={() => { delConfirm(record); }}>审核</a> : ""}
        </span>
      ),
    },
  ];

  return (
    <div className={styles.container}>
      <div id="components-table-demo-bordered">
        <Table
          columns={columns}
          dataSource={props.outWare}
          bordered
          scroll={{ x: 1500 }}
      
        />
      </div>
    </div>
  );

}
export default TableBordered
