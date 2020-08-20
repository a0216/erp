import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useState, useEffect, useRef } from 'react';
import { Spin, Input, Row, Col, Menu, Select, Button } from 'antd';
import styles from './index.less';
import TableBordered from '../productMsg/TableBordered';
import { getProductMsg } from '../api'

const { Option } = Select
const style = {
};
import { AppstoreOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;

export default () => {
  const [nowList, getList] = useState([])
  const [loading, setLoading] = useState(true);
  const [nowName, changeName] = useState('brand');
  const getData = (e) => {
    getProductMsg(e, { method: 'GET' }).then(res => {
      if (res.code == '200') {
        let data = res.data.map(item => {
          item.key = item.id;
          return item
        })
        // if(e=='brand'){
        //   localStorage.setItem("brand",JSON.stringify(data))
        // }else if(e=='category'){
        //   localStorage.setItem("category",JSON.stringify(data))
        // }else{
        //   localStorage.setItem("unit",JSON.stringify(data))
        // }
        getList(data)
      }
    })
  }
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
    getData('brand')
  }, []);

  const actionRef = useRef(getData);
  const handleClick = (e) => {
    if (e.key == '1') {
      changeName('brand')
      getData('brand')
    } else if (e.key == '2') {
      changeName('category')
      getData('category')
    } else {
      changeName('unit')
      getData('unit')
    }

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
            <Menu.Item key="1">品牌</Menu.Item>
            <Menu.Item key="2">品类</Menu.Item>
            <Menu.Item key="3">计量单位</Menu.Item>
          </Menu>
        </Col>
        <Col className="gutter-row" span={18}>
          <TableBordered
            nowName={nowName}
            getData={getData}
            nowList={nowList}
          />
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

