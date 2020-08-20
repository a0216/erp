import React, { useState, useEffect } from 'react';
import { Form, Input, Modal, Select, Row, Col, Button, Typography, notification, message } from 'antd';
import Table from './Table'
import Models from './Model'
import { shopList, wareSelects } from '../../../allNeed'
const { Option } = Select
import { productList, sendPay, upApply } from '../../api'


const FormItem = Form.Item;
const Model = props => {
    console.log(props)
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
    const [upList, changeUplist] = useState([])
  
    const getData = () => {
        productList({ method: 'get' }).then(res => {
            if (res.code == '200') {
                changeList(res.data.map(item=>{
                    item.key=item.id;
                    return item;
                }))
            }
        })
    }
    const handleAdds = (e) => {
        changenowLists(e)
    }
    useEffect(() => {
        if (props.type == '2') {
            if (props.nowMsg.shop) {
                form.setFieldsValue({
                    'freight': props.nowMsg.fare,
                    'send': props.nowMsg.shop.id,

                })
            }
            if (props.nowMsg.transfer) {
                props.nowMsg.transfer.map(res => {
                    res.key = res.id;
                    return res
                })
                changeUplist(props.nowMsg.transfer)
            }

        }
        shopList({ method: 'GET' }).then(res => {
            if (res.code == '200') {
                res.data.map(item => {
                    item.key = item.id;
                    return item;
                })
                changeshopList(res.data)
            }
        })
        // getWare()
        getData();

    }, [props.nowMsg])
    const okHandle = async () => {
        const fieldsValue = await form.validateFields();
        console.log(sendList)
        console.log(fieldsValue)
        let data = {}
        data.fare = fieldsValue.freight;
        data.shopId = fieldsValue.send;
        data.skuList = sendList;
        // upApply
        if (props.type == '2') {
            data.id = props.nowMsg.id;
            upApply({ method: 'POST', data: data }).then(res => {
                if (res.code == '200') {
                    message.success('请求成功')
                    onCancel()
                }
                handleAdd(res.code);
                form.resetFields();

            })
        } else {
            sendPay({ method: 'POST', data: data }).then(res => {
                if (res.code == '200') {
                    message.success('请求成功')
                    onCancel()
                }
                handleAdd(res.code);
                form.resetFields();

            })
        }

    };

    return (
        <Modal
            destroyOnClose
            title="采购"
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
                            <Input placeholder="请输入运费"
                                style={{
                                    width: 200,
                                }}
                            />
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
                // wareList={wareList}
                type={props.type}
                upList={upList}
                wareList={props.wareList}

            />
        </Modal>
    );
};

export default Model;
