import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useState, useEffect, useRef } from 'react';
import { Spin, DatePicker, Input, Row, Col, Form, Select, Button, message } from 'antd';
import styles from './index.less';
import TableBordered from '../product/TableBordered';
import Modela from './Model'
import { getProduct,searchGood,downLoadPro } from '../api'
import { getProductMsg } from '../../allNeed'
const { Option } = Select

const style = {
};

export default () => {
  const [loading, setLoading] = useState(true);
  const [createModalVisible, handleModalVisible] = useState(false);
  const [list, setlist] = useState([]);
  const [categoryList, changecategory] = useState([])
  const [brandList, changebrand] = useState([])
  const [total,addTotal]=useState({})
  const [form] = Form.useForm();
  const FormItem = Form.Item;


  const handleAdd = (e) => {
    if (e == '200') {
      return true
    } else {
      return false
    }
  }
  const getData = (e) => {
    console.log('getData1');
    getProduct(e).then(res => {
      if (res.code == '200') {
        addTotal(res.data)
        setlist(res.data.data.map(res => {
          res.key = res.id;
          return res;
        }))
      }
    })
  }
  const reast=e=>{
    message.loading('已重置',1)
    form.resetFields();
    getData(1)
  }
  const exportThis=async()=>{
    const fieldsValue = await form.validateFields();
    let data=`/goods/search?`
    if(fieldsValue.code){
      data+=`&code=${fieldsValue.code}`
    }
    if(fieldsValue.brandId){
      data+=`&brandId=${fieldsValue.brandId}`
    }
    if(fieldsValue.categoryId){
      data+=`&categoryId=${fieldsValue.categoryId}`
    }
     if(fieldsValue.name){
      data+=`&name=${fieldsValue.name}`
    }
    downLoadPro(data).then(res=>{
     message.loading('下载中。。。',2.5)
    })

  }
  const exportAll=()=>{
    downLoadPro('?all=1').then(res=>{
      message.loading('下载中。。。',2.5)
     })
  }
  const search = async() => {
    const fieldsValue = await form.validateFields();
    let data=`/goods/search?`
    if(fieldsValue.code){
      data+=`&code=${fieldsValue.code}`
    }
    if(fieldsValue.brandId){
      data+=`&brandId=${fieldsValue.brandId}`
    }
    if(fieldsValue.categoryId){
      data+=`&categoryId=${fieldsValue.categoryId}`
    }
     if(fieldsValue.name){
      data+=`&name=${fieldsValue.name}`
    }
    searchGood({method:'GET'},data).then(res=>{
      if(res.code=='200'){
        setlist(res.data.data.map(res => {
          res.key = res.id;
          return res;
        }))
      }
    })

  }
  const actionRef = useRef(getData);
  useEffect(() => {
    getProductMsg('brand', { method: 'get' }).then(res => {
      if (res.code == '200') {
        changebrand(res.data.map(item => {
          item.key = item.id;
          return item
        }))
      }
    })
    getProductMsg('category', { method: 'get' }).then(res => {
      if (res.code == '200') {
        changecategory(res.data.map(item => {
          item.key = item.id;
          return item
        }))
        setLoading(false);
      }
    })
    getData(1)
  }, []);
  return (
    <PageHeaderWrapper content="" className={styles.main}>
      <Form form={form}>
        <Row gutter={16}>
          <Col className="gutter-row" span={5}>
            <FormItem
              label=" 商品编码："
              name="code"
            >
              <Input
                placeholder="请输入商品编码"
                style={{
                  width: 240,
                }}
              />
            </FormItem>
          </Col>
          <Col className="gutter-row" span={5}>
            <FormItem
              label="  商品名称："
              name="name"
            >
              <Input
                placeholder="请输入商品名称"
                style={{
                  width: 240,
                }}
              />
            </FormItem>
          </Col>
          <Col className="gutter-row" span={5}>
            <FormItem
              label="品牌："
              name="brandId"
            >
              <Select
                placeholder="请选择"
                style={{
                  width: 240,
                }}
                showSearch
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                {brandList.map(res => {
                  return <Option value={res.id} key={res.key}>{res.name}</Option>
                })}
              </Select>
            </FormItem>
          </Col>
          <Col className="gutter-row" span={5}>
            <FormItem
              label="品类："
              name="categoryId"
            >
              <Select
                placeholder="请选择"
                style={{
                  width: 240,
                }}
                showSearch
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                {categoryList.map(res => {
                  return <Option value={res.id} key={res.key}>{res.name}</Option>
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
                新增商品
            </Button>
            </div>
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
      </Form>
      <Modela
        onSubmit={async value => {
          const success = await handleAdd(value);
          if (success) {
            handleModalVisible(false);
            actionRef.current(1);
          }
        }}
        onCancel={() => handleModalVisible(false)}
        modalVisible={createModalVisible}
        type={'1'}
      />
      <TableBordered
        list={list}
        actionRef={actionRef}
        total={total}
        getData={getData}
      />
      <div
        style={{
          paddingTop: 100,
          textAlign: 'center',
        }}
      >
        <Spin spinning={loading} size="large" />
      </div>
    </PageHeaderWrapper>
  );
};
