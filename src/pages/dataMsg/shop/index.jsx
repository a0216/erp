import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useState, useEffect } from 'react';
import { Spin, DatePicker, Input, Row, Col, Divider, Select, Button } from 'antd';
import styles from './index.less';
import TableBordered from '../shop/TableBordered';
const { Option } = Select
import { storeList } from '../api'
const style = {
};
export default () => {
  const [store, changeStore] = useState([])
  const [loading, setLoading] = useState(true);

  const getData = () => {
    storeList({ method: 'GET' }).then(res => {
      if (res.code == '200') {
        changeStore(res.data)
      }
    })
  }
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
    getData()
  }, []);
  return (
    <PageHeaderWrapper content="" className={styles.main}>

      <TableBordered
        store={store}
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

function handleChange(value) {
  console.log(`selected ${value}`);
}
