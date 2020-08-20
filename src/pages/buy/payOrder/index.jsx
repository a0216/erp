import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useState, useEffect, useRef } from 'react';

import { Spin, DatePicker, Input, Row, Col, message, Select, Button, Tabs, Form } from 'antd';

import styles from './index.less';
import TableBordered from '../payOrder/TableBordered';
import { shopList, wareSelects } from '../../allNeed'

import { payment, searchUser } from '../api'
import { wareSelect } from '@/pages/warehouse/api';

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
  const [types, changeType] = useState(' ');
  const [wareList, changetWare] = useState([]);
  const [paymentList, changepayment] = useState([]);
  const [userList, setuserList] = useState([]);
  const [sendUrl, changeUrl] = useState([])

  const getData = (types) => {
    payment({ method: 'get' }, `?put=${types}`).then(res => {
      if (res.code == '200') {
        changepayment(res.data.data.map(item => {
          item.key = item.id;
          return item;
        }))
      }
    })
  }
  const actionRef = useRef(getData);
  const search = async (types) => {
    const fieldsValue = await form.validateFields();
    let url = `?pay=${types}`;
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
    changeUrl(url);
    payment({ method: 'get' }, url).then(res => {
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
    // changeUrl(url);
  }
  useEffect(() => {
    searchUser().then(res => {
      if (res.code == '200') {
        setuserList(res.data.map(item => {
          item.key = item.id;
          return item;
        }))
      }

    })
    wareSelects({ method: 'GET' }).then(res => {
      if (res.code == '200') {
        res.data.map(item => {
          item.key = item.id;
        })
        changetWare(res.data)
      }
    })
    shopList({ method: 'GET' }).then(res => {
      if (res.code == '200') {
        res.data.map(item => {
          item.key = item.id;
        })
        changeshopList(res.data)
      }
    })
    getData('0')
    setTimeout(() => {
      setLoading(false);
    }, 1500);
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
            <div style={style}>
              <Button type="primary" shape="" onClick={search}>
                搜索
            </Button>
            </div>
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
              <Button type="primary" shape="">
                重置
            </Button>
            </div>
          </Col>
        </Row>
        <Row gutter={0}>
          <Col className="gutter-row" span={3}>
            <div style={style}>


            </div>
          </Col>
          <Col className="gutter-row" span={9}></Col>
          <Col className="gutter-row" span={3}>
            <div style={style}>
              <Button type="primary" shape="">
                下载模板
            </Button>
            </div>
          </Col>

          <Col className="gutter-row" span={3}>
            <div style={style}>
              <Button type="primary" shape="">
                导入信息
            </Button>
            </div>
          </Col>

          <Col className="gutter-row" span={3}>
            <div style={style}>
              <Button type="primary" shape="">
                导出本页
            </Button>
            </div>
          </Col>

          <Col className="gutter-row" span={3}>
            <div style={style}>
              <Button type="primary" shape="">
                导出全部
            </Button>
            </div>
          </Col>
        </Row>
        <Tabs defaultActiveKey="0" onChange={callback}>
          <TabPane tab="全部" key="0">

          </TabPane>
          <TabPane tab="未付款" key="1">

          </TabPane>
          <TabPane tab="已付款" key="2">

          </TabPane>
        </Tabs>
        {/* <Space style={{ marginBottom: 16 }}>
          <Button onClick={()=>{changeType(' ');getData('')}}>全部</Button>
          <Button onClick={()=>{changeType('0');getData('0')}}>未付款</Button>
          <Button onClick={()=>{changeType('1');getData('1')}}>已付款</Button>
        </Space> */}
        <TableBordered
          paymentList={paymentList}
          actionRef={actionRef}
        />
        <div
          style={{
            paddingTop: 100,
            textAlign: 'center',
          }}
        >
          <Spin spinning={loading} size="large" />
        </div>
      </Form>
    </PageHeaderWrapper>
  );
};

