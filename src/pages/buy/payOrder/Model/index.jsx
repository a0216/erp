import React, { useState, useEffect } from 'react';
import { Form, Input, Modal, Select, Row, Col, Button, Typography, notification, message } from 'antd';
import { shopList ,wareSelects} from '../../../allNeed'
const { Option } = Select
import { productList, sendPay } from '../../api'


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

   const getWare=()=> wareSelects({ method: "get" }).then(res => {
        if (res.code == '200') {
          res.data.map(item => {
            item.key = item.id;
            return item;
          })
          changeWareList(res.data)
         
        }
      })

    const getData = () => {
        productList({ method: 'get' }).then(res => {
            if (res.code == '200') {
                changeList(res.data)
            }
        })
    }
    const handleAdds = (e) => {
        changenowLists(e)
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
        getData();

    }, [])
    const okHandle = async () => {
        const fieldsValue = await form.validateFields();
        form.resetFields();
        // let skuList = [];
        console.log(sendList)
        console.log(fieldsValue)
        let data = {}
        data.fare = fieldsValue.freight;
        data.shopId = fieldsValue.send;
        data.skuList = sendList;
        sendPay({ method: 'POST', data: data }).then(res => {
            if(res.code=='200'){
                message.success('请求成功')
                onCancel()
            }
            handleAdd(res.code);
            console.log(res);
        })
        // product.map(res => {
        //     onSelect.map(item => {
        //         if (res.id == item) {
        //             skuList.push({ id: res.id, num: res.number })
        //             return skuList
        //         }
        //     })
        // })

        // handleAdd(fieldsValue);
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
                            label="供应商: "
                            name="send"
                            rules={[
                                {
                                    required: true,
                                    message: '请选择供应商',
                                },
                            ]}
                        >
                            <Select
                                style={{
                                    width: 200,
                                }}
                                placeholder='请选择'
                            >
                                {shopLists.map(res => {
                                    return <Option value={res.id} key={res.id}>{res.name}</Option>
                                })}

                            </Select>
                        </FormItem>
                    </Col>
                    <Col lg={10} md={10} sm={24}>
                        <FormItem
                            label="运费:"
                            name="freight"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入运费',
                                },
                            ]}
                        >
                            <Input placeholder="请输入运费"
                                style={{
                                    width: 200,
                                }}
                            />
                        </FormItem>
                    </Col>
                    <Col lg={24} md={24} sm={24}>
                        <Button type="primary" shape="" onClick={() => handleModalVisible(true)}>
                            新增商品
                        </Button>
                    </Col>
                </Row>

            </Form>
        </Modal>
    );
};

export default Model;
