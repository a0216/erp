import React, { useState, useEffect } from 'react';
import { Form, Input, Modal, Select, Row, Col, Button, Table, DatePicker, message } from 'antd';
const { Option } = Select

import { orderShip, getWare, listGoods } from '../../../api'
const FormItem = Form.Item;
const Models = props => {
    console.log(props)
    const [form] = Form.useForm();
    const [lists, setlists] = useState([]);
    const [product, changePro] = useState([])
    const [sendList, changeList] = useState([])
    const [wareId, changewareId] = useState()

    const { modalVisible, onSubmit: handleAdd, onCancel, onCheckAllChange, onChanges } = props;


    const changeSelects = (id, val) => {
        let arr = JSON.parse(JSON.stringify(props.product));
        arr.map(res => {
            if (id == res.id) {
                res.skuId = id
                res.warehouseId = val.value
            }
        })
        changeList(arr)
    }
    const columns = [
        {
            title: '商品编码',
            dataIndex: 'code',
        },
        {
            title: '商品名称',
            dataIndex: 'name',
        },
        {
            title: '仓库',
            required: true,
            dataIndex: 'id',
            key: 'id',
            render: (text, record) => {
                return <Select
                    labelInValue
                    placeholder='请选择'
                    onChange={(e) => changeSelects(text, e)}
                    style={{
                        width: '100%',
                    }}
                    showSearch
                    filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    {lists.map(res => {
                        return <Option value={res.id} key={res.id}>{res.name}</Option>
                    })}

                </Select>
            }
        },

    ];
    const okHandle = async () => {
        const fieldsValue = await form.validateFields();
        let data = {}
        let shippingTime = Math.floor(fieldsValue.date._d.getTime() / 1000)
        data.orderId = props.nowMsg.id;
        data.deliveryBillId = fieldsValue.deliveryBillId;
        data.logiCoprName = fieldsValue.logiCoprName;
        data.shippingTime = shippingTime;
        data.warehouse = sendList;
        // data.storeId = props.store;
        orderShip({ method: 'POST', data: data }).then(res => {
            if (res.code == '200') {
                message.success('请求成功')
                onCancel()
            } else {
                message.error(res.message)
            }
            handleAdd(res.code)
        })
    };
    useEffect(() => {
        getWare().then(res => {
            if (res.code == '200') {
                changewareId(res.data[0].id);
                setlists(res.data.map(item => {
                    item.key = item;
                    return item;
                }))
            }
        })
    }, [])
    return (
        <Modal
            destroyOnClose
            title="发货"
            visible={modalVisible}
            onOk={okHandle}
            onCancel={onCancel}
            handleAdd={handleAdd}
            width={1500}
        >
            <Form form={form}>
                <Row>
                    <Col lg={10} md={10} sm={24}>
                        <FormItem
                            label="订单单号: "
                            name="orderSn"
                        >
                            {props.nowMsg ? <Input placeholder={props.nowMsg.code} readOnly
                                style={{
                                    width: 200,
                                }}
                            /> : ''}

                        </FormItem>
                    </Col>
                    <Col lg={10} md={10} sm={24}>
                        <FormItem
                            label="运单号: "
                            name="deliveryBillId"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入运单号',
                                },
                            ]}
                        >
                            <Input placeholder='请输入运单号'
                                style={{
                                    width: 200,
                                }}
                            />
                        </FormItem>
                    </Col>
                    <Col lg={10} md={10} sm={24}>
                        <FormItem
                            label="物流: "
                            name="logiCoprName"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入物流',
                                },
                            ]}
                        >
                            <Input placeholder='请输入'
                                style={{
                                    width: 200,
                                }}
                            />
                        </FormItem>
                    </Col>
                    <Col lg={10} md={10} sm={24}>
                        <FormItem
                            label="请选择时间: "
                            name="date"
                            rules={[
                                {
                                    required: true,
                                    message: '请选择时间',
                                },
                            ]}
                        >
                            <DatePicker />
                        </FormItem>
                    </Col>
                </Row>
            </Form>
            <Table
                defaultExpandAllRows={true}
                columns={columns}
                dataSource={props.product}
                bordered
                title={() => '商品列表'}
            />
        </Modal>
    );
};

export default Models;
