import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useState, useEffect, useRef } from 'react';
import { Spin, DatePicker, Input, Row, Col, Form, Select, Button, message } from 'antd';
import styles from './index.less';
import TableBordered from '../warehouse/TableBordered';
import { getwareList, wareDeList,downLoada } from '../api'
import Model from './Model'

const { Option } = Select
const style = {
};
export default () => {
  const [form] = Form.useForm();
  const FormItem = Form.Item;
  const [loading, setLoading] = useState(true);
  const [wareList, changeList] = useState([]);
  const [wareType, changewareType] = useState([]);
  const [createModalVisible, handleModalVisible] = useState(false);
  const getData = (e) => {
    // console.log(e)
    getwareList({ method: 'get' }, '').then(res => {
      if (res.code == '200') {
        changeList(res.data)
      }
    })
    wareDeList({ method: 'get' }, '').then(res => {
      if (res.code == '200') {
        changewareType(res.data.map(item=>{
          item.key=item.id;
          return item;
        }))
      }
    })
    
  }
   const reast=e=>{
    message.loading('已重置',1)
    form.resetFields(); 
    getData()
  }
const exportThis=async()=>{
  const fieldsValue = await form.validateFields();
  let url = ''
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
  if (fieldsValue.property) {
    if (test) {
      url += `property=${fieldsValue.property}`
    } else {
      url += `&property=${fieldsValue.property}`
    }
  }
  if (fieldsValue.status) {
    if (test) {
      url += `status=${fieldsValue.status}`
    } else {
      url += `&status=${fieldsValue.status}`
    }
  }
  downLoada(url).then(res => {
      message.loading('导出成功',2.5)
  })
  
}
const exportAll=()=>{
  downLoada('').then(res => {
      message.loading('导出成功',2.5)
  })
}
  // exports
const search=async()=>{
  const fieldsValue = await form.validateFields();
  let url = ''
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
  if (fieldsValue.property) {
    if (test) {
      url += `property=${fieldsValue.property}`
    } else {
      url += `&property=${fieldsValue.property}`
    }
  }
  if (fieldsValue.status) {
    if (test) {
      url += `status=${fieldsValue.status}`
    } else {
      url += `&status=${fieldsValue.status}`
    }
  }
  getwareList({ method: 'get' }, url).then(res => {
    if (res.code == '200') {
      changeList(res.data)
    }
  })
  
}
  const actionRef = useRef(getData);

  const handleAdd = (e) => {
    if (e == '200') {
      return true;
    } else {
      return false;
    }
  }
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
    getData()
  }, []);
  return (
    <PageHeaderWrapper content="" className={styles.main}>
      <Form form={form}>
        <Row gutter={16}>
          <Col className="gutter-row" span={5}>
            <FormItem
              label="仓库编码："
              name="code"
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
              name="name"
            >
            <Input
                placeholder="请输入仓库名称"
                style={{
                  width: 180,
                }}
              />
            </FormItem>
          </Col>
          <Col className="gutter-row" span={5}>
            <FormItem
              label="仓库类型："
              name="property"
            >
              <Select
                placeholder="请选择"
                style={{
                  width: 180,
                }}
              >
                {wareType.map(res=>{
                return <Option value={res.id} key={res.id}>{res.name}</Option>
                })}
               
              </Select>
            </FormItem>

          </Col>
          <Col className="gutter-row" span={5}>
            <FormItem
              label="仓库状态："
              name="status"
            >
              <Select
                placeholder="请选择"
                style={{
                  width: 180,
                }}
              >
                <Option value="1">正常</Option>
                <Option value="0">冻结</Option>
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
              <Button type="primary" shape="" onClick={() => handleModalVisible(true)}>
                新增仓库
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
              <Button type="primary" shape="" onClick={exportAll}>
                导出全部
            </Button>
            </div>
          </Col>
        </Row>
        <TableBordered
          wareList={wareList}
          actionRef={actionRef}
        />
        <div
          style={{
            paddingTop: 100,
            textAlign: 'center',
          }}
        >
          <Spin spinning={loading} size="large" />
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
        </div>
      </Form>
    </PageHeaderWrapper>
  );
};

