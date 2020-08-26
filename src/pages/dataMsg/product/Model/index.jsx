import React, { useState, useEffect } from 'react';
import { Form, Input, Modal, Select, Row, Col, Button, message } from 'antd';
import { shopMsgList, shopAdd, shopChange } from '../../api';
import EditableTable from './Table'
import { addProduct, goodsUp } from '../../api'
import { getProductMsg } from '../../../allNeed'

const Modela = props => {
    const FormItem = Form.Item;
    const [shopList, changeShopList] = useState([])
    const [unit, getUnit] = useState([])
    const [category, getcategory] = useState([])
    const [brand, getbrand] = useState([])
    const [addList, changeList] = useState([])
    var list=[]
    const [form] = Form.useForm();
    let title = "新增商品"
    const { modalVisible, onSubmit: handleAdd, onCancel } = props;

    if (props.type == '2') {
        title = "修改商品"
        if (props.nowMsg) {
            form.setFieldsValue({
                'code': props.nowMsg.code,
                'unit_id': props.nowMsg.unit.id,
                'brand_id': props.nowMsg.brand.id,
                'category_id': props.nowMsg.category.id,
            })
            list=props.nowMsg.skus.map(res=>{
                res.key=res.id;
                return res;
            });
        }
    } else {
        title = "新增商品"
    }
    const getList = (e) => {
        shopMsgList({ method: "get" }).then(res => {
            if (res.code == '200') {
                let data = res.data.map(item => {
                    item.key = item.id;
                    return item
                })
                changeShopList(data)
            }
        })
    }
    const getMsg = (e) => {
        getProductMsg(e, { method: 'GET' }).then(res => {
            if (res.code == '200') {
                res.data.map(item => {
                    item.key = item.id;
                    return item
                })
                if (e == 'unit') {
                    getUnit(res.data)
                } else if (e == 'category') {
                    getcategory(res.data)
                } else {
                    getbrand(res.data)
                }
            }
        })
    }
    useEffect(() => {
        getList()
        getMsg("unit")
        getMsg("category")
        getMsg("brand")
    }, []);
 
    const [sendList, pushList] = useState(list)

    const okHandle = async () => {
        const fieldsValue = await form.validateFields();
        let data = {}
        data.code = fieldsValue.code;
        data.unit_id = fieldsValue.unit_id;
        data.brand_id = fieldsValue.brand_id;
        data.category_id = fieldsValue.category_id;
        data.comment = fieldsValue.comment;
        addList.map(res=>{
            res.cost_price=res.cost_price*100;
            res.get_price=res.get_price*100;
            res.sale_price=res.sale_price*100;
            return res;
        })
        data.skuList = addList;
        if (props.type == '1') {
            addProduct({ method: 'POST', data: data }).then(res => {
                if (res.code == '200') {
                    onCancel()
                    handleAdd(res.code)
                }
            })
        } else {
            data.id = props.nowMsg.id;
            goodsUp({ method: 'POST', data: data }).then(res => {
                if (res.code == '200') {
                    onCancel()
                    handleAdd(res.code)
                }
            })

        }
        // form.resetFields();
        pushList([])
    };
    return (
        <Modal
            destroyOnClose
            title={title}
            visible={modalVisible}
            onOk={okHandle}
            onCancel={() => onCancel()}
            width={1000}
        >
            <Form form={form}>
                <Row>
                    <Col lg={12} md={12} sm={24}>
                        <FormItem
                            label="统一编码:"
                            name="code"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入统一编码',
                                },
                            ]}
                        >
                            <Input placeholder="请输入统一编码"
                                style={{
                                    width: 200,
                                }}
                            />
                        </FormItem>
                    </Col>
                    <Col lg={12} md={12} sm={24}>
                        <FormItem
                            label="计量单位: "
                            name="unit_id"

                        >
                            <Select
                                style={{
                                    width: 180,
                                }}
                                placeholder="请选择"

                            >
                                {unit.map(res => {
                                    return <Option value={res.id} key={res.id}>{res.name}</Option>
                                })}

                            </Select>
                        </FormItem>
                    </Col>
                    <Col lg={12} md={12} sm={24}>
                        <FormItem
                            label="品牌: "
                            name="brand_id"
                        >
                            <Select
                                style={{
                                    width: 180,
                                }}
                                placeholder="请选择"
                            >
                                {brand.map(res => {
                                    return <Option value={res.id} key={res.key}>{res.name}</Option>
                                })}

                            </Select>
                        </FormItem>
                    </Col>
                    <Col lg={12} md={12} sm={24}>
                        <FormItem
                            label="品类: "
                            name="category_id"

                        >
                            <Select
                                style={{
                                    width: 180,
                                }}
                                placeholder="请选择"
                            >
                                {category.map(res => {
                                    return <Option value={res.id} key={res.key}>{res.name}</Option>
                                })}
                            </Select>
                        </FormItem>
                    </Col>
                    <Col lg={24} md={24} sm={24}>
                        <FormItem
                            label="备注:"
                            name="comment"
                        >
                            <Input placeholder="请输入备注"
                                style={{
                                    width: 800,
                                }}
                            />
                        </FormItem>
                    </Col>
                    <Col lg={24} md={24} sm={24}>
                        <EditableTable
                            addList={addList}
                            changeList={changeList}
                            type={props.type}
                            sendList={list}

                        />
                    </Col>
                </Row>
            </Form>
            {/* <Table /> */}
        </Modal>
    );
};

export default Modela;
