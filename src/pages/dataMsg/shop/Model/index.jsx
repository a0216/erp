import React from 'react';
import { Form, Input, Modal, Select, Row, Col, Button, message } from 'antd';
import {shopAdd} from '../../api';
import wareMsg from '../../../allNeed'


const Model = props => {
const FormItem = Form.Item;

    const [form] = Form.useForm();
    let title = "新建仓库"
    if (props.type == '2') {
        title = "修改部门"
        form.setFieldsValue({
            'name': props.names
        })
    } else {
        title = "新建仓库"
    }
    const handleChange =(e)=>{
        console.log(e)
    }
    const handleMsg =(e)=>{
        console.log(e)
    }
    const { modalVisible, onSubmit: handleAdd, onCancel } = props;
    const okHandle = async () => {
        const fieldsValue = await form.validateFields();
        // console.log(fieldsValue)
        let formdata=new FormData()
        formdata.append('name',fieldsValue.name);
        formdata.append('propertyId',fieldsValue.propertyId);
        formdata.append('userId',fieldsValue.userId);
        formdata.append('phone',fieldsValue.phone);
        formdata.append('status',fieldsValue.status);
        formdata.append('code',fieldsValue.code);
        formdata.append('area',fieldsValue.address);
        if (props.type == '1') {
            addWare({method:"POST",data:formdata}).then(res=>{
                if(res.code=='200'){
                    message.success("添加成功");
                    onCancel()
                    handleAdd(res.code)
                }
                // console.log(res)
            })
        } else {

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
            width={1000}
        >
            <Form form={form}>
                <Row>
                    <Col lg={12} md={12} sm={24}>
                        <FormItem
                            label="仓库名称:"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入仓库名称',
                                },
                            ]}
                        >
                            <Input placeholder="请输入仓库名称"
                                style={{
                                    width: 200,
                                }}
                            />
                        </FormItem>
                    </Col>
                    <Col lg={12} md={12} sm={24}>
                        <FormItem
                            label="仓库编码:"
                            name="code"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入仓库编码',
                                },
                            ]}
                        >
                            <Input placeholder="请输入仓库编码"
                                style={{
                                    width: 200,
                                }}
                            />
                        </FormItem>
                    </Col>
                    <Col lg={12} md={12} sm={24}>
                        <FormItem
                            label="联系方式: "
                            name="phone"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入联系方式',
                                },
                            ]}
                        >
                            <Input placeholder="请输入联系方式"
                                style={{
                                    width: 200,
                                }}
                            />
                        </FormItem>
                    </Col>
                   
                 
                    <Col lg={12} md={12} sm={24}>
                        <FormItem
                            label="仓库属性: "
                            name="propertyId"
                        >
                            <Select
                                defaultValue="请选择"
                                style={{
                                    width: 180,
                                }}
                                onChange={handleMsg}
                            >
                                {wareMsg.map(res=>{
                                    return <Option value={res.id}>{res.name}</Option>
                                })}
                           
                            </Select>
                        </FormItem>
                    </Col>
                    <Col lg={12} md={12} sm={24}>
                        <FormItem
                            label="负责人: "
                            name="userId"
                        >
                            <Select
                                defaultValue="请选择"
                                style={{
                                    width: 180,
                                }}
                                onChange={handleChange}
                            >
                                <Option value="1">erp</Option>
                                
                            </Select>
                        </FormItem>
                    </Col>
                    <Col lg={12} md={12} sm={24}>
                        <FormItem
                            label="仓库状态: "
                            name="status"
                        >
                            <Select
                                defaultValue="请选择"
                                style={{
                                    width: 180,
                                }}
                                onChange={handleChange}
                            >
                                <Option value="1">正常</Option>
                                <Option value="0">冻结</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col lg={24} md={24} sm={24}>
                        <FormItem
                            label="仓库地址: "
                            name="address"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入仓库地址',
                                },
                            ]}
                        >
                            <Input placeholder="请输入仓库地址"
                                style={{
                                    width: 600,
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
