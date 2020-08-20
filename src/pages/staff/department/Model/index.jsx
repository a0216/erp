import React from 'react';
import { Form, Input, Modal, Select, Row, Col, Button, notification } from 'antd';
import { addCompany } from '../../api';
import { changeCompany } from '../../api';
import request from '@/utils/request';

const FormItem = Form.Item;
const Model = props => {
    const [form] = Form.useForm();

    console.log(props)
    let title="新建部门"
    if(props.type=='2'){
        title="修改部门"
        form.setFieldsValue({
            'name': props.names
        })
    }else{
        title="新建部门"
    }
    const { modalVisible, onSubmit: handleAdd, onCancel } = props;
    const okHandle = async () => {
        const fieldsValue = await form.validateFields();
        if(props.type=='1'){
            addCompany({ method: 'POST', data: { 'name': fieldsValue.name } }).then(res => {
                if (res.code == '200') {
                    console.log(res.message)
                    handleAdd(res.code)
                    notification.open({
                        message: `${res.message}`,
                        description: "添加成功",
                    });
                } else {
                    onCancel(fieldsValue)
                }
            })
        }else{
            changeCompany({ method: 'POST', data: { 'name': fieldsValue.name,id	:props.id } }).then(res => {
                if (res.code == '200') {
                    console.log(res.message)
                    handleAdd(res.code)
                    notification.open({
                        message: `${res.message}`,
                        description: "添加成功",
                    });
                } else {
                    onCancel(fieldsValue)
                }
            })
        }
        
        form.resetFields();
    };
    return (
        <Modal
            destroyOnClose
            title={title}
            visible={modalVisible}
            onOk={okHandle}
            onCancel={() => onCancel()}
        // cancelButtonProps={{ disabled: true }}
        >
            <Form form={form}>
                <Row>

                    <Col lg={12} md={12} sm={24}>
                        <FormItem
                            label="部门名称:"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入部门名称',
                                },
                            ]}
                        >
                            <Input placeholder="请输入部门名称"
                                style={{
                                    width: 200,
                                }}
                            />

                        </FormItem>
                    </Col>
                    <Col lg={12} md={12} sm={24}>
                        <FormItem
                            label="备注: "
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
