import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useState, useEffect } from 'react';
import { Spin, Input, Row, Col, Menu, Select, Button } from 'antd';
import styles from './index.less';
import TableBordered from '../shopMsg/TableBordered';
const { Option } = Select
const style = {
};
import { AppstoreOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;

export default () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);


  }, []);
  function handleClick(e){
    console.log('click ', e);

  } 
 
  return (
    <PageHeaderWrapper content="" className={styles.main}>
      <Row gutter={16}>
        <Col className="gutter-row" span={6}>
          <Menu
            onClick={handleClick}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
          >
              <Menu.Item key="1">Option 5</Menu.Item>
              <Menu.Item key="2">Option 6</Menu.Item>  
              <Menu.Item key="3">Option 5</Menu.Item>
              <Menu.Item key="4">Option 6</Menu.Item>
          </Menu>
        </Col>
        <Col className="gutter-row" span={18}>
          <TableBordered />
        </Col>

      </Row>

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

