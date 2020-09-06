import React, { useState, useEffect } from 'react';
import { Table, Modal, message, Select, Typography } from 'antd';
import styles from './index.less';
const { confirm } = Modal;
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { outAudit } from '../../api'
import { wareSelects } from '../../../allNeed'
const { Option } = Select;
const { Text } = Typography;

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
        changeWareList(res.data.map(item => {
          item.key = item.id;
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
  const handleChange = (e) => {
    changeWareId(e)
  }
  const [wareId, changeWareId] = useState('1');

  const delConfirm = (e) => {
    let nowId = ''
    confirm({
      title: '发货信息',
      icon: <ExclamationCircleOutlined />,
      // content: '审核通过此项',
      content: <div>
        <Text strong>姓名：{e.name}</Text>
        <br />
        <Text strong>联系方式：{e.phone}</Text>
        <br />
        <Text strong >物流公司：{e.logistics}</Text>
        <br />
        <Text strong>物流单号：{e.logistics_id}</Text>
        <br />
        <Text strong>发货地址：{e.address}</Text>
        <br />
        <Text strong>发货时间：{e.shipping_time}</Text>
      </div>,
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
      render: (text) => {
        return <span>{text / 100}</span>
      }
    },
    {
      title: '零售价',
      dataIndex: 'get_price',
      render: (text) => {
        return <span>{text / 100}</span>
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
          pagination={{
            showSizeChanger: false,//设置每页显示数据条数
            showQuickJumper: false,
            showTotal: () => `共${props.total.total}条`,
            pageSize: '10',
            total: props.total.total,  //数据的总的条数
            defaultCurrent: 1,
            current: props.total.current_page,
            onChange: (current) => { props.getData(current); props.changePage(current) }, //点击当前页码
          }}

        />
      </div>
    </div>
  );

}
export default TableBordered
