import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useState, useEffect, useRef } from 'react';
import { Spin, message, Input, Row, Col, Form, Select, Button } from 'antd';
import styles from './index.less';
import TableBordered from '../supplier/TableBordered';
import Modela from './Model'
import { shopList, shopMsgList,downLoadShop } from '../api'
const { Option } = Select

const style = {
};
export default () => {
  const FormItem = Form.Item;
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(true);
  const [createModalVisible, handleModalVisible] = useState(false);
  const [shopLists, changeShopList] = useState([]);
  const [shopLista, changeShopLists] = useState([]);
  const handleAdd = (e) => {
    if (e == '200') {
      return true;
    } else {
      return false;
    }
  }
  const reast=e=>{
    message.loading('已重置',1)
    form.resetFields(); 
    getData()
  }
  const exportAll=()=>{
    downLoadShop().then(res=>{
      message.loading('正在下载。。。',2.5)
    })
  }
  const search = async () => {
    const fieldsValue = await form.validateFields();
    let url = '?'
    function test(s) {
      return s.charAt(s.length - 1) === '?';
    }
    if (fieldsValue.code) {
      if (test) {
        url += `code=${fieldsValue.code}`
      } else {
        url += `&code=${fieldsValue.code}`
      }
    }
    if (fieldsValue.name) {
      if (test) {
        url += `name=${fieldsValue.name}`
      } else {
        url += `&name=${fieldsValue.name}`
      }
    }
    if (fieldsValue.shopType) {
      if (test) {
        url += `property=${fieldsValue.shopType}`
      } else {
        url += `&property=${fieldsValue.shopType}`
      }
    }

    shopList({ method: "GET" }, url).then(res => {
      if (res.code == '200') {
        changeShopList(res.data)
      }
    })

  }
  const getData = () => {
    shopMsgList({ method: "get" }).then(res => {
      if (res.code == '200') {
        let data = res.data.map(item => {
          item.key = item.id;
          return item
        })
        changeShopLists(data)
      }
    })
    shopList({ method: "GET" }, '').then(res => {
      if (res.code == '200') {
        // localStorage.setItem('shopList',JSON.stringify(res.data))
        changeShopList(res.data)
      }
    })
  }
  const actionRef = useRef(getData);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
    getData()
  }, []);
  return (
    <PageHeaderWrapper content="" className={styles.main}>
      <Form form={form}>

        <Row gutter={16}>
          <Col className="gutter-row" span={5}>
            <FormItem
              label=" 商家编码： "
              name="code"
            >
              <Input
                placeholder="请输入商家编码"
                style={{
                  width: 180,
                }}
              />
            </FormItem>
          </Col>
          <Col className="gutter-row" span={5}>
            <FormItem
              label=" 商家名称： "
              name="name"
            >
              <Input
                placeholder="请输入商家名称"
                style={{
                  width: 180,
                }}
              />
            </FormItem>
          </Col>
          <Col className="gutter-row" span={5}>
            <FormItem
              label="商家类型："
              name="shopType"
            >
              <Select
                style={{
                  width: 180,
                }}
                placeholder="请选择"
                showSearch
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                {shopLista.map(res => {
                  return <Option value={res.id} key={res.key}>{res.item}</Option>
                })}

              </Select>
            </FormItem>
          </Col>
          <Col className="gutter-row" span={5}>

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
              <Button type="primary" shape="" onClick={() => handleModalVisible(true)}>
                新增商家
            </Button>
            </div>
          </Col>
          <Col className="gutter-row" span={15}></Col>
          <Col className="gutter-row" span={3}>
            {/* <div style={style}>
              <Button type="primary" shape="">
                导出本页
            </Button>
            </div> */}
          </Col>

          <Col className="gutter-row" span={3}>
            <div style={style}>
              <Button type="primary" shape="" onClick={exportAll}>
                导出全部
            </Button>
            </div>
          </Col>
        </Row>
        <TableBordered
          shopList={shopLists}
          actionRef={actionRef}
        />
        <div
          style={{
            textAlign: 'center',
          }}
        >
          <Spin spinning={loading} size="large" />
        </div>
        <Modela
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
      </Form>
    </PageHeaderWrapper>
  );
};
