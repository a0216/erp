import React, { useState, useEffect } from 'react';
import { Form, Input, Modal, Select, Row, Col, Button, Typography, notification, message, InputNumber } from 'antd';
const { Option } = Select
import { upLog } from '../../api'


const FormItem = Form.Item;
const Modelc = props => {
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
        data.payType = fieldsValue.payType;
        data.credential = fieldsValue.credential;
        data.comment = fieldsValue.comment;
        data.lid = props.nowId;
        upLog(data).then(res => {
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

export default Modelc;
