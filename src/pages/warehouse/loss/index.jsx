import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useState, useEffect } from 'react';
import { Spin, DatePicker, Input, Row, Col, Divider, Select, Button } from 'antd';
import styles from './index.less';
import TableBordered from '../loss/TableBordered';
const { RangePicker } = DatePicker;
const { Option } = Select
const style = {
};
export default () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);
  return (
    <PageHeaderWrapper content="" className={styles.main}>
      <Row gutter={16}>
        <Col className="gutter-row" span={5}>
          <div style={style}>
            {' '}
            报损日期：
            <RangePicker
              style={{
                width: 180,
              }}
            />
          </div>
        </Col>
        <Col className="gutter-row" span={5}>
          <div style={style}>
            仓库名称：
            <Input
              placeholder="请输入采购单号"
              style={{
                width: 180,
              }}
            />
          </div>
        </Col>
        <Col className="gutter-row" span={5}>
          <div style={style}>
            商品编码：
            <Select
              defaultValue="lucy"
              style={{
                width: 180,
              }}
              onChange={handleChange}
            >
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="Yiminghe">yiminghe</Option>
            </Select>
          </div>
        </Col>
        <Col className="gutter-row" span={5}>
          <div style={style}>
            商品名称：
            <Select
              defaultValue="lucy"
              style={{
                width: 180,
              }}
              onChange={handleChange}
            >
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="Yiminghe">yiminghe</Option>
            </Select>
          </div>
        </Col>
        <Col className="gutter-row" span={4}>
          <div style={style}>
            <Button type="primary" shape="">
              搜索
            </Button>
          </div>
        </Col>
      </Row>
      <Row gutter={16}>


        <Col className="gutter-row" span={20}></Col>
        <Col className="gutter-row" span={4}>
          <div style={style}>
            <Button type="primary" shape="">
              重置
            </Button>
          </div>
        </Col>
      </Row>
      <Row gutter={0}>
        <Col className="gutter-row" span={3}>
          <div style={style}>
            <Button type="primary" shape="">
              报损
            </Button>
          </div>
        </Col>
        <Col className="gutter-row" span={15}></Col>
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
      <TableBordered />
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
}
