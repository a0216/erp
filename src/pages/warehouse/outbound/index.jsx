import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useState, useEffect ,useRef} from 'react';
import { Spin, DatePicker, Input, Row, Col, Divider, Select, Button } from 'antd';
import styles from './index.less';
import TableBordered from '../outbound/TableBordered';
import Model from './Model'
import {outWareList} from '../api'

const { RangePicker } = DatePicker;
const {Option} =Select
const style = {
};
export default () => {
  const [loading, setLoading] = useState(true);
  const [createModalVisible, handleModalVisible] = useState(false);
  const [outWare, changeoutWare] = useState(false);
 const handleAdd=(e)=>{
   if(e=='200'){
     return true
   }else{
    return false

   }
 }
 const actionRef=useRef(getData)
 const getData=()=>{
  outWareList({method:'GET'}).then(res=>{
    console.log(res)
    if(res.code=='200'){
      changeoutWare(res.data)
    }
  })
 }
  useEffect(() => {
    getData()
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);
  return (
    <PageHeaderWrapper content="" className={styles.main}>
      <Row gutter={16}>
        <Col className="gutter-row" span={5}>
          <div style={style}>
            {' '}
            申请日期：
            <RangePicker
              style={{
                width: 180,
              }}
            />
          </div>
        </Col>
        <Col className="gutter-row" span={5}>
          <div style={style}>
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
          <div style={style}>
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
          <div style={style}>
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
          <div style={style}>
            <Button type="primary" shape="">
              搜索
            </Button>
          </div>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col className="gutter-row" span={5}>
          <div style={style}>
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
          <div style={style}>
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
          <div style={style}>
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
          <div style={style}>
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
          <div style={style}>
            <Button type="primary" shape="">
              重置
            </Button>
          </div>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col className="gutter-row" span={5}>
          <div style={style}>
            审核日期：
            <RangePicker
              style={{
                width: 180,
              }}
            />
          </div>
        </Col>
        <Col className="gutter-row" span={5}>
          <div style={style}>
            审核人：
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
       
      
        
      </Row>
      <Row gutter={0}>
        <Col className="gutter-row" span={3}>
          <div style={style}>
            <Button type="primary" shape=""  onClick={() => handleModalVisible(true)}>
              人工出库
            </Button>
          </div>
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
            />
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
      outWare={outWare}
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
