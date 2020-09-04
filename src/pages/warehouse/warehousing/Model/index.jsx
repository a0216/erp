import React, { useState, useEffect } from 'react';
import { Form, Input, Modal, Select, Row, Col, Button, Typography, InputNumber, message } from 'antd';
import Table from './Table'
import Models from './Model'
import { shopList ,wareSelects} from '../../../allNeed'
const { Option } = Select
import { productList,toPayment } from '../../api'

const FormItem = Form.Item;
const Model = props => {
    const [form] = Form.useForm();
    const { modalVisible, onSubmit: handleAdd, onCancel, onCheckAllChange, onChanges } = props;
    // cancelButtonProps={{ disabled: true }}
    const [product, changeList] = useState([]);
    const [sendList, toSend] = useState([]);
    const [onSelect, changeSelect] = useState([]);
    const [shopLists, changeshopList] = useState([]);
    const [createModalVisible, handleModalVisible] = useState(false);
    const [nowLists, changenowLists] = useState([])
    const [wareList, changeWareList] = useState([])

   const getWare=()=> wareSelects({ method: "get" }).then(res => {
        if (res.code == '200') {
          res.data.map(item => {
            item.key = item.id;
            return item;
          })
          changeWareList(res.data)
         
        }
      })

    const getData = () => {
        productList({ method: 'get' }).then(res => {
            if (res.code == '200') {
                changeList(res.data)
            }
        })
    }
    const handleAdds = (e) => {
        changenowLists(e)
    }
    useEffect(() => {
        shopList({ method: 'GET' }).then(res => {
            if (res.code == '200') {
                res.data.map(item => {
                    item.key = item.id;
                })
                changeshopList(res.data)
            }
        })
        getWare()
        // getData();

    }, [])
    const okHandle = async () => {
        const fieldsValue = await form.validateFields();
        // form.resetFields();
        // let skuList = [];
        let data = {}
        data.fare = fieldsValue.freight*100;
        data.shopId = fieldsValue.send;
        sendList.map(res=>{
            res.all=res.all*100;
            res.reduce=res.reduce*100;
            return res;
        })
        data.skuList = sendList;
        toPayment({ method: 'POST', data: data }).then(res => {
            if(res.code=='200'){
                message.success('请求成功')
                onCancel()
            }
            handleAdd(res.code);
        })
        product.map(res => {
            onSelect.map(item => {
                if (res.id == item) {
                    skuList.push({ id: res.id, num: res.number })
                    return skuList
                }
            })
        })
        handleAdd(fieldsValue);
    };

    return (
        <Modal
            destroyOnClose
            title="入库"
            visible={modalVisible}
            onOk={okHandle}
            onCancel={onCancel}
            width={1000}
        >
            <Form form={form}>
                <Row>
                    <Col lg={10} md={10} sm={24}>
                        <FormItem
                            label="供应商: "
                            name="send"
                            rules={[
                                {
                                    required: true,
                                    message: '请选择供应商',
                                },
                            ]}
                        >
                            <Select
                                style={{
                                    width: 200,
                                }}
                                placeholder='请选择'
                            >
                                {shopLists.map(res => {
                                    return <Option value={res.id} key={res.id}>{res.name}</Option>
                                })}

                            </Select>
                        </FormItem>
                    </Col>
                    <Col lg={10} md={10} sm={24}>
                        <FormItem
                            label="运费:"
                            name="freight"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入运费',
                                },
                            ]}
                        >
                                <InputNumber 
                                defaultValue={0}
                                // formatter={value => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g,)}
                                min={0} step={0.01}
                                style={{
                                    width: 200,
                                }}
                            />
                            {/* <Input placeholder="请输入运费"
                                style={{
                                    width: 200,
                                }}
                            /> */}
                        </FormItem>
                    </Col>
                    <Col lg={24} md={24} sm={24}>
                        <Button type="primary" shape="" onClick={() => handleModalVisible(true)}>
                            新增商品
                        </Button>
                        <Models
                            onSubmit={async value => {
                                const success = await handleAdds(value);
                                if (success) {
                                    handleModalVisible(false);

                                    if (actionRef.current) {
                                        actionRef.current.reload();
                                    }
                                }
                            }}
                            handleAdds={handleAdds}
                            product={product}
                            changeList={changeList}
                            onCancel={() => handleModalVisible(false)}
                            modalVisible={createModalVisible}
                        />
                    </Col>
                </Row>

            </Form>
            <Table
                productList={nowLists}
                changeList={changenowLists}
                toSend={toSend}
                onSelect={onSelect}
                changeSelect={changeSelect}
                wareList={wareList}
            />
        </Modal>
    );
};

export default Model;
