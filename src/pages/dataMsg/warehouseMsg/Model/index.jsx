import React from 'react';
import { Form, Input, Modal, Select, Row, Col, Button, message } from 'antd';
import request from '@/utils/request';
import { addWares, changeWare } from '../../api'


const FormItem = Form.Item;
const Model = props => {
    const [form] = Form.useForm();
    let title = "新建仓库属性"
    if (props.type == '2') {
        title = "修改仓库属性"
        form.setFieldsValue({
            'name': props.thisMsg.name
        })
    } else {
        title = "新建仓库属性"
    }
    const { modalVisible, onSubmit: handleAdd, onCancel } = props;
    const okHandle = async () => {
        const fieldsValue = await form.validateFields();
        if (props.type == '1') {
            addWares({ method: "POST", data: { name: fieldsValue.name, comment: fieldsValue.comment } }).then(res => {
                if (res.code == '200') {
                    message.success("新建成功");
                    onCancel();
                    handleAdd(res.code);
                } else {
                    message.error("失败");
                    onCancel();
                }
            })
        } else {
            changeWare({ method: "POST", data: { name: fieldsValue.name, comment: fieldsValue.comment, id: props.thisMsg.id } }).then(res => {
                if (res.code == '200') {
                    message.success("修改成功");
                    onCancel();
                    handleAdd(res.code);
                } else {
                    message.error("失败");
                    onCancel();
                }
            })
        }
        // form.resetFields();
    };
    return (
        <Modal
            destroyOnClose
            title={title}
            visible={modalVisible}
            onOk={okHandle}
            onCancel={() => onCancel()}
        >
            <Form form={form}>
                <Row>
                    <Col lg={12} md={12} sm={24}>
                        <FormItem
                            label="仓库属性:"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入仓库属性',
                                },
                            ]}
                        >
                            <Input placeholder="请输入仓库属性"
                                style={{
                                    width: 200,
                                }}
                            />
                        </FormItem>
                    </Col>
                    <Col lg={12} md={12} sm={24}>
                        <FormItem
                            label="备注:"
                            name="comment"

                        >
                            <Input placeholder="请输入备注"
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
