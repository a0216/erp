import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useState, useEffect, useRef } from 'react';
import { Spin, DatePicker, Input, Row, Col, Form, Select, Button, message } from 'antd';
import styles from './index.less';
import TableBordered from '../warehousing/TableBordered';
const { RangePicker } = DatePicker;
import Model from './Model'
import { payment, searchUser, listApplyUser, downLoads } from '../api'
import { shopList, wareSelects } from '../../allNeed'


const { Option } = Select
const FormItem = Form.Item;

export default () => {
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(true);
  const [paymentList, changepayment] = useState([]);
  const [createModalVisible, handleModalVisible] = useState(false);
  const [shopLists, changeshopList] = useState([]);
  const [wareList, changetWare] = useState([]);
  const [userList, setuserList] = useState([]);
  const [total, setTotal] = useState({});
  const [users, setuserS] = useState([]);
  const [page, changePage] = useState(1);

  const handleAdd = (value) => {
    if (value == '200') {
      return true
    } else {
      return false
    }
  }

  const getData = (url) => {
    payment({ method: 'get' }, url).then(res => {
      if (res.code == '200') {
        setTotal(res.data)
        changepayment(res.data.data.map(item => {
          item.key = item.id;
          return item;
        }))
      }
    })
  }
  const getDatas = () => {
    payment('?page=1').then(res => {
      if (res.code == '200') {
        changepayment(res.data.data.map(item => {
          item.key = item.id;
          return item;
        }))
      }
    })
  }
  const exports = async () => {
    const fieldsValue = await form.validateFields();
    let url = '?';
    function test(s) {
      return s.charAt(s.length - 1) === '?';
    }
    if (fieldsValue.auditTime) {
      let startTime = Math.floor(fieldsValue.auditTime[0]._d.getTime() / 1000);
      let endTime = Math.floor(fieldsValue.auditTime[1]._d.getTime() / 1000);
      if (fieldsValue.auditTime[0]) {
        if (test(url)) {
          url += `auditStartTime=${startTime}`
        } else {
          url += `&auditEndTime=${startTime}`
        }
      }
      if (fieldsValue.auditTime[1]) {
        if (test(url)) {
          url += `endTime=${endTime}`
        } else {
          url += `&endTime=${endTime}`
        }
      }
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
      if (test(url)) {
        url += `userId=${fieldsValue.userId}`
      } else {
        url += `&userId=${fieldsValue.userId}`
      }
    }
    if (fieldsValue.warehouseId) {
      if (test(url)) {
        url += `warehouseId=${fieldsValue.warehouseId}`
      } else {
        url += `&warehouseId=${fieldsValue.warehouseId}`
      }
    }
    if (fieldsValue.skuCode) {
      if (test(url)) {
        url += `skuCode=${fieldsValue.skuCode}`
      } else {
        url += `&skuCode=${fieldsValue.skuCode}`
      }
    }
    if (fieldsValue.skuName) {
      if (test(url)) {
        url += `skuName=${fieldsValue.skuName}`
      } else {
        url += `&skuName=${fieldsValue.skuName}`
      }
    }
    if (fieldsValue.auditId) {
      if (test(url)) {
        url += `auditId=${fieldsValue.auditId}`
      } else {
        url += `&auditId=${fieldsValue.auditId}`
      }
    }
    downLoads(url).then(res => {
      message.loading('正在下载中···', 2.5)
    })

  }
  const exportAll = () => {
    let url = '?all=1';
    downLoads(url).then(res => {
      message.loading('正在下载中···', 2.5)
    })
  }
  const search = async () => {
    const fieldsValue = await form.validateFields();
    let url = `?page=${page}`;
    function test(s) {
      return s.charAt(s.length - 1) === '?';
    }
    if (fieldsValue.auditTime) {
      let startTime = Math.floor(fieldsValue.auditTime[0]._d.getTime() / 1000);
      let endTime = Math.floor(fieldsValue.auditTime[1]._d.getTime() / 1000);
      if (fieldsValue.auditTime[0]) {
        if (test(url)) {
          url += `auditStartTime=${startTime}`
        } else {
          url += `&auditEndTime=${startTime}`
        }
      }
      if (fieldsValue.auditTime[1]) {
        if (test(url)) {
          url += `endTime=${endTime}`
        } else {
          url += `&endTime=${endTime}`
        }
      }
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
      if (test(url)) {
        url += `userId=${fieldsValue.userId}`
      } else {
        url += `&userId=${fieldsValue.userId}`
      }
    }
    if (fieldsValue.warehouseId) {
      if (test(url)) {
        url += `warehouseId=${fieldsValue.warehouseId}`
      } else {
        url += `&warehouseId=${fieldsValue.warehouseId}`
      }
    }
    if (fieldsValue.skuCode) {
      if (test(url)) {
        url += `skuCode=${fieldsValue.skuCode}`
      } else {
        url += `&skuCode=${fieldsValue.skuCode}`
      }
    }
    if (fieldsValue.skuName) {
      if (test(url)) {
        url += `skuName=${fieldsValue.skuName}`
      } else {
        url += `&skuName=${fieldsValue.skuName}`
      }
    }
    if (fieldsValue.auditId) {
      if (test(url)) {
        url += `auditId=${fieldsValue.auditId}`
      } else {
        url += `&auditId=${fieldsValue.auditId}`
      }
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

  const reast = e => {
    message.loading('已重置', 1)
    form.resetFields();
    getData('?page=1')
  }
  const actionRef = useRef(getDatas);
  useEffect(() => {
    searchUser().then(res => {
      if (res.code == '200') {
        setuserList(res.data.map(item => {
          item.key = item.id;
          return item;
        }))
      }
    })
    listApplyUser().then(res => {
      if (res.code == '200') {
        setuserS(res.data.map(item => {
          item.key = item.id;
          return item;
        }))
      }
    })

    shopList({ method: 'GET' }).then(res => {
      if (res.code == '200') {
        res.data.map(item => {
          item.key = item.id;
          return item;
        })
        changeshopList(res.data)
      }
    })
    wareSelects({ method: 'GET' }).then(res => {
      if (res.code == '200') {
        res.data.map(item => {
          item.key = item.id;
          return item;
        })
        changetWare(res.data)
      }
    })
    getData('?page=1')
    setTimeout(() => {
      setLoading(false);
    }, 500);
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
                showSearch
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
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
              showSearch
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
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
                showSearch
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
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
            <Button type="primary" shape="" onClick={reast}>
              重置
            </Button>
          </Col>
        </Row>
        <Row gutter={16} style={{ marginBottom: 20 }}>
          <Col className="gutter-row" span={5}>
            <FormItem
              label="审核日期："
              name="auditTime"
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
              label="审核人："
              name="auditId"
            >
              <Select
                placeholder="请选择"
                style={{
                  width: 180,
                }}
                showSearch
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                {users.map(res => {
                  return <Option value={res.id}>{res.name}</Option>
                })}
              </Select>
            </FormItem>
          </Col>
        </Row>
        <Row gutter={0} style={{ marginBottom: 20 }}>
          <Col className="gutter-row" span={3}>
            <div  >
              <Button type="primary" shape="" onClick={() => { handleModalVisible(true) }}>
                人工入库
            </Button>
            </div>
          </Col>
          <Col className="gutter-row" span={15}>
          </Col>
          <Col className="gutter-row" span={3}>
            <div  >
              <Button type="primary" shape="" onClick={exports}>
                导出本页
            </Button>
            </div>
          </Col>

          <Col className="gutter-row" span={3}>
            <div  >
              <Button type="primary" shape="" onClick={exportAll}>
                导出全部
            </Button>
            </div>
          </Col>
        </Row>
        <Model
          onSubmit={async value => {
            const success = await handleAdd(value);
            if (success) {
              handleModalVisible(false);
              actionRef.current();
            }
          }}
          onCancel={() => handleModalVisible(false)}
          modalVisible={createModalVisible}
          type={'1'}
        />
        <TableBordered
          paymentList={paymentList}
          total={total}
          changePage={changePage}
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

