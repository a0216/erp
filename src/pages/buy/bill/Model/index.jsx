import React, { useState, useEffect } from 'react';
import { Form, Input, Modal, Select, Row, Col, Button, Typography, DatePicker, message, InputNumber } from 'antd';
import { shopList, wareSelects } from '../../../allNeed'
const { Option } = Select
import { payFor, upApply } from '../../api'


const FormItem = Form.Item;
const Model = props => {
    const [form] = Form.useForm();
    const { modalVisible, onSubmit: handleAdd, onCancel, onCheckAllChange, onChanges } = props;
    // cancelButtonProps={{ disabled: true }}
    const [sendList, toSend] = useState([]);

    useEffect(() => {

    }, [])
    // const iptNum=e=>{
    //     console.log(e)
    // }
    const okHandle = async () => {
        const fieldsValue = await form.validateFields();
        let data = {}
        data.money = fieldsValue.money * 100;
        data.payType = fieldsValue.payType;
        data.credential = fieldsValue.credential;
        data.comment = fieldsValue.comment;
        data.payTime = Math.floor(fieldsValue.pay_time._d.getTime() / 1000);
        data.sid = props.nowMsg.id;
        payFor(data).then(res => {
            if (res.code == '200') {
                message.success('请求成功')
                onCancel()
            }
            handleAdd(res.code);
        })
    };

    return (
        <Modal
            destroyOnClose
            title="账户充值"
            visible={modalVisible}
            onOk={okHandle}
            onCancel={onCancel}
            width={1000}
        >
            <Form form={form}>
                <Row>
                    <Col lg={10} md={10} sm={24}>
                        <FormItem
                            label="付款方式: "
                            name="payType"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入付款方式',
                                },
                            ]}
                        >
                            <Input
                                style={{
                                    width: 200,
                                }}
                                placeholder='请输入付款方式'
                            />


                        </FormItem>
                    </Col>
                    <Col lg={10} md={10} sm={24}>
                        <FormItem
                            label="付款金额:"
                            name="money"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入付款金额',
                                },
                            ]}
                        >
                            <InputNumber
                                // onChange={iptNum}
                                min={0} step={0.01}
                                style={{
                                    width: 200,
                                }}
                            />
                        </FormItem>
                    </Col>
                    <Col lg={10} md={10} sm={24}>
                        <FormItem
                            label="付款凭据: "
                            name="credential"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入付款凭据',
                                },
                            ]}
                        >
                            <Input
                                style={{
                                    width: 200,
                                }}
                                placeholder='请输入付款凭据'
                            />


                        </FormItem>
                    </Col>
                    <Col lg={10} md={10} sm={24}>
                        <FormItem
                            label="付款日期:"
                            name="pay_time"
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
                            label="备注：: "
                            name="comment"
                        >
                            <Input
                                style={{
                                    width: 200,
                                }}
                                placeholder='备注'
                            />
                        </FormItem>
                    </Col>
                </Row>
            </Form>
        </Modal>
    );
};

export default Model;
