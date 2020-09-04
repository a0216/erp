import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useState, useEffect, useRef } from 'react';
import { Spin, DatePicker, message, Row, Col, Form, Select, Button } from 'antd';
import styles from './index.less';
import TableBordered from '../staffs/TableBordered';
import Model from '../staffs/Model'
import { getUser, getList,searchUser } from '../api';

const { Option } = Select

const style = {

};
export default () => {
const FormItem = Form.Item;

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [createModalVisible, handleModalVisible] = useState(false);
  const [userList, changeUser] = useState([])
  const [departList, changeList] = useState([])

  const handleAdd = (e) => {
    if (e == '200') {
      return true;
    } else {
      return false
    }
  }
  const handleChange = (e) => {
  }
  const search=async()=>{
    const fieldsValue = await form.validateFields();
    let url=`/user/search?`
    if(fieldsValue.deaprt){
      if(url.indexOf('status')!=-1){
        url+=`&departmentId=${fieldsValue.deaprt}`  	
      }else{
        url+=`departmentId=${fieldsValue.deaprt}`  	
      }
    }
    if(fieldsValue.status){
      if(url.indexOf('departmentId')!=-1){
        url+=`&status=${fieldsValue.status}`  	
      }else{
        url+=`status=${fieldsValue.status}`  	
      }
    }
    searchUser(url,{method:'GET'}).then(res=>{
      if(res.code=='200'){
        changeUser(res.data.data)
      }
    })
    // searchUser
  }
  const getData = () => {
 
    getList({ method: "GET" },'').then(res => {
      if (res.code == '200') {
        changeList(res.data.data)
      }
    })
  }
  const reast=e=>{
    message.loading('已重置',1)
    form.resetFields(); 
    getData()
  }
  const actionRef = useRef(getData);
  useEffect(() => {
    getData()
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);
  return (
    <PageHeaderWrapper content="" className={styles.main}>
      <Form form={form}>
        <Row gutter={16}>
          <Col className="gutter-row" span={8}>
            <FormItem
              label="部门"
              name="deaprt"
            >
              <Select
                style={{
                  width: 180,
                }}
                defaultValue='全部'
                onChange={handleChange}
                showSearch
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                {departList.map(res => {
                  return <Option value={res.id} key={res.id}>{res.name}</Option>
                })}
              </Select>
            </FormItem>
          </Col>
          <Col className="gutter-row" span={8}>
            <FormItem
              label="账号状态"
              name="status"
            >
              <Select
                style={{
                  width: 180,
                }}
                defaultValue='请选择'
                showSearch
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                <Option value='1' >正常</Option>
                <Option value='0' >冻结</Option>
              </Select>
            </FormItem>
          </Col>
          <Col className="gutter-row" span={4}>
           
           </Col>
          <Col className="gutter-row" span={4}>
            <div style={style}>
              <Button type="primary" shape="" onClick={search}>
                搜索
            </Button>
            </div>
          </Col>
        </Row>
        <Row gutter={0}>
          <Col className="gutter-row" span={3}>
            <div style={style}>
              <Button type="primary" shape="" onClick={() => handleModalVisible(true)}>
                新增员工
            </Button>
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
          </Col>
          <Col className="gutter-row" span={18}>
          </Col>
          <Col className="gutter-row" span={3}>
            <div style={style}>
              <Button type="primary" shape="" onClick={reast}>
                重置
            </Button>
            </div>
          </Col>
        </Row>
        <TableBordered
          userList={userList}
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

