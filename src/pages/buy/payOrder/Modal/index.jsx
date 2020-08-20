import React from 'react';
import { Form, Input, Modal, Select, Row, Col, DatePicker, message } from 'antd';
import Tables from './Table'
import moment from 'moment';
import {payPayment} from '../../api'

const Modals = props => {
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

    const { modalVisible, onSubmit: handleAdd, onCancel } = props;
    const okHandle = async () => {
        const fieldsValue = await form.validateFields();
        let d= Math.floor(fieldsValue.time._d.getTime()/1000);
        form.resetFields();
        let data={}
        data.credential=fieldsValue.code
        data.type=fieldsValue.status
        data.time=d
        data.id=props.nowMsg.id
        payPayment({method:'POST',data:data}).then(res=>{
            if(res.code=='200'){
                message.success('请求成功')
            }
            onCancel()
            handleAdd(res.code)
        })
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
            <Tables
                nowMsg={props.nowMsg}
            ></Tables>
            <Form form={form}>
                <Row>
                    <Col lg={12} md={12} sm={24}>
                        <FormItem
                            label="付款方式: "
                            name="status"
                        >
                            <Select
                                defaultValue="请选择"
                                style={{
                                    width: 180,
                                }}
                            >
                                <Option value="0">申请采购单</Option>
                                <Option value="1">入库</Option>
                                <Option value="2">支付宝</Option>
                                <Option value="3">现金</Option>
                                <Option value="4">银行卡</Option>
                                <Option value="5">微信</Option>

                            </Select>
                        </FormItem>
                    </Col>
                    <Col lg={12} md={12} sm={24}>
                        <FormItem
                            label="时间:"
                            name="time"
                            rules={[
                                {
                                    required: true,
                                    message: '请选择时间',
                                },
                            ]}
                        >
                            <DatePicker
                                // format="YYYY-MM-DD HH:mm:ss"
                                // disabledDate={disabledDate}
                                // disabledTime={disabledDateTime}
                                showTime={{ format: 'HH' }}
                                format="YYYY-MM-DD HH"
                                // showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
                            />
                        </FormItem>
                    </Col>
                    <Col lg={24} md={24} sm={24}>
                        <FormItem
                            label="凭据信息:"
                            name="code"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入凭据信息',
                                },
                            ]}
                        >
                            <Input placeholder="请输入凭据信息"
                             
                            />
                        </FormItem>
                    </Col>

                </Row>
            </Form>
            {/* <Table /> */}
        </Modal>
    );
};

export default Modals;
