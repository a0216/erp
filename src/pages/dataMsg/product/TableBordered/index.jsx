import React, { useState, useEffect, useRef } from 'react';

import { Table, message, Modal, InputNumber } from 'antd';
import styles from './index.less';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import Modela from '../Model'
const { confirm } = Modal;
import Modelb from './Model'
import { goodsDel, getJd, getTb, getProduct } from '../../api'

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
  const [nowMsg, changenowMsg] = useState('');
  props.list.map(res => {
    res.key = res.id;
    return res;
  })

  const delConfirm = (e) => {
    confirm({
      title: '你确定要删除此商品吗?',
      icon: <ExclamationCircleOutlined />,
      content: '删除商品',
      onOk() {
        let data = {}
        data.id = e;
        goodsDel({ method: "POST", data }).then(res => {
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
  localStorage.setItem('productList', JSON.stringify(props.list))
  // const [tableList, changeList] = useState(props.list)
  const [createModalVisible, handleModalVisible] = useState(false);
  const [createModalVisibleb, handleModalVisibleb] = useState(false);
  const [nowId, changeId] = useState();
  const [skuId, changeSku] = useState();
  const [names, changeName] = useState();
  const [total, addTotal] = useState({})
  const [send, adDSend] = useState(1)
  const [tableList, setlist] = useState([]);
  const getThis = (e, ids) => {
    changeId(e)
    changeSku(ids)
    if (e == '1') {
      getJd(ids.id).then(res => {
        if (res.code == '200') {
          changenowMsg(res.data)
          handleModalVisibleb(true);

        }
      })
    } else {
      getTb(ids.id).then(res => {
        if (res.code == '200') {
          changenowMsg(res.data)
          handleModalVisibleb(true);
        }
      })
    }
  }
  const getData = (e) => {
    getProduct(e).then(res => {
      if (res.code == '200') {
        addTotal(res.data)
        setlist(res.data.data.map(item => {
          item.key = item.id;
          return item
        }))
      }
    })
  }
  const sendMsg = (e, id) => {
    let arr=JSON.stringify(tableList);
    JSON.parse(arr).map(res=>{
      if(res.id==id){
        changeName(res)
      }
    })
  }
  useEffect(() => {
    getData(1)
  }, [])
  const expandedRowRender = (record) => {

    const columns = [
      { title: '商品名称', dataIndex: 'name', key: 'name' },
      { title: '商品编码', dataIndex: 'code', key: 'name' },
      { title: '颜色', dataIndex: 'color', key: 'name' },
      { title: '单位', dataIndex: 'unit', key: 'name' },
      {
        title: '基准价', dataIndex: 'cost_price', key: 'name',
        render: (text) => {
          return <span>{text / 100}</span>
        }
      },
      {
        title: '零售价', dataIndex: 'get_price', key: 'name',
        render: (text) => {
          return <span>{text / 100}</span>
        }
      },
      {
        title: '操作',
        key: 'category',
        render: (text, record) => (
          <span>
            <a style={{ marginRight: 16 }} onClick={() => { getThis('1', record) }}>绑定京东商品</a>
            {/* <a style={{ marginRight: 16 }}>删除</a> */}
            <a onClick={() => { getThis('2', record) }}>绑定淘宝商品</a>
          </span>
        ),
      },

    ];

    let data = record.skus;
    data.map(res => {
      res.key = res.id
      res.unit = record.unit.name;
      return res
    })
    return <Table columns={columns} dataSource={data} pagination={false} key={data.id} />;
  };
  useEffect(() => {


  }, []);

  const columns = [
    {
      title: '统一编码',
      dataIndex: 'code',
      render: (text) => <a>{text}</a>,
    },
    {
      title: '品牌',
      dataIndex: 'brand',
      render: (text) => <span>{text.name}</span>,

    },
    {
      title: '品类',
      dataIndex: 'category',
      render: (text) => <span>{text.name}</span>,

    },
    {
      title: '操作',
      render: (text, record) => (
        <span>
          <a style={{ marginRight: 16 }} onClick={() => { handleModalVisible(true); sendMsg(record, record.id); }}>修改</a>
          {/* <a style={{ marginRight: 16 }}>删除</a> */}
          <a onClick={() => { delConfirm(record.id); }}>删除</a>
        </span>
      ),
    },
  ];

  return (
    <div >
      <div id="components-table-demo-bordered">
        {tableList && tableList.length > 0 ?
          <Table
            columns={columns}
            dataSource={tableList}
            bordered
            defaultExpandAllRows={true}
            expandable={{
              expandedRowRender
            }}
            pagination={{
              showSizeChanger: false,//设置每页显示数据条数
              showQuickJumper: false,
              pageSize: total.per_page,
              showTotal: () => `共${total.total}条`,
              total: total.total,  //数据的总的条数
              defaultCurrent: 1,
              onChange: (current) => { getData(current); }, //点击当前页码
            }}
            title={() => '商品列表'}
            footer={() => 'Footer'}
          >
          </Table> : ''}
        <Modela
          onSubmit={async value => {
            const success = await handleAdd(value);
            if (success) {
              handleModalVisible(false);
              props.actionRef.current(1);
            }
          }}
          nowMsg={names}
          onCancel={() => { handleModalVisible(false); changeName() }}
          modalVisible={createModalVisible}
          type={'2'}
        />
        <Modelb
          onSubmit={async value => {
            // const success = await handleAdd(value);
            // if (success) {
            // handleModalVisible(false);
            // props.actionRef.current();
            // }
          }}
          skuId={skuId}
          nowId={nowId}
          nowMsg={nowMsg}
          onCancel={() => { handleModalVisibleb(false); changeName() }}
          modalVisible={createModalVisibleb}
        />

      </div>
    </div>
  );
}

export default TableBordered
