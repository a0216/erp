import React, { useState, useEffect } from 'react';
import { Form, Input, Modal, Select, Row, Col, Button, Typography, notification, message, InputNumber } from 'antd';
import { shopList, wareSelects } from '../../../allNeed'
const { Option } = Select
import { paySub, upApply } from '../../api'


const FormItem = Form.Item;
const Modelb = props => {
    const [form] = Form.useForm();
    const { modalVisible, onSubmit: handleAdd, onCancel, onCheckAllChange, onChanges } = props;
    // cancelButtonProps={{ disabled: true }}
    const [sendList, toSend] = useState([]);
    const [shopLists, changeshopList] = useState([]);
    const [createModalVisible, handleModalVisible] = useState(false);
    const [nowLists, changenowLists] = useState([])

    const okHandle = async () => {
        const fieldsValue = await form.validateFields();
        let data = {}
        data.money = fieldsValue.money * 100;
        data.payType = fieldsValue.payType;
        data.credential = fieldsValue.credential;
        data.comment = fieldsValue.comment;
        data.sid = props.nowMsg.id;
        paySub(data).then(res => {
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
            title="余额扣款"
            visible={modalVisible}
            onOk={okHandle}
            onCancel={onCancel}
            width={1000}
        >
            <Form form={form}>
                <Row>
                    <Col lg={10} md={10} sm={24}>
                        <FormItem
                            label="扣款方式: "
                            name="payType"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入扣款方式',
                                },
                            ]}
                        >
                            <Input
                                style={{
                                    width: 200,
                                }}
                                placeholder='请输入扣款方式'
                            />
                        </FormItem>
                    </Col>
                    <Col lg={10} md={10} sm={24}>
                        <FormItem
                            label="扣款金额:"
                            name="money"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入扣款金额',
                                },
                            ]}
                        >
                            <InputNumber
                                min={0} step={0.01}
                                style={{
                                    width: 200,
                                }}
                            />
                        </FormItem>
                    </Col>
                    <Col lg={10} md={10} sm={24}>
                        <FormItem
                            label="扣款凭据: "
                            name="credential"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入扣款凭据',
                                },
                            ]}
                        >
                            <Input
                                style={{
                                    width: 200,
                                }}
                                placeholder='请输入扣款凭据'
                            />
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

export default Modelb;
