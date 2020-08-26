import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useState, useEffect, useRef } from 'react';
import { Spin, DatePicker, Input, Row, Col, message, Select, Button, Tabs, Form } from 'antd';
import styles from './index.less';
import TableBordered from '../buyOrder/TableBordered';
import { shopList, wareSelects } from '../../allNeed'
import { payment, searchUser, downLoads } from '../api'


import Model from '../buyOrder/Model'

const { RangePicker } = DatePicker;
const { Option } = Select
const style = {
};
const { TabPane } = Tabs;

const handleAdd = async fields => {
  const hide = message.loading('正在添加');
  if (fields == '200') {
    return true
  } else {
    message.error('添加失败请重试！');
    return false
  }
};
const FormItem = Form.Item;
export default () => {

  const [form] = Form.useForm();

  const [loading, setLoading] = useState(true);
  const [createModalVisible, handleModalVisible] = useState(false);
  const [shopLists, changeshopList] = useState([]);
  const [wareList, changetWare] = useState([]);
  const [paymentList, changepayment] = useState([]);
  const [types, changeType] = useState('0');
  const [userList, setuserList] = useState([]);
  const reast = e => {
    message.loading('已重置', 1)
    form.resetFields();
    getData(types)
  }

  const getData = (types) => {
    payment({ method: 'get' }, `?put=${types}`).then((res) => {
      if (res.code == '200') {
        changepayment(res.data.data.map(item => {
          item.key = item.id;
          return item;
        }))
      }
    })
  }

  const callback = (e) => {
    changeType(e)
    search(e)
  }
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
        <span>{record.update == '1' ? <a style={{ marginRight: 16 }} onClick={() => { handleModalVisible(true); changeNowMsgs(record) }}>修改</a> : ''}
          {/* <a style={{ marginRight: 16 }}>删除</a> */}
          <a onClick={() => { delConfirm(record); }}>删除</a>
        </span>
      ),

    },
  ];
  const exportAll = () => {
    let url = '?all=1';

    downLoads(url).then(res => {
      message.loading('正在下载', 2.5)
    })
  }
  const exportThis = async () => {
    const fieldsValue = await form.validateFields();
    let url = `?put=${types}`;
    function test(s) {
      return s.charAt(s.length - 1) === '?';
    }
    if (fieldsValue.times) {
      let startTime = Math.floor(fieldsValue.times[0]._d.getTime() / 1000);
      let endTime = Math.floor(fieldsValue.times[1]._d.getTime() / 1000);
      if (fieldsValue.times[0]) {
        if (test(url)) {
          url += `startTime=${startTime}`
        } else {
          url += `&startTime=${startTime}`
        }
      }
      if (fieldsValue.times[1]) {
        if (test(url)) {
          url += `endTime=${endTime}`
        } else {
          url += `&endTime=${endTime}`
        }
      }
    }
    if (fieldsValue.code) {
      if (test(url)) {
        url += `code=${fieldsValue.code}`
      } else {
        url += `&code=${fieldsValue.code}`
      }
    }
    if (fieldsValue.shopId) {
      if (test(url)) {
        url += `shopId=${fieldsValue.shopId}`
      } else {
        url += `&shopId=${fieldsValue.shopId}`
      }
    }
    if (fieldsValue.userId) {
      url += `&userId=${fieldsValue.userId}`
    }
    if (fieldsValue.warehouseId) {
      url += `&warehouseId=${fieldsValue.warehouseId}`
    }
    if (fieldsValue.skuCode) {
      url += `&skuCode=${fieldsValue.skuCode}`
    }
    if (fieldsValue.skuName) {
      url += `&skuName=${fieldsValue.skuName}`
    }
    downLoads(url).then(res => {
      message.loading('正在下载', 2.5)
    })

  }
  const search = async (types) => {
    const fieldsValue = await form.validateFields();
    let url = `?put=${types}`;
    function test(s) {
      return s.charAt(s.length - 1) === '?';
    }
    if (fieldsValue.times) {
      let startTime = Math.floor(fieldsValue.times[0]._d.getTime() / 1000);
      let endTime = Math.floor(fieldsValue.times[1]._d.getTime() / 1000);
      if (fieldsValue.times[0]) {
        if (test(url)) {
          url += `startTime=${startTime}`
        } else {
          url += `&startTime=${startTime}`
        }
      }
      if (fieldsValue.times[1]) {
        if (test(url)) {
          url += `endTime=${endTime}`
        } else {
          url += `&endTime=${endTime}`
        }
      }
    }

    if (fieldsValue.code) {
      if (test(url)) {
        url += `code=${fieldsValue.code}`
      } else {
        url += `&code=${fieldsValue.code}`
      }
    }
    if (fieldsValue.shopId) {
      if (test(url)) {
        url += `shopId=${fieldsValue.shopId}`
      } else {
        url += `&shopId=${fieldsValue.shopId}`
      }
    }
    if (fieldsValue.userId) {
      url += `&userId=${fieldsValue.userId}`
    }
    if (fieldsValue.warehouseId) {
      url += `&warehouseId=${fieldsValue.warehouseId}`
    }
    if (fieldsValue.skuCode) {
      url += `&skuCode=${fieldsValue.skuCode}`
    }
    if (fieldsValue.skuName) {
      url += `&skuName=${fieldsValue.skuName}`
    }
    payment({ method: 'get' }, url).then(res => {
      if (res.code == '200') {
        changepayment(res.data.data.map(item => {
          item.key = item.id;
          return item;
        }))
      }
    })


  }
  const actionRef = useRef(getData);

  useEffect(() => {
    getData('0')
    let getUser = searchUser()
    getUser.then(res => {
      if (res.code == '200') {
        setuserList(res.data.map(item => {
          item.key = item.id;
          return item;
        }))
      }

    })


    wareSelects({ method: 'GET' }).then(function (res) {
      if (res.code == '200') {
        res.data.map(item => {
          item.key = item.id;
          return item;
        })
        changetWare(res.data)
      }
    })
    shopList({ method: 'GET' }).then((res) => {
      if(res){
        if (res.code == '200') {
          res.data.map(item => {
            item.key = item.id;
            return item;
          })
          changeshopList(res.data)
        }
      }
    })
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  return (
    <PageHeaderWrapper content="" className={styles.main}>
      <Form form={form}>
        <Row gutter={16}>
          <Col className="gutter-row" span={5}>
            <FormItem
              label=" 申请日期："
              name="times"
            >
              <RangePicker
                style={{
                  width: 180,
                }}
              />
            </FormItem>
          </Col>
          <Col className="gutter-row" span={5}>
            <FormItem
              label=" 采购单号："
              name="code"
            >
              <Input
                placeholder="请输入采购单号"
                style={{
                  width: 180,
                }}
              />
            </FormItem>

          </Col>
          <Col className="gutter-row" span={5}>
            <FormItem
              label=" 供应商："
              name="shopId"
            >
              <Select
                placeholder='请选择'
                style={{
                  width: 180,
                }}
              >
                {shopLists.map(res => {
                  return <Option value={res.id} key={res.id}>{res.name}</Option>
                })}
              </Select>
            </FormItem>
          </Col>
          <Col className="gutter-row" span={5}>
            <FormItem
              label=" 制单人："
              name="userId"
            >

              <Select
                placeholder='请选择'
                style={{
                  width: 180,
                }}
              >
                {userList.map(res => {
                  return <Option value={res.id}>{res.name}</Option>
                })}
              </Select>
            </FormItem>
          </Col>
          <Col className="gutter-row" span={4}>
            <Button type="primary" shape="" onClick={search}>
              搜索
            </Button>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col className="gutter-row" span={5}>
            <FormItem
              label=" 接收仓库："
              name="warehouseId"
            >
              <Select
                style={{
                  width: 180,
                }}
                placeholder='请选择'
              >
                {wareList.map(res => {
                  return <Option value={res.id} key={res.id}>{res.name}</Option>
                })}
              </Select>
            </FormItem>
          </Col>
          <Col className="gutter-row" span={5}>
            <FormItem
              label=" 商品编码："
              name="skuCode"
            >

              <Input
                placeholder="请输入商品编码"
                style={{
                  width: 180,
                }}
              />
            </FormItem>
          </Col>
          <Col className="gutter-row" span={5}>
            <FormItem
              label=" 商品名："
              name="skuName"
            >
              <Input
                placeholder="请输入商品名称"
                style={{
                  width: 180,
                }}
              />
            </FormItem>
          </Col>

          <Col className="gutter-row" span={9}>
            <div style={style}>
              <Button type="primary" shape="" onClick={reast}>
                重置
            </Button>
            </div>
          </Col>
        </Row>
        <Row gutter={0}>
          <Col className="gutter-row" span={3}>
            <Button type="primary" shape="" onClick={() => handleModalVisible(true)}>
              采购申请
            </Button>
            <Model
              onSubmit={async value => {
                const success = await handleAdd(value);
                if (success) {
                  handleModalVisible(false);
                  if (actionRef.current) {
                    actionRef.current('0');
                  }
                }
              }}
              onCancel={() => handleModalVisible(false)}
              modalVisible={createModalVisible}
              wareList={wareList}
              type={'1'}
            />
          </Col>
          <Col className="gutter-row" span={9}></Col>
          <Col className="gutter-row" span={3}>
            <Button type="primary" shape="">
              下载模板
            </Button>
          </Col>

          <Col className="gutter-row" span={3}>
            <Button type="primary" shape="">
              导入信息
            </Button>
          </Col>

          <Col className="gutter-row" span={3}>
            <Button type="primary" shape="" onClick={exportThis}
            >
              导出本页
            </Button>
          </Col>

          <Col className="gutter-row" span={3}>
            <div style={style}>
              <Button type="primary" shape="" onClick={exportAll}>
                导出全部
            </Button>
            </div>
          </Col>
        </Row>
        <Tabs defaultActiveKey="0" onChange={callback}>
          <TabPane tab="全部" key="0">
          </TabPane>
          <TabPane tab="未入库" key="1">
          </TabPane>
          <TabPane tab="已入库" key="2">
          </TabPane>
        </Tabs>
        <TableBordered
          paymentList={paymentList}
          actionRef={actionRef}
        />
        <div
          style={{
            textAlign: 'center',
          }}
        >
          <Spin spinning={loading} size="large" />
        </div>
      </Form>
    </PageHeaderWrapper>
  );
};

