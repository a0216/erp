import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useState, useEffect, useRef } from 'react';
import { Spin, DatePicker, Input, Row, Col, message, Select, Button, Form } from 'antd';
import styles from './index.less';
import TableBordered from '../department/TableBordered';
const { RangePicker } = DatePicker;
import Model from '../department/Model'
import { getList, searchDe } from '../api';


const { Option } = Select
const style = {
};
const FormItem = Form.Item;



const handleAdd = async fields => {
  const hide = message.loading('正在添加');
  try {
    if (fields == '200') {
      hide();
      message.success('添加成功');
      return true;
    }

  } catch (error) {
    hide();
    message.error('添加失败请重试！');
    return false;
  }
  console.log(fields)
};
export default () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [createModalVisible, handleModalVisible] = useState(false);
  const [tableList, changeList] = useState([])
  const [changeModel, changeModels] = useState([])
  // departmentId
  const getData = () => {
    getList({ method: "GET" },'').then(res => {
      if(res.code=='200'){
        changeList(res.data.data)
      }
    })
  }
  const search = async () => {
    const fieldsValue = await form.validateFields();
    getList({ method: "GET" },`?departmentId=${fieldsValue.id}`).then(res => {
      if(res.code=='200'){
        changeList(res.data.data)
      }
    })
  }
  const actionRef = useRef(getData);

  useEffect(() => {
    getData();
    setTimeout(() => {
      setLoading(false);
    }, 1000);

  }, []);
  return (
    <PageHeaderWrapper content="" className={styles.main}>
      <Form form={form}>
        <Row gutter={16}>
          <Col className="gutter-row" span={5}>
            <FormItem
              label="部门名称:"
              name="id"
            >
              <Select
                placeholder="请选择"
                style={{
                  width: 180,
                }}
                onChange={handleChange}
              >
                {
                  tableList.map(res => {
                    return <Option value={res.id} key={res.id}>{res.name}</Option>
                  })
                }
              </Select>
            </FormItem>
          </Col>
          <Col className="gutter-row" span={10}>
          </Col>

          <Col className="gutter-row" span={4}>
            <div style={style}>
              <Button type="primary" shape="" onClick={ search}>
                搜索
            </Button>
            </div>
          </Col>
        </Row>
        <Row gutter={0}>
          <Col className="gutter-row" span={3}>
            <div style={style}>
              <Button type="primary" shape="" onClick={() => handleModalVisible(true)}>
                新增部门
            </Button>
              <Model
                onSubmit={async value => {
                  const success = await handleAdd(value);
                  if (success) {
                    handleModalVisible(false);
                    if (actionRef.current) {
                      actionRef.current();
                    }
                  }
                }}
                onCancel={() => handleModalVisible(false)}
                modalVisible={createModalVisible}
                type={'1'}

              />
            </div>
          </Col>
          <Col className="gutter-row" span={15}>
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
        <TableBordered
          tableList={tableList}
          changeModel={changeModel}
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

function handleChange(value) {
  console.log(`selected ${value}`);
}
