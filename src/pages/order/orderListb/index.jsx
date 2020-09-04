import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useState, useEffect ,useRef} from 'react';
import { Spin, DatePicker, Input, Row, Col, Form, Select, Button ,message} from 'antd';
import styles from './index.less';
import TableBordered from '../orderListb/TableBordered';
import { orderList, searchOrder, payType ,downLoadOrder} from '../api'
const { RangePicker } = DatePicker;
const { Option } = Select
const style = {
};
export default () => {
  const FormItem = Form.Item;
  const [form] = Form.useForm();


  const [loading, setLoading] = useState(true);
  const [list, changeList] = useState([]);
  const [payTypes, changepayType] = useState([]);
  // orderList
  const getData = () => {
    orderList({ method: 'get' }).then(res => {
      if (res.code == '200') {
        changeList(res.data.map(item=>{
          item.key=item.id;
          return item;
        }))
      }
    })
    payType({ method: 'GET' }).then(res => {
      if (res.code == '200') {
        changepayType(res.data.map(item => {
          item.key = item.id;
          return item
        }))
      }
    })
  }
  const reast=e=>{
    message.loading('已重置',1)
    form.resetFields(); 
    getData()
  }
  const exportThis = async (e) => {
    let url = ''
    if(e==1){
     url = '?all=1'
    }
    const fieldsValue = await form.validateFields();
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
    downLoadOrder(url).then(res => {
      message.loading('正在下载', 2.5)
    })
   
  }
  // downLoadOrder
  const actionRef=useRef(getData)
  const search = async () => {
    const fieldsValue = await form.validateFields();
    let url = ''
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
    searchOrder({ method: 'GET' }, url).then(res => {
      if(res.code=='200'){
        changeList(res.data)
      }
    })
  }
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
    getData()
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
              label="订单编号:"
              name="code"
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
              <Button type="primary" shape="" onClick={search}>
                搜索
            </Button>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col className="gutter-row" span={5}>
            <FormItem
              label="订单状态："
              name="status"
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
                <Option value="0">未开始</Option>
                <Option value="1">进行中</Option>
                <Option value="2">已结束</Option>
                <Option value="3">退货中</Option>
                <Option value="4">退货完成</Option>
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
          <Col className="gutter-row" span={5}>
            <FormItem
              label="付款方式:"
              name="payType"
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
                {payTypes.map(res => {
                  return <Option value={res.id}>{res.name}</Option>
                })}

              </Select>
            </FormItem>
          </Col>
          <Col className="gutter-row" span={5}>

          </Col>
          <Col className="gutter-row" span={4}>
              <Button type="primary" shape="" onClick={reast}>
                重置
            </Button>
          </Col>
        </Row>

        <Row gutter={0}>
          <Col className="gutter-row" span={18}>
          </Col>
          <Col className="gutter-row" span={3}>
            <div style={style}>
              <Button type="primary" shape="" onClick={()=>exportThis(0)}>
                导出本页
            </Button>
            </div>
          </Col>

          <Col className="gutter-row" span={3}>
            <div style={style}>
              <Button type="primary" shape="" onClick={()=>exportThis(1)}>
                导出全部
            </Button>
            </div>
          </Col>
        </Row>
        <TableBordered
          list={list}
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

