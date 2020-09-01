import React, { useState, useEffect } from 'react';
import { Form, Input, Modal, Select, Row, Col, Button, Typography, notification, message } from 'antd';
const { Option } = Select

import { shipping, getWare,syncInventory } from '../../../api'

const FormItem = Form.Item;
const Modelb = props => {
    const [form] = Form.useForm();
    const [lists, setlists] = useState([]);
    const { modalVisible, onSubmit: handleAdd, onCancel, onCheckAllChange, onChanges } = props;
    useEffect(() => {
    }, [])
    const okHandle = async () => {
        const fieldsValue = await form.validateFields();
        let data = {}
        data.orderSn = props.storeId;
        data.storeId = props.store;
        data.warehouseId = fieldsValue.wareId;
        syncInventory({ method: 'POST', data: data }).then(res => {
            if (res.code == '200') {
                message.success('请求成功')
                onCancel()
            } else {
                message.error(res.message)
            }
            handleAdd(res.code)
        })
    };
    useEffect(() => {
        getWare().then(res => {
            if (res.code == '200') {
                setlists(res.data.map(item=>{
                    item.key=item;
                    return item;
                }))
            }
        })
    }, [])
    return (
        <Modal
            destroyOnClose
            title="发货"
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
                            label="仓库: "
                            name="wareId"
                            rules={[
                                {
                                    required: true,
                                    message: '请选择仓库',
                                },
                            ]}
                        >
                            <Select
                                style={{
                                    width: 200,
                                }}
                                placeholder='请选择'
                            >
                                {lists.map(res => {
                                    return <Option value={res.id} key={res.id}>{res.name}</Option>
                                })}

                            </Select>
                        </FormItem>
                    </Col>
                </Row>
            </Form>
        </Modal>
    );
};

export default Modelb;
