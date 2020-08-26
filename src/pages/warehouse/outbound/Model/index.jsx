import React, { useState, useEffect } from 'react';
import { Form, Input, Modal, Select, Row, Col, Button, Typography, notification, message } from 'antd';
import Table from './Table'
import Models from './Model'
import { shopList, wareSelects } from '../../../allNeed'
const { Option } = Select
import { outWare, getList } from '../../api'


const FormItem = Form.Item;
const Model = props => {
    const [form] = Form.useForm();
    const { modalVisible, onSubmit: handleAdd, onCancel, onCheckAllChange, onChanges } = props;
    // cancelButtonProps={{ disabled: true }}
    const [product, changeList] = useState([]);
    const [sendList, toSend] = useState([]);
    const [onSelect, changeSelect] = useState([]);
    const [shopLists, changeshopList] = useState([]);
    const [createModalVisible, handleModalVisible] = useState(false);
    const [nowLists, changenowLists] = useState([])
    const [wareList, changeWareList] = useState([])

    const getWare = () => wareSelects({ method: "get" }).then(res => {
        if (res.code == '200') {
            res.data.map(item => {
                item.key = item.id;
                return item;
            })
            changeWareList(res.data)

        }
    })

    const getData = (e) => {
        getList({ method: 'get' }, `?id=${e}`).then(res => {
            if (res.code == '200') {
                changeList(res.data.map(item=>{
                    item.key=item.id
                    return item
                }))
            }
        })
    }
    const handleAdds = (e) => {
        changenowLists(e)
    }
    const changeWare = (e) => {
        getData(e)
    }
    useEffect(() => {
        shopList({ method: 'GET' }).then(res => {
            if (res.code == '200') {
                res.data.map(item => {
                    item.key = item.id;
                })
                changeshopList(res.data)
            }
        })
        getWare()

    }, [])
    const okHandle = async () => {
        const fieldsValue = await form.validateFields();
        // form.resetFields();
        // let skuList = [];
        let data = {}
        data.warehouseId = fieldsValue.wareId;
        data.type = fieldsValue.statusd;
        sendList.map(res=>{
            res.all=res.all*100;
            res.reduce=res.reduce*100;
            return res;
        })
        data.skuList = sendList;

        outWare({ method: 'POST', data: data }).then(res => {
            if(res.code=='200'){
                message.success('请求成功')
                onCancel()
            }
            handleAdd(res.code);
        })

    };

    return (
        <Modal
            destroyOnClose
            title="出库"
            visible={modalVisible}
            onOk={okHandle}
            onCancel={onCancel}
            width={1000}
        >
            <Form form={form}>
                <Row>
                    <Col lg={10} md={10} sm={24}>
                        <FormItem
                            label="出库仓库: "
                            name="wareId"
                            rules={[
                                {
                                    required: true,
                                    message: '请选择出库仓库',
                                },
                            ]}
                        >
                            <Select
                                style={{
                                    width: 200,
                                }}
                                placeholder='请选择'
                                // onSelect={changeWareId(value)}
                                onChange={changeWare}
                            >
                                {wareList.map(res => {
                                    return <Option value={res.id} key={res.id}>{res.name}</Option>
                                })}

                            </Select>
                        </FormItem>
                    </Col>
                    <Col lg={10} md={10} sm={24}>
                        <FormItem
                            label="单据类型: "
                            name="statusd"
                            rules={[
                                {
                                    required: true,
                                    message: '请选择单据类型',
                                },
                            ]}
                        >
                            <Select
                                style={{
                                    width: 200,
                                }}
                                placeholder='请选择'
                            >
                                <Option value='1' key='1'>其他出库</Option>
                                <Option value='2' key='2'>销售出库</Option>
                                <Option value='3' key='3'>退厂出库</Option>
                                <Option value='4' key='4'>调拨出库</Option>


                            </Select>
                        </FormItem>
                    </Col>
                
                    <Col lg={24} md={24} sm={24}>
                        {product.length > 0 ? <Button type="primary" shape="" onClick={() => handleModalVisible(true)}>
                            新增商品
                        </Button> : ''}

                        <Models
                            onSubmit={async value => {
                                const success = await handleAdds(value);
                                if (success) {
                                    handleModalVisible(false);
                                    if (actionRef.current) {
                                        actionRef.current.reload();
                                    }
                                }
                            }}
                            handleAdds={handleAdds}
                            product={product}
                            changeList={changeList}
                            onCancel={() => handleModalVisible(false)}
                            modalVisible={createModalVisible}
                        />
                    </Col>
                </Row>

            </Form>
            <Table
                productList={nowLists}
                changeList={changenowLists}
                toSend={toSend}
                onSelect={onSelect}
                changeSelect={changeSelect}
                wareList={wareList}
            />
        </Modal>
    );
};

export default Model;
