import React, { useState, useEffect } from 'react';
import { Form, Input, Modal, Select, Row, Col, Button, message } from 'antd';
// import { addProduct, goodsUp } from '../../api'
import { addJd, addTb, getJd, getTb } from '../../../api'
import { jdOrder } from '@/pages/order/api';

const Modelb = props => {
    const { TextArea } = Input;
    const { modalVisible, onSubmit: handleAdd, onCancel } = props;
    const [nowMsg, changenowMsg] = useState();
    const [nowMsgs, changeSendMsg] = useState();
    const changeMsg=(e)=>{
        // e.persist()
        changeSendMsg(e.target.value)
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
    }, [props]);
    // const [sendList, pushList] = useState()
    const okHandle = async () => {
        let data = {}
        data.skuId = props.skuId.id;
        if (props.nowId == '1') {
            if(nowMsgs){
                data.jdId = nowMsgs;
                addJd({ method: 'POST', data: data }).then(res => {
                    if (res.code == '200') {
                        onCancel()
                    }
                })
            }else{
                message.error('输入为空')
            }
          
        } else {
            if(nowMsgs){
                data.tbId = nowMsgs;
                addTb({ method: 'POST', data: data }).then(res => {
                    if (res.code == '200') {
                        onCancel()
                        form.resetFields();
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
                        
                        > */}
                            <TextArea rows={4}
                                placeholder='绑定商品，多个以英文逗号分隔'    defaultValue={nowMsg}  onChange={changeMsg}/>
                        {/* </FormItem> */}
                    </Col>
                </Row>
            {/* <Table /> */}
        </Modal>
    );
};

export default Modelb;
