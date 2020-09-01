import React, { useState, useEffect } from 'react';
import { Form, Input, Modal, Select, Row, Col, Button,  InputNumber , message,DatePicker } from 'antd';
const { Option } = Select

import { payOrder } from '../../api'

const FormItem = Form.Item;
const Model = props => {
    const [form] = Form.useForm();
    const { modalVisible, onSubmit: handleAdd, onCancel, onCheckAllChange, onChanges } = props;


    useEffect(() => {
    }, [])
    const okHandle = async () => {
        const fieldsValue = await form.validateFields();
        console.log(fieldsValue)
        let data = {}
        data.payType = fieldsValue.payType;
        data.comment = fieldsValue.comment;
        data.commentReal = fieldsValue.commentReal;
        data.paidPrice = fieldsValue.paidPrice*100;
        data.payTime=Math.floor(fieldsValue.payTime._d.getTime() / 1000);
        data.id = props.nowMsg.id;
        payOrder({ method: 'POST', data: data }).then(res => {
            if (res.code == '200') {
                message.success('请求成功')
                onCancel()
            }
            handleAdd(res.code)
        })
    };

    return (
        <Modal
            destroyOnClose
            title="付款"
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
                            label="支付方式: "
                            name="payType"
                            rules={[
                                {
                                    required: true,
                                    message: '请选择支付方式',
                                },
                            ]}
                        >
                            <Select
                                style={{
                                    width: 200,
                                }}
                                placeholder='请选择'
                            >
                                <Option value='2' >支付宝</Option>
                                <Option value='3' >现金</Option>
                                <Option value='4' >银行卡</Option>
                                <Option value='5' >微信</Option>

                            </Select>
                        </FormItem>
                    </Col>
                    <Col lg={10} md={10} sm={24}>
                        <FormItem
                            label="单据:"
                            name="comment"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入单据',
                                },
                            ]}
                        >
                            <Input placeholder="请输入单据"
                                style={{
                                    width: 200,
                                }}
                            />
                        </FormItem>
                    </Col>
                    <Col lg={10} md={10} sm={24}>
                        <FormItem
                            label="收款日期:"
                            name="payTime"
                            rules={[
                                {
                                    required: true,
                                    message: '请选择日期',
                                },
                            ]}
                        >
                             <DatePicker />
                        </FormItem>
                    </Col>
                    <Col lg={10} md={10} sm={24}>
                        <FormItem
                            label="备注:"
                            name="commentReal"
                        >
                            <Input placeholder="请输入备注"
                                style={{
                                    width: 200,
                                }}
                            />
                        </FormItem>
                    </Col>
                    <Col lg={10} md={10} sm={24}>
                        <FormItem
                            label="实收金额:"
                            name="paidPrice"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入实收金额',
                                },
                            ]}
                        >
                            <InputNumber step={0.01} placeholder="请输入实收金额"
                                style={{
                                    width: 200,
                                }}
                            />
                        </FormItem>
                    </Col>

                </Row>
            </Form>
        </Modal>
    );
};

export default Model;
