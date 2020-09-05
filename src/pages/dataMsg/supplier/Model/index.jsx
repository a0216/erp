import React, { useState, useEffect } from 'react';
import { Form, Input, Modal, Select, Row, Col, Button, message } from 'antd';
import { shopMsgList, shopAdd,shopChange } from '../../api';
import wareMsg from '../../../allNeed'

const Modela = props => {
    const FormItem = Form.Item;
    const [shopList, changeShopList] = useState([])
    const getList = (e) => {
        shopMsgList({ method: "get" }).then(res => {
            if (res.code == '200') {
                let data=res.data.map(item=>{
                    item.key=item.id;
                    return item
                })
                changeShopList(data)
            }
        })
    }
    useEffect(() => {
        getList()

    }, []);
    const [form] = Form.useForm();
 
    let title = "新建商家"
    if (props.type == '2') {
        title = "修改商家"
        form.setFieldsValue({
            'name': props.nowMsg.name,
            'phone': props.nowMsg.contact_phone,
            'status': props.nowMsg.status,
            'address': props.nowMsg.contact_address,
            'user': props.nowMsg.contact_name,
            'code': props.nowMsg.code,
            'propertyId': props.nowMsg.property,
            'bankName': props.nowMsg.bank_address,
            'bankNum': props.nowMsg.bank_card,
        })
    } else {
        title = "新建商家"
    }
   
    const handleMsg = (e) => {
    }
    const { modalVisible, onSubmit: handleAdd, onCancel } = props;
    const okHandle = async () => {
        const fieldsValue = await form.validateFields();
        let formdata = new FormData()
        formdata.append('name', fieldsValue.name);
        formdata.append('contact_phone', fieldsValue.phone);
        formdata.append('status', fieldsValue.status);
        formdata.append('contact_address', fieldsValue.address);
        formdata.append('contact_name', fieldsValue.user);
        formdata.append('code', fieldsValue.code);
        formdata.append('property', fieldsValue.propertyId);
        formdata.append('bank_address', fieldsValue.bankName);
        formdata.append('bank_card', fieldsValue.bankNum);
        // formdata.append('area', fieldsValue.address);
        if (props.type == '1') {
            shopAdd({ method: "POST", data: formdata }).then(res => {
                if (res.code == '200') {
                    message.success("添加成功");
                    onCancel()
                    handleAdd(res.code)
                }
            })
        } else {
        formdata.append('sid',  props.nowMsg.id);
            shopChange({ method: "POST", data: formdata }).then(res => {
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
            width={1000}
        >
            <Form form={form}>
                <Row>
                    <Col lg={12} md={12} sm={24}>
                        <FormItem
                            label="商家属性: "
                            name="propertyId"
                        >
                            <Select
                                defaultValue="请选择"
                                style={{
                                    width: 180,
                                }}
                                onChange={handleMsg}
                            >
                                {shopList.map(res => {
                                    return <Option value={res.id} key={res.key}>{res.item}</Option>
                                })}

                            </Select>
                        </FormItem>
                    </Col>
                    <Col lg={12} md={12} sm={24}>
                        <FormItem
                            label="商家状态: "
                            name="status"
                        >
                            <Select
                                defaultValue="请选择"
                                style={{
                                    width: 180,
                                }}
                                onChange={handleMsg}
                            >
                                <Option value='1'>正常</Option>
                                <Option value='0'>冻结</Option>

                            </Select>
                        </FormItem>
                    </Col>
                    <Col lg={12} md={12} sm={24}>
                        <FormItem
                            label="商家名称:"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入商家名称',
                                },
                            ]}
                        >
                            <Input placeholder="请输入商家名称"
                                style={{
                                    width: 200,
                                }}
                            />
                        </FormItem>
                    </Col>
                    <Col lg={12} md={12} sm={24}>
                        <FormItem
                            label="商家编码:"
                            name="code"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入商家编码',
                                },
                            ]}
                        >
                            <Input placeholder="请输入商家编码"
                                style={{
                                    width: 200,
                                }}
                            />
                        </FormItem>
                    </Col>
                    <Col lg={12} md={12} sm={24}>
                        <FormItem
                            label="联系人: "
                            name="user"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入联系人',
                                },
                            ]}
                        >
                            <Input placeholder="请输入联系人"
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

                    <Col lg={24} md={24} sm={24}>
                        <FormItem
                            label="地址: "
                            name="address"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入地址',
                                },
                            ]}
                        >
                            <Input placeholder="请输入地址"
                                style={{
                                    width: 600,
                                }}
                            />
                        </FormItem>
                    </Col>
                    <Col lg={12} md={12} sm={24}>
                        <FormItem
                            label="开户行: "
                            name="bankName"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入开户行',
                                },
                            ]}
                        >
                            <Input placeholder="请输入开户行"
                                style={{
                                    width: 200,
                                }}
                            />
                        </FormItem>
                    </Col>
                    <Col lg={12} md={12} sm={24}>
                        <FormItem
                            label="银行账户: "
                            name="bankNum"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入银行账户',
                                },
                            ]}
                        >
                            <Input placeholder="请输入银行账户"
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

export default Modela;
