import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useState, useEffect, useRef } from 'react';

import { Spin, DatePicker, Card, Row, Col, message, Select, Button, Table } from 'antd';
import styles from './index.less';

import { logList, detail, downLoads } from '../api'
import Model from '../bill/Model'
import Modelb from '../bill/Modelb'
import Modelc from './Model'

export default props => {
    const [lists, setlists] = useState([]);
    const [msg, setMsg] = useState([]);
    const [createModalVisible, handleModalVisible] = useState(false);
    const [createModalVisibleb, handleModalVisibleb] = useState(false);
    const [createModalVisiblec, handleModalVisiblec] = useState(false);
    const [nowId, changeIds] = useState(false);
    const getData = () => {
        logList(props.location.query.id).then(res => {
            if (res.code == '200') {
                setlists(res.data.data.map(item => {
                    item.key = item.id;
                    let time = new Date(item.created_at)
                    let d = new Date(time);
                    item.created_at = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
                    return item;
                }))
            }
        })
        detail(props.location.query.id).then(res => {
            if (res.code == '200') {
                setMsg(res.data)
            }
        })


    }
    const changeId=(e)=>{
        changeIds(e)
    }
    const handleAdd=(e)=>{
        if(e=='200'){
            return true;
        }else{
            return false
        }
    }
    const [loading, setLoading] = useState(true);

    const columns = [
        {
            title: '日期', dataIndex: 'created_at', key: 'name',
            render: (text) => <span>{text}</span>,
        },
        {
            title: '类型', dataIndex: 'pay_type', key: 'name',
            render: (text) => <span>{text}</span>,
        },
        {
            title: '交易方式', dataIndex: 'typeName', key: 'name',
            render: (text) => <span>{text}</span>,

        },
        {
            title: '凭据信息', dataIndex: 'credential', key: 'name',
            render: (text) => <span>{text}</span>,

        },
        {
            title: '金额', dataIndex: 'money', key: 'name',
            render: (text) => <span>{text / 100}</span>,
        },
        {
            title: '备注', dataIndex: 'comment', key: 'name',
            render: (text) => <span>{text}</span>,
        },
        {
            title: '操作', 
            render: (text) => { 
                if(text.payment_id=='0'){
                    return <a onClick={()=>{handleModalVisiblec(true);changeId(text.id)}}>修改</a>
                }
            },
        },
    ];

    useEffect(() => {
        getData()
    }, []);
    return (
        <PageHeaderWrapper content="" className={styles.main}>
            <Row gutter={10}>
                <Col span={6}>
                    <Card title="商家编码" bordered={true}>
                        {msg.code}
                    </Card>
                </Col>
                <Col span={6}>
                    <Card title="商家名称" bordered={true}>
                        {msg.name}
                    </Card>
                </Col>
                <Col span={6}>
                    <Card title="联系人" bordered={true}>
                        {msg.contact_name}
                    </Card>
                </Col>
                <Col span={6}>
                    <Card title="联系方式" bordered={true}>
                        {msg.contact_phone}
                    </Card>
                </Col>
            </Row>
            <br />
            <Row gutter={10}>
                <Col span={6}>
    <h3>账户余额：{msg.balance/100}</h3>
                </Col>
                <Col span={4}>
                    <Button type="primary" onClick={()=>{handleModalVisible(true)}}>账户付款</Button>
                </Col>
                <Col span={4}>
                    <Button type="primary" onClick={()=>{handleModalVisibleb(true)}}>余额退款</Button>
                </Col>
            </Row>
            <br />

            <Table
                header={'账单信息'}
                columns={columns}
                dataSource={lists}
                bordered
            ></Table>
            <Model
                onSubmit={async value => {
                    const success = await handleAdd(value);
                    if (success) {
                        handleModalVisible(false);
                        getData()
                    }
                }}
                onCancel={() => handleModalVisible(false)}
                modalVisible={createModalVisible}
                nowMsg={msg}
            />
            <Modelb
                onSubmit={async value => {
                    const success = await handleAdd(value);
                    if (success) {
                        handleModalVisibleb(false);
                        getData()
                    }
                }}
                onCancel={() => handleModalVisibleb(false)}
                modalVisible={createModalVisibleb}
                nowMsg={msg}
            />
             <Modelc
                onSubmit={async value => {
                    const success = await handleAdd(value);
                    if (success) {
                        handleModalVisiblec(false);
                        getData()
                    }
                }}
                onCancel={() => handleModalVisiblec(false)}
                modalVisible={createModalVisiblec}
                nowId={nowId}
            />
            
            <div
                style={{
                    paddingTop: 100,
                    textAlign: 'center',
                }}
            >
                <Spin spinning={loading} size="large" />
            </div>
        </PageHeaderWrapper>
    );
};

