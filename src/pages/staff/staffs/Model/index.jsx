import React, { useState, useEffect } from 'react';
import { Form, Input, Modal, Select, Row, Col, Checkbox, Typography, notification } from 'antd';
// import Table from '../Table'
import { addUser, getList, getRole } from '../../api'

const { Title } = Typography;
const { Option } = Select
const CheckboxGroup = Checkbox.Group;


const FormItem = Form.Item;
const Model = props => {
    const [form] = Form.useForm();
    const { modalVisible, onSubmit: handleAdd, onCancel, onCheckAllChange, onChanges } = props;
    // cancelButtonProps={{ disabled: true }}
    //   const [indeterminate, indeterminate] = useState(false);
    if (props.type == '2') {
        let msg = props.nowMsg
        form.setFieldsValue({
            'phone': msg.phone,
            'password': msg.password,
            'name': msg.name,
        })
        // formData.append('name', fieldsValue.name);
        // formData.append('department_id', fieldsValue.code);

        // formData.append('password', fieldsValue.psd);
        // formData.append('phone', fieldsValue.phone);
    }
    const [tableList, changeList] = useState([])
    const [roleList, changeRole] = useState([])

    form.setFieldsValue({
        'password': "123123"
    })
    const getData = () => {
        getList({ method: "GET" },'').then(res => {
            console.log(res)
            changeList(res.data.data)
        })
    }

    const handleChange = (e) => {
        // console.log(e)
        getRole({ method: "GET" }, e).then(res => {
            // console.log(res)
            if (res.data.length > 0) {
                changeRole(res.data)
            } else {
                notification.open({
                    message: `请先添加职位`,
                });
            }
        })
    }
    const roleChange = (e) => {
        console.log(e)
    }
    useEffect(() => {
        getData();
    }, [])
    const okHandle = async () => {
        const fieldsValue = await form.validateFields();
        form.resetFields();
        handleAdd(fieldsValue);
        let formData = new FormData();

        if (fieldsValue.role) {
            formData.append('role_id', fieldsValue.role);
        } else {
            notification.open({
                message: `请先添加职位`,
            });
        }
        formData.append('name', fieldsValue.name);
        formData.append('department_id', fieldsValue.code);

        formData.append('password', fieldsValue.psd);
        formData.append('phone', fieldsValue.phone);
        addUser({ method: "POST", data: formData }).then(res => {
            if (res.code == '200') {
                handleAdd(res.code);
                notification.open({
                    message: `${res.message}`,
                    description: "添加成功",
                });
            }
        })
    };

    return (
        <Modal
            destroyOnClose
            title="新增员工"
            visible={modalVisible}
            onOk={okHandle}
            onCancel={onCancel}
            width={800}
        // state={state}
        >
            <Form form={form}>
                <Row>
                    <Col lg={10} md={10} sm={24}>
                        <FormItem
                            label="员工名称"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入员工名称',
                                },
                            ]}
                        >
                            <Input placeholder="请输入员工名称"
                                style={{
                                    width: 200,
                                }}
                            />
                        </FormItem>
                    </Col>
                    <Col lg={10} md={10} sm={24}>
                        <FormItem
                            label="手机号"
                            name="phone"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入手机号',
                                },
                            ]}
                        >
                            <Input placeholder="请输入手机号"
                                style={{
                                    width: 200,
                                }}
                            />

                        </FormItem>
                    </Col>
                    <Col lg={10} md={10} sm={24}>
                        <FormItem
                            label="密码"
                            name="psd"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入密码',
                                },
                            ]}
                        >
                            <Input placeholder="请输入密码"
                                type="password"
                                style={{
                                    width: 200,
                                }}
                            />

                        </FormItem>
                    </Col>
                    <Col lg={10} md={10} sm={24}>
                        <FormItem
                            label="所在部门: "
                            name="code"
                        >
                            <Select
                                style={{
                                    width: 200,
                                }}
                                onChange={handleChange}
                            // defaultValue="lucy"
                            >
                                {tableList.map(res => {
                                    return <Option value={res.id} key={res.id}>{res.name}</Option>
                                })}

                            </Select>
                        </FormItem>
                    </Col>
                    <Col lg={10} md={10} sm={24}>
                        <FormItem
                            label="职位: "
                            name="role"
                        >
                            <Select
                                style={{
                                    width: 200,
                                }}
                                onChange={roleChange}
                            // defaultValue="lucy"
                            >
                                {roleList.map(item => {
                                    return <Option value={item.id} key={item.id}>{item.name}</Option>
                                })}

                            </Select>
                        </FormItem>
                    </Col>
                    <Col lg={4} md={4} sm={4}>

                    </Col>
                </Row>
            </Form>

            {/* <Table /> */}
        </Modal>
    );
};

export default Model;
