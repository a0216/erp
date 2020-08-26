import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useState, useEffect, useRef } from 'react';
import { Spin, message , Input, Row, Col, Form, Select, Button } from 'antd';
import styles from './index.less';
import TableBordered from '../stock/TableBordered';
import Model from './Model/index'
import { getWareList, downLoada } from '../api'

const { Option } = Select
const style = {
};
const FormItem = Form.Item;

export default () => {
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(true);
  const [createModalVisible, handleModalVisible] = useState(false);
  const [wareList, setwareList] = useState([]);
  const handleAdd = (value) => {
    if (value == '200') {
      return true
    } else {
      return false
    }
  }
  const exportThis= async()=>{
    const fieldsValue = await form.validateFields();
    let url = '?'
    function test(s) {
      return s.charAt(s.length - 1) === '?';
    }
    if (fieldsValue.goodsCode) {
      if (test(url)) {
        url += `goodsCode=${fieldsValue.goodsCode}`
      } else {
        url += `&goodsCode=${fieldsValue.goodsCode}`
      }
    }
    if (fieldsValue.goodsName) {
      if (test(url)) {
        url += `goodsName=${fieldsValue.goodsName}`
      } else {
        url += `&goodsName=${fieldsValue.goodsName}`
      }
    }
    if (fieldsValue.warehouseCode) {
      if (test(url)) {
        url += `warehouseCode=${fieldsValue.warehouseCode}`
      } else {
        url += `&warehouseCode=${fieldsValue.warehouseCode}`
      }
    }
    if (fieldsValue.warehouseName) {
      if (test(url)) {
        url += `warehouseName=${fieldsValue.warehouseName}`
      } else {
        url += `&warehouseName=${fieldsValue.warehouseName}`
      }
    }
    downLoada(url).then(res => {
      message.loading('正在下载。。。',2.5)
    })
  }
  const exportAll =()=>{
    downLoada('').then(res => {
      message.loading('正在下载。。。',2.5)
    })
  }
  const reast=e=>{
    message.loading('已重置',1)
    form.resetFields(); 
    getData()
  }
  const search= async()=>{
    const fieldsValue = await form.validateFields();
    let url = '?'
    function test(s) {
      return s.charAt(s.length - 1) === '?';
    }
    if (fieldsValue.goodsCode) {
      if (test(url)) {
        url += `goodsCode=${fieldsValue.goodsCode}`
      } else {
        url += `&goodsCode=${fieldsValue.goodsCode}`
      }
    }
    if (fieldsValue.goodsName) {
      if (test(url)) {
        url += `goodsName=${fieldsValue.goodsName}`
      } else {
        url += `&goodsName=${fieldsValue.goodsName}`
      }
    }
    if (fieldsValue.warehouseCode) {
      if (test(url)) {
        url += `warehouseCode=${fieldsValue.warehouseCode}`
      } else {
        url += `&warehouseCode=${fieldsValue.warehouseCode}`
      }
    }
    if (fieldsValue.warehouseName) {
      if (test(url)) {
        url += `warehouseName=${fieldsValue.warehouseName}`
      } else {
        url += `&warehouseName=${fieldsValue.warehouseName}`
      }
    }
    getWareList({ method: 'GET' },url).then(res => {
      if (res.code == '200') {
        setwareList(res.data)
      }
    })

  }
  const getData = () => {
    getWareList({ method: 'GET' },'').then(res => {
      if (res.code == '200') {
        setwareList(res.data.map(item=>{
          item.key=item.id;
          return item;
        }))
      }
    })
  }
  const actionRef = useRef(getData)
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
    getData()
  }, []);
  return (
    <PageHeaderWrapper content="" className={styles.main}>
      <Form form={form}>
        <Row gutter={16}>
          <Col className="gutter-row" span={5}>
            <FormItem
              label="商品编码： "
              name="goodsCode"
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
              label=" 商品名称： "
              name="goodsName"
            >
            <Input
                placeholder="请输入商品名称"
                style={{
                  width: 180,
                }}
              />
            </FormItem>
          </Col>
          <Col className="gutter-row" span={5}>
          <FormItem
              label="仓库编码："
              name="warehouseCode"
            >
            
           <Input
                placeholder="请输入仓库编码"
                style={{
                  width: 180,
                }}
              />
            </FormItem>
          </Col>
          <Col className="gutter-row" span={5}>
            <FormItem
              label="仓库名称："
              name="warehouseName"
            >
            <Input
                placeholder="请输入仓库名称"
                style={{
                  width: 180,
                }}
              />
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
          <Col className="gutter-row" span={20}></Col>
          <Col className="gutter-row" span={4}>
            <Button type="primary" shape="" onClick={reast}>
              重置
            </Button>
          </Col>
        </Row>
        <Row gutter={0}>
          <Col className="gutter-row" span={3}>
            <div style={style}>
              <Button type="primary" shape="" onClick={() => { handleModalVisible(true) }}>
                仓库调拨
            </Button>
            </div>
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
          </Col>
          <Col className="gutter-row" span={15}></Col>
          <Col className="gutter-row" span={3}>
            <div style={style}>
              <Button type="primary" shape="" onClick={exportThis}>
                导出本页
            </Button>
            </div>
          </Col>

          <Col className="gutter-row" span={3}>
            <div style={style}>
              <Button type="primary" shape=""  onClick={exportAll}>
                导出全部
            </Button>
            </div>
          </Col>
        </Row>
        {wareList.map(res => {
          return <TableBordered
            showMsg={res}
          />

        })}
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

