import React, { useState, useEffect } from 'react';
import { Form, Input, Modal, Select, Row, Col, Button, message } from 'antd';
// import { addProduct, goodsUp } from '../../api'
import { addJd, addTb, getJd, getTb } from '../../../api'
import { jdOrder } from '@/pages/order/api';

const Modelb = props => {
    const { TextArea } = Input;
    const { modalVisible, onSubmit: handleAdd, onCancel } = props;
    const [nowMsg, changenowMsg] = useState();
    const changeMsg=(e)=>{
        e.persist()
        changenowMsg(e.target.value)
    }
    const getData = () => {
        if (props.nowId == '1') {
            if (props.skuId) {
                getJd(props.skuId.id).then(res => {
                        changenowMsg(res.data)
                })
            }

        } else {
            if (props.skuId) {
                getTb(props.skuId.id).then(res => {
                        changenowMsg(res.data)
                })
            }
        }
    }

    useEffect(() => {
        getData()
    }, [props.nowMsg]);

    // const [sendList, pushList] = useState()

    const okHandle = async () => {
        // const fieldsValue = await form.validateFields();
        let data = {}
        data.skuId = props.skuId.id;
        if (props.nowId == '1') {
            if(nowMsg){
                data.jdId = nowMsg;
                addJd({ method: 'POST', data: data }).then(res => {
                    if (res.code == '200') {
                        onCancel()
                    }
                })
            }else{
                message.error('输入为空')
            }
          
        } else {
            if(nowMsg){
                data.tbId = nowMsg;
                addTb({ method: 'POST', data: data }).then(res => {
                    if (res.code == '200') {
                        onCancel()
                    }
                })
            }else{
                message.error('输入为空')
            }
        }
    };
    return (
        <Modal
            destroyOnClose
            visible={modalVisible}
            onOk={okHandle}
            title='绑定商品，多个以英文逗号分隔'
            onCancel={() => onCancel()}
            width={1000}
        >
                <Row>
                    <Col lg={24} md={24} sm={24}>
                        {/* <FormItem
                            label="商品: "
                            name="productId"
                            defaultValue={nowMsg}
                        > */}
                            <TextArea rows={4}
                                placeholder='绑定商品，多个以英文逗号分隔'  value={nowMsg}  onChange={changeMsg}/>
                        {/* </FormItem> */}
                    </Col>
                </Row>
            {/* <Table /> */}
        </Modal>
    );
};

export default Modelb;
