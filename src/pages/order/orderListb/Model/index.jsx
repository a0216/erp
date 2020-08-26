import React, { useState, useEffect } from 'react';
import { Form, Input, Modal, Select, Row, Col, Button, Typography, notification, message } from 'antd';
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

        let data = {}
        data.payType = fieldsValue.payType;
        data.comment = fieldsValue.comment;
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
            title="采购"
            visible={modalVisible}
            onOk={okHandle}
            onCancel={onCancel}
            handleAdd={handleAdd}
            width={1000}
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

                </Row>
            </Form>
        </Modal>
    );
};

export default Model;
