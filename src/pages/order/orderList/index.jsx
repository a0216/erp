import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useState, useEffect, useRef } from 'react';
import moment from 'moment';
import { Spin, DatePicker, Input, Row, Col, Form, Select, Button, Tabs, message } from 'antd';
import styles from './index.less';
import TableBordered from '../orderList/TableBordered';
import { orderList, storeList, payType, jdOrder, orderLists, orderState, getVenderCarrier, downLoads,syncState } from '../api'
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
  const [allMsg, changeAll] = useState({})
  const [lists, setlists] = useState([])
  const [page, changePage] = useState(1)
  const [startTime, changeStart] = useState(0)
  const [endTime, changeEndTime] = useState(0)
 
  const reast = e => {
    message.loading('已重置', 1)
    form.resetFields();
    getData(store, 1)
    getState(store)
  }
  // orderList
  const callback = e => {
    changeId(e)
    search(e)
    getState(e)
    getDatab(e)
  }

  const asyncJd = e => {
    changeClick(true)
    changeId(JSON.stringify(e))
    jdOrder(e).then(res => {
      if (res.code == '200') {
        changeClick(false)
        message.success('更新成功')
      } else {
        message.error('请重新授权');

        setTimeout(() => {
          changeClick(false)
        }, 3000)
      }
      getData(e, page)
    })
  }
  const syncStates=(e)=>{
    changeClick(true)
    changeId(JSON.stringify(e))
    let url=`store=${e}&startTime=${startTime}&endTime=${endTime}`
    syncState(url).then(res => {
      if (res.code == '200') {
        changeClick(false)
        message.success('更新成功')
      } else {
        message.error('请重新授权');

        setTimeout(() => {
          changeClick(false)
        }, 3000)
      }
      getData(e, page)
    })
  }
  const getDatab = (store) => {
    getVenderCarrier(store).then(res => {
      if (res.code == '200') {
        setlists(res.data.map(item => {
          item.key = item.id;
          return item
        }))
      }
    })
  }
  const getData = (store, page) => {
    orderLists(`?store=${store}&&page=${page}`).then(res => {
      if (res.code == '200') {
        changeAll(res.data)
        changeList(res.data.data.map(item => {
          item.key = item.id;
          return item;
        }))
      }
    })

  }

  const actionRef = useRef(getData);
  const exports = async (e, store) => {
    let url = `?store=${store}&&page=${page}`
    if (e == '1') {
      url = `?store=${store}&&page=${page}&all=1`
    }
    const fieldsValue = await form.validateFields();
    function test(s) {
      return s.charAt(s.length - 1) === '?';
    }
    if (fieldsValue.date) {
      let startTime = Math.floor(fieldsValue.date[0]._d.getTime() / 1000)*1000;
      let endTime = Math.floor(fieldsValue.date[1]._d.getTime() / 1000)*1000;
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
    if (fieldsValue.state) {
      if (test(url)) {
        url += `state=${fieldsValue.state}`
      } else {
        url += `&state=${fieldsValue.state}`
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
    downLoads(url).then(res => {
      message.loading('正在下载', 2.5)
    })
  }
  const search = async (store) => {
    const fieldsValue = await form.validateFields();
    let url = `?store=${store}&&page=${page}`
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
    if (fieldsValue.state) {
      if (test(url)) {
        url += `state=${fieldsValue.state}`
      } else {
        url += `&state=${fieldsValue.state}`
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
    if (fieldsValue.orderId) {
      if (test(url)) {
        url += `orderId=${fieldsValue.orderId}`
      } else {
        url += `&orderId=${fieldsValue.orderId}`
      }
    }

    orderLists(url).then(res => {
      if (res.code == '200') {
        changeAll(res.data)
        changeList(res.data.data.map(item => {
          item.key = item.id;
          return item;
        }))
      }
    })
  }
  const rangePickerDisabledDate = current => {
    // 不能选今天以后，只能选【今天~往前追溯90天】内，今天可选。
    let result = false;
    if (current) {
      if (current < moment().subtract(1900000, "days") || current > moment().endOf("day")) {
        result = true;
      } else {
        result = false;
      }
    }
    return result;
  };
  const changeTime=(e)=>{
    changeStart(Math.floor(e[0]._d.getTime() / 1000))
    changeEndTime(Math.floor(e[1]._d.getTime() / 1000))
    // console.log(e)
  }
  const getState = (store) => {
    orderState(store).then(res => {
      if (res.code == '200') {
        changeStates(res.data)
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

    storeList().then(res => {
      if (res.code == '200') {
        if (res.data.length > 0) {
          changeId(JSON.stringify(res.data[0].id))
          getData(res.data[0].id, page)
          getState(res.data[0].id)
          getDatab(res.data[0].id)
          changeStores(res.data.map(item => {
            item.key = item.id;
            return item;
          }))
        }

      }
    })
    setTimeout(() => {
      setLoading(false);
    }, 500);
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
            <Button type="primary" shape="" onClick={() => { search(store) }}>
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
                showSearch
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
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
              <Button type="primary" shape="" onClick={() => asyncJd(item.id)} disabled={isClick}>
                同步{item.name}订单
              </Button>
            </Col>
          })}
        </Row>
        <br />
        <Row gutter={0}>
          <Col className="gutter-row" span={5}>
            <FormItem
              label="选择同步日期:"
              name="date"
            >
              <RangePicker
                disabledDate={rangePickerDisabledDate}
                onChange={changeTime}
                style={{
                width: 180,
              }}
              />
            </FormItem>
          </Col>
          {stores.map(item => {
            return <Col className="gutter-row" span={4}>
              <Button type="primary" shape="" onClick={() => syncStates(item.id)} disabled={isClick}>
                同步{item.name}订单状态
              </Button>
            </Col>
          })}
        </Row>
        <Row gutter={0}>
          <Col className="gutter-row" span={18}>
          </Col>
          <Col className="gutter-row" span={3}>
            <div style={style}>
              <Button type="primary" shape="" onClick={() => exports(0, store)}>
                导出本页
            </Button>
            </div>
          </Col>

          <Col className="gutter-row" span={3}>
            <div style={style}>
              <Button type="primary" shape="" onClick={() => exports(1, store)}>
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
          allMsg={allMsg}
          changePage={changePage}
          actionRef={actionRef}
          store={store}
          page={page}
          lists={lists}
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

