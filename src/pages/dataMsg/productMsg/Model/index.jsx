import React from 'react';
import { Form, Input, Modal, Select, Row, Col, Button, message } from 'antd';
import { addProductMsg, upGoods } from '../../api';

const Model = props => {
    const FormItem = Form.Item;
    const [form] = Form.useForm();

    let title = "新建属性"
    if (props.type == '2') {
        title = "修改属性"
        form.setFieldsValue({
            'name': props.nowMsg.name,
            // 'code':props.nowMsg.comment||''
        })
    } else {
        title = "新建属性"
    }

    const { modalVisible, onSubmit: handleAdd, onCancel } = props;
    const okHandle = async () => {
        const fieldsValue = await form.validateFields();
        // console.log(fieldsValue)
        let formdata = new FormData()
        formdata.append('name', fieldsValue.name);
        formdata.append('comment', fieldsValue.code);
        if (props.type == '1') {
            addProductMsg(props.nowName, { method: "POST", data: formdata }).then(res => {
                if (res.code == '200') {
                    message.success("添加成功");
                    onCancel()
                    handleAdd(res.code)
                }
                // console.log(res)
            })
        } else {
            formdata.append('id', props.nowMsg.id,);
            upGoods(props.nowName, { method: "POST", data: formdata }).then(res => {
                if (res.code == '200') {
                    message.success("修改成功");
                    onCancel()
                    handleAdd(res.code)
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
            width={800}
        >
            <Form form={form}>
                <Row>
                    <Col lg={12} md={12} sm={24}>
                        <FormItem
                            label="商品属性:"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入商品属性',
                                },
                            ]}
                        >
                            <Input placeholder="请输入商品属性"
                                style={{
                                    width: 200,
                                }}
                            />
                        </FormItem>
                    </Col>
                    <Col lg={12} md={12} sm={24}>
                        <FormItem
                            label="备注:"
                            name="code"

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
            {/* <Table /> */}
        </Modal>
    );
};

export default Model;
