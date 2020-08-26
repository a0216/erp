import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useState, useEffect } from 'react';
import { Spin, DatePicker, Input, Row, Col, Form, Select, Button, Tabs, message } from 'antd';
import styles from './index.less';
import TableBordered from '../orderList/TableBordered';
import { orderList, storeList, payType, jdOrder, orderLists, orderState } from '../api'
const { RangePicker } = DatePicker;
const { Option } = Select
const style = {
};
const { TabPane } = Tabs;

export default () => {
  const FormItem = Form.Item;
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [list, changeList] = useState([]);
  const [stores, changeStores] = useState([]);
  const [store, changeId] = useState('');
  const [types, changepayType] = useState([]);
  const [isClick, changeClick] = useState(false);
  const [states, changeStates] = useState([]);
  const reast = e => {
    message.loading('已重置', 1)
    form.resetFields();
    getData(store)
  }
  // orderList
  const callback = e => {
    search(e)
    changeId(JSON.stringify(e))
  }

  const asyncJd = e => {
    changeClick(true)
    changeId(JSON.stringify(e))
    jdOrder(e).then(res => {
      if (res.code == '200') {
        changeClick(false)
        message.success('更新成功')
      }else{
        setTimeout(()=>{
        changeClick(false)
        },3000)
      }
      getData(e)
    })
  }
  const getData = (store) => {
    orderLists(`?store=${store}`).then(res => {
      if (res.code == '200') {
        changeList(res.data.map(item => {
          item.key = item.id;
          return item;
        }))
      }
    })


  }
  const search = async (store) => {
    const fieldsValue = await form.validateFields();
    let url = `?store=${store}`
    function test(s) {
      return s.charAt(s.length - 1) === '?';
    }
    if (fieldsValue.date) {
      let startTime = Math.floor(fieldsValue.date[0]._d.getTime() / 1000);
      let endTime = Math.floor(fieldsValue.date[1]._d.getTime() / 1000);
      if (fieldsValue.date[0]) {
        if (test(url)) {
          url += `startTime=${startTime}`
        } else {
          url += `&startTime=${startTime}`
        }
      }
      if (fieldsValue.date[1]) {
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
    if (fieldsValue.name) {
      if (test(url)) {
        url += `name=${fieldsValue.name}`
      } else {
        url += `&name=${fieldsValue.name}`
      }
    }
    if (fieldsValue.phone) {
      if (test(url)) {
        url += `phone=${fieldsValue.phone}`
      } else {
        url += `&phone=${fieldsValue.phone}`
      }
    }
    if (fieldsValue.status) {
      if (test(url)) {
        url += `status=${fieldsValue.status}`
      } else {
        url += `&status=${fieldsValue.status}`
      }
    }
    if (fieldsValue.payType) {
      if (test(url)) {
        url += `payType=${fieldsValue.payType}`
      } else {
        url += `&payType=${fieldsValue.payType}`
      }
    }
    orderLists(url).then(res => {
      if (res.code == '200') {
        changeList(res.data.map(item => {
          item.key = item.id;
          return item;
        }))
      }
    })
  }
 
  useEffect(() => {
    payType({ method: 'GET' }).then(res => {
      if (res.code == '200') {
        changepayType(res.data.map(item => {
          item.key = item.id;
          return item
        }))
      }
    })
    orderState().then(res => {
      if (res.code == '200') {
        changeStates(res.data)
      }
    })
    storeList().then(res => {
      if (res.code == '200') {
        changeId(JSON.stringify(res.data[0].id) )
        getData(res.data[0].id)
        changeStores(res.data.map(item => {
          item.key = item.id;
          return item;
        }))
      }
    })
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);
  return (
    <PageHeaderWrapper content="" className={styles.main}>
      <Form form={form}>

        <Row>
          <Col className="gutter-row" span={5}>
            <FormItem
              label="下单日期:"
              name="date"
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
              label="订单号:"
              name="orderId"
            >
              <Input
                placeholder="请输入订单编号"
                style={{
                  width: 180,
                }}
              />
            </FormItem>
          </Col>
          <Col className="gutter-row" span={5}>
            <FormItem
              label=" 姓名:"
              name="name"
            >
              <Input
                placeholder="请输入姓名"
                style={{
                  width: 180,
                }}
              />
            </FormItem>
          </Col>
          <Col className="gutter-row" span={5}>
            <FormItem
              label="联系方式:"
              name="phone"
            >
              <Input
                placeholder="请输入联系方式"
                style={{
                  width: 180,
                }}
              />
            </FormItem>
          </Col>
          <Col className="gutter-row" span={4}>
            {/* <Button type="primary" shape="" onClick={search}> */}
            <Button type="primary" shape="" onClick={search}>
              搜索
            </Button>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col className="gutter-row" span={5}>
            <FormItem
              label="订单状态："
              name="state"
            >
              <Select
                placeholder='请选择'
                style={{
                  width: 180,
                }}
              >
                {states.map(res => {
                  return <Option value={res.value}>{res.key}</Option>
                })}

              </Select>
            </FormItem>
          </Col>
          {/* <Col className="gutter-row" span={5}>
          <FormItem
              label=" 付款状态："
              name="pay"
            >
            <Select
                placeholder='请选择'
                style={{
                  width: 180,
                }}
              >
                <Option value="1">已付款</Option>
                <Option value="0">未付款</Option>
              </Select>
            </FormItem>
          </Col> */}
          <Col className="gutter-row" span={15}>

          </Col>

          <Col className="gutter-row" span={4}>
            <Button type="primary" shape="" onClick={reast}>
              重置
            </Button>
          </Col>
        </Row>
        <Row gutter={0}>
          {stores.map(item => {
            return <Col className="gutter-row" span={4}>
              <Button type="primary" shape="" onClick={()=>asyncJd(item.id)} disabled={isClick}>
               同步{item.name}订单
              </Button>
            </Col>
          })}

        </Row>
        <Row gutter={0}>
          <Col className="gutter-row" span={18}>
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
        <Tabs activeKey={store} onChange={callback}>
          {stores.map(item => {
            return <TabPane tab={item.name} key={item.id} ></TabPane>
          })}

        </Tabs>
        <TableBordered
          list={list}
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

