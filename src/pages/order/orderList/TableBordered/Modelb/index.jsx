import React, { useState, useEffect } from 'react';
import { Form, Input, Modal, Select, Row, Col, Table, DatePicker, notification, message } from 'antd';
const { Option } = Select

import { shipping, getWare, syncInventory } from '../../../api'

const FormItem = Form.Item;
const Modelb = props => {
    const [form] = Form.useForm();
    const [lists, setlists] = useState([]);
    const { modalVisible, onSubmit: handleAdd, onCancel, onCheckAllChange, onChanges } = props;
    const [sendList, changeList] = useState([])
    const changeSelects = (id, val) => {
        let arr = JSON.parse(JSON.stringify(props.product));
        arr.map(res => {
            if (id == res.id) {
                res.skuId = id
                res.warehouseId = val.value
            }
        })
        changeList(arr)
    }
    const columns = [
        {
            title: '商品编码',
            dataIndex: 'code',
        },
        {
            title: '商品名称',
            dataIndex: 'name',
        },
        {
            title: '仓库',
            required: true,
            dataIndex: 'id',
            key: 'id',
            render: (text, record) => {
                return <Select
                    labelInValue
                    placeholder='请选择'
                    onChange={(e) => changeSelects(text, e)}
                    style={{
                        width: '100%',
                    }}
                    showSearch
                    filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    {lists.map(res => {
                        return <Option value={res.id} key={res.id}>{res.name}</Option>
                    })}

                </Select>
            }
        },

    ];
    const okHandle = async () => {
        const fieldsValue = await form.validateFields();
        let data = {}
        let shippingTime= Math.floor(fieldsValue.date._d.getTime()/1000)
        data.orderSn = props.nowMsg.order_id;
        data.warehouse = sendList;
        data.shippingTime = shippingTime;
        data.storeId = props.nowMsg.store_id;
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
                setlists(res.data.map(item => {
                    item.key = item;
                    return item;
                }))
            }
        })
    }, [])
    return (
        <Modal
            destroyOnClose
            title="同步库存"
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
                            label="请选择时间: "
                            name="date"
                            rules={[
                                {
                                    required: true,
                                    message: '请选择时间',
                                },
                            ]}
                        >
                            <DatePicker />
                        </FormItem>
                    </Col>
                </Row>
            </Form>
            <Table
                defaultExpandAllRows={true}
                columns={columns}
                dataSource={props.product}
                bordered
                title={() => '商品列表'}
            />
        </Modal>
    );
};

export default Modelb;
