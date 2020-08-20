import { CloseCircleOutlined } from '@ant-design/icons';
import { Button, Card, Col, DatePicker, Form, Input, Popover, Row, Select, message } from 'antd';
import React, { useState, useEffect, useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect, FormattedMessage, formatMessage } from 'umi';

import options from './address';
import { productList, addOrder, saleUser ,payType} from '../api'

import styles from './style.less';
import { Cascader } from 'antd';
import Models from './Model/Model'
import Table from './Model/Table'
import { get } from 'lodash';


const { Option } = Select;
const { RangePicker } = DatePicker;




const AdvancedForm = ({ submitting, dispatch }) => {

  const [createModalVisible, handleModalVisible] = useState(false);
  const [product, changeList] = useState([]);
  const [nowList, sendList] = useState([]);
  const [sendLists, changeSend] = useState([]);
  const [saleUsers, changeUser] = useState([]);
  const [payTypes, changepayType] = useState([]);
  const [allPrice,changePrice]=useState(0)

  const [form] = Form.useForm();
  const [error, setError] = useState([]);
  const getData = () => {
    productList({ method: 'get' }).then(res => {
      if (res.code == '200') {
        changeList(res.data)
      }
    })
    saleUser({ method: 'GET' }).then(res => {
      if (res.code == '200') {
        changeUser(res.data.map(item => {
          item.key = item.id;
          return item
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
    // payType()
  }
  const handleAdds = (e) => {
    console.log(e)
  // const [allPrice,changePrice]=useState(0)
  e.map(res=>{

  })
    sendList(e)
  }
  useEffect(() => {
    getData();
  }, [])


  const onFinish = fieldsValue => {
    console.log(fieldsValue)

    let data = {}
    data.name = fieldsValue.name;
    data.pay_type = fieldsValue.payType;
    data.phone = fieldsValue.phone;
    if (fieldsValue.address[2]) {
      data.address = fieldsValue.address[0] + fieldsValue.address[1] + fieldsValue.address[2];
    } else {
      data.address = fieldsValue.address[0] + fieldsValue.address[1]
    }
    data.full_address = fieldsValue.full_address;
    data.user_id = fieldsValue.user_id;
    data.comment = fieldsValue.comment;
    data.skuList = sendLists;
    data.store_id = '1';
     
    addOrder({ method: 'POST', data: data }).then(res => {
      console.log(res)
      if(res.code=='200'){
        message.success('请求成功')
        location.reload([])   
      }else{
        message.error('请查证后再试')

      }
    })
  };
  const onFinishFailed = errorInfo => {
    setError(errorInfo.errorFields);
  };

  return (
    <div>
      <Form
        form={form}
        layout="horizontal"
        hideRequiredMark
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <PageHeaderWrapper content="">
          <Card title="" className={styles.card} bordered={false}>
            <Row gutter={16}>
              <Col lg={12} md={12} sm={24}>
                <Form.Item
                  label='姓名'
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: '请输入姓名',

                    },
                  ]}
                >
                  <Input placeholder="请输入姓名" />
                </Form.Item>
              </Col>
              <Col lg={12} md={12} sm={24}>
                <Form.Item
                  label='联系方式'
                  name="phone"
                  rules={[
                    {
                      required: true,
                      message: '请输入联系方式',
                    },
                  ]}
                >
                  <Input placeholder="请输入联系方式" />
                </Form.Item>
              </Col>
              <Col lg={12} md={12} sm={24}>
                <Form.Item
                  label='所在地区'
                  name="address"
                  rules={[
                    {
                      required: true,
                      message: '请选择所在地区',
                    },
                  ]}
                >
                  <Cascader options={options} placeholder="请选择地址" />
                </Form.Item>
              </Col>
              <Col lg={12} md={12} sm={24}>
                <Form.Item
                  label='详细地址'
                  name="full_address"
                  rules={[
                    {
                      required: true,
                      message: '请输入详细地址',
                    },
                  ]}
                >
                  <Input placeholder="请输入详细地址" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col lg={12} md={12} sm={24}>
                <Form.Item
                  label='销售经理'
                  name="user_id"
                  rules={[
                    {
                      required: true,
                      message: '请选择销售经理',
                    },
                  ]}
                >
                  <Select placeholder="请选择销售经理">
                    {saleUsers.map(res => {
                      return <Option value={res.id}>{res.name}</Option>

                    })}
                  </Select>
                </Form.Item>
              </Col>
              {/* <Col lg={12} md={12} sm={24}>
                <Form.Item
                  label='销售商家'
                  name="商品商家"
                  rules={[
                    {
                      required: true,
                      message: '请选择商品商家',
                    },
                  ]}
                >
                  <Input placeholder="请输入商品商家" />
                </Form.Item>
              </Col> */}
              <Button type="primary" onClick={() => handleModalVisible(true)}>
                添加商品
            </Button>
            </Row>
          </Card>
          <Models
            onSubmit={async value => {
              const success = await handleAdds(value);
              if (success) {
                handleModalVisible(false);

                if (actionRef.current) {
                  actionRef.current.reload();
                }
              }
            }}
            handleAdds={handleAdds}
            product={product}
            changeList={changeList}
            onCancel={() => handleModalVisible(false)}
            modalVisible={createModalVisible}
          />
          <Table
            productList={nowList}
            sendLists={sendLists}
            changeSend={changeSend}
            allPrice={allPrice}
            changePrice={changePrice}
          >
          </Table>
        </PageHeaderWrapper>
        {/* {getErrorInfo(error)} */}
        <Row gutter={16}>
          <Col lg={2} md={2} sm={12}>
            <h1 style={{ 'font-weight': '600' }}>总计:{allPrice}</h1>
          </Col>
          <Col lg={6} md={6} sm={12}>
            <Form.Item
              label='付款方式'
              name="payType"
              rules={[
                {
                  required: true,
                  message: '请选择付款方式',
                },
              ]}
            >
              <Select placeholder="请选择付款方式">
                {payTypes.map(res=>{
                return  <Option value={res.id}>{res.name}</Option>
                })}
               
              </Select>
            </Form.Item>
          </Col>
          <Col lg={10} md={10} sm={12}>
            <Form.Item
              label='凭据信息'
              name="comment"
              rules={[
                {
                  required: true,
                  message: '请输入凭据信息',
                },
              ]}
            >
              <Input placeholder="请输入凭据信息"

              />
            </Form.Item>
          </Col>

          <Col lg={4} md={4} sm={12}>
            <Button type="primary" onClick={() => form?.submit()} loading={submitting}>
              确认下单
          </Button>

          </Col>
        </Row>
      </Form>
    </div>

  );
};

export default connect(({ loading }) => ({
  submitting: loading.effects['formAndadvancedForm/submitAdvancedForm'],
}))(AdvancedForm);
