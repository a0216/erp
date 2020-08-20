import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useState, useEffect, useRef } from 'react';
import { Spin, DatePicker, Input, Row, Col, Divider, Select, Button } from 'antd';
import styles from './index.less';
import TableBordered from '../warehousing/TableBordered';
const { RangePicker } = DatePicker;
import Model from './Model'
import { payment } from '../api'

const { Option } = Select

export default () => {
  const [loading, setLoading] = useState(true);
  const [paymentList, changepayment] = useState([]);
  const [createModalVisible, handleModalVisible] = useState(false);
  const handleAdd = (value) => {
    if (value == '200') {
      return true
    } else {
      return false
    }
  }

  const getData = () => {
    payment({ method: 'get' }).then(res => {
      console.log(res)
      if (res.code == '200') {
        changepayment(res.data.data)
      }
    })
  }
  const actionRef = useRef(getData);


  useEffect(() => {
    getData()
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);
  return (
    <PageHeaderWrapper content="" className={styles.main}>
      <Row gutter={16} style={{ marginBottom: 20 }}>
        <Col className="gutter-row" span={5}>
          <div >
            申请日期：
            <RangePicker
              style={{
                width: 180,
              }}
            />
          </div>
        </Col>
        <Col className="gutter-row" span={5}>
          <div >
            采购单号：
            <Input
              placeholder="请输入采购单号"
              style={{
                width: 180,
              }}
            />
          </div>
        </Col>
        <Col className="gutter-row" span={5}>
          <div >
            供应商：
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
          <div >
            单据类型：
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
          <div >
            <Button type="primary" shape="">
              搜索
            </Button>
          </div>
        </Col>
      </Row>
      <Row gutter={16} style={{ marginBottom: 20 }}>
        <Col className="gutter-row" span={5}>
          <div >
            仓库名称：
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
          <div  >
            制单人：
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
          <div  >
            商品编码：
            <Input
              placeholder="请输入商品编码"
              style={{
                width: 160,
              }}
            />
          </div>
        </Col>
        <Col className="gutter-row" span={5}>
          <div  >
            商品名称：
            <Input
              placeholder="请输入商品名称"
              style={{
                width: 160,
              }}
            />
          </div>
        </Col>
        <Col className="gutter-row" span={4}>
          <div  >
            <Button type="primary" shape="">
              重置
            </Button>
          </div>
        </Col>
      </Row>
      <Row gutter={16} style={{ marginBottom: 20 }}>
        <Col className="gutter-row" span={5}>
          <div  >
            审核日期：
            <RangePicker
              style={{
                width: 180,
              }}
            />
          </div>
        </Col>
        <Col className="gutter-row" span={5}>
          <div  >
            审核人：
            <Select
              placeholder="请选择"
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
      </Row>
      <Row gutter={0} style={{ marginBottom: 20 }}>
        <Col className="gutter-row" span={3}>
          <div  >
            <Button type="primary" shape="" onClick={() => { handleModalVisible(true) }}>
              人工入库
            </Button>
          </div>
        </Col>
        <Col className="gutter-row" span={15}>
        </Col>
        <Col className="gutter-row" span={3}>
          <div  >
            <Button type="primary" shape="">
              导出本页
            </Button>
          </div>
        </Col>

        <Col className="gutter-row" span={3}>
          <div  >
            <Button type="primary" shape="">
              导出全部
            </Button>
          </div>
        </Col>
      </Row>
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
      <TableBordered
        paymentList={paymentList}
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
