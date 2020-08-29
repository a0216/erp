import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { createStore } from 'redux';

import React, { useState, useEffect, useRef } from 'react';
import { Spin, Input, Row, Col, Menu, Select, Button } from 'antd';
import styles from './index.less';
import TableBordered from '../warehouseMsg/TableBordered';
import Model from './Model'
import {wareDeList} from '../api'
const { Option } = Select
const style = {
};
import { AppstoreOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;

export default () => {
  const [loading, setLoading] = useState(true);
  const [createModalVisible, handleModalVisible] = useState(false);
  const [Lists, changeList] = useState([]);
  const getData = (e) => {
    wareDeList({method:"GET"}).then(res=>{
      if(res.code=='200'){
        changeList(res.data)
        // localStorage.setItem("wareMsg",JSON.stringify(res.data))
      }
    })
  }
  // const store = createStore(getData);
  const actionRef = useRef(getData);
  const handleAdd=(e)=>{
    if(e=='200'){
      return true
    }else{
      return false
    }
  }
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
    getData()
  }, []);
 
  return (
    <PageHeaderWrapper content="" className={styles.main}>
      <Row gutter={16} >
        <Col className="gutter-row" span={6}>
          <Button type="primary" shape="" onClick={()=>handleModalVisible(true)}>
            新增属性
            </Button>
        </Col>
      </Row>
          <TableBordered
          Lists={Lists} 
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
    </PageHeaderWrapper>
  );
};

