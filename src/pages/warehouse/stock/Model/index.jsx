import React, { useState, useEffect } from 'react';
import { Form, Input, Modal, Select, Row, Col, Button, Typography, notification, message } from 'antd';
import Table from './Table'
import Models from './Model'
import { shopList, wareSelects } from '../../../allNeed'
const { Option } = Select
import { outWare, getList ,wareTrans} from '../../api'


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
        data.send_warehouse_id = fieldsValue.wareId;
        data.accept_warehouse_id = fieldsValue.statusd;
        data.skuList = sendList;
        wareTrans({ method: 'POST', data: data }).then(res => {
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
            title="采购"
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
                                showSearch
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                {wareList.map(res => {
                                    return <Option value={res.id} key={res.id}>{res.name}</Option>
                                })}

                            </Select>
                        </FormItem>
                    </Col>
                    <Col lg={10} md={10} sm={24}>
                        <FormItem
                            label="入库仓库: "
                            name="statusd"
                            rules={[
                                {
                                    required: true,
                                    message: '请选择入库仓库',
                                },
                            ]}
                        >
                            <Select
                                style={{
                                    width: 200,
                                }}
                                placeholder='请选择'
                                showSearch
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                               {wareList.map(res => {
                                    return <Option value={res.id} key={res.id}>{res.name}</Option>
                                })}


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
