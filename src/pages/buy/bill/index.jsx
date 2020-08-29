import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useState, useEffect, useRef } from 'react';

import { Spin, DatePicker, Input, Row, Col, message, Select, Button, Tabs, Form } from 'antd';

import styles from './index.less';
import TableBordered from '../bill/TableBordered';
import { shopList, wareSelects } from '../../allNeed'

import { payment, searchUser, downLoads,billList } from '../api'

const { RangePicker } = DatePicker;
const { Option } = Select
const style = {
};

const { TabPane } = Tabs;

const handleAdd = async fields => {
    const hide = message.loading('正在添加');
    if (fields == '200') {
        return true
    } else {
        message.error('添加失败请重试！');
        return false
    }
};
const FormItem = Form.Item;

export default () => {
    const [form] = Form.useForm();

    const [loading, setLoading] = useState(true);
    const [createModalVisible, handleModalVisible] = useState(false);
    const [shopLists, changeshopList] = useState([]);
    const [types, changeType] = useState('0');
    const [wareList, changetWare] = useState([]);
    const [paymentList, changepayment] = useState([]);
    const [userList, setuserList] = useState([]);
    const [sendUrl, changeUrl] = useState([])
    const reast = e => {
        message.loading('已重置', 1)
        form.resetFields();
        getData()
    }
    const getData = () => {
        billList('').then(res => {
            if (res.code == '200') {
                changepayment(res.data.map(item => {
                    item.key = item.id;
                    return item;
                }))
            }
        })
    }
    const exportAll = () => {
        fetch(`https://erpapi.owodian.com/api/warehouse/payment/export/info?all=1`, {
            method: "get",
            headers: {
                "Authorization": `${JSON.parse(localStorage.getItem('tokenType'))} ${JSON.parse(localStorage.getItem('token'))}`,
            },
        }).then(res => res.blob()).then(blob => {
            var a = document.createElement('a');
            var url = window.URL.createObjectURL(blob);
            var filename = '付款单.xls';
            a.href = url;
            a.download = filename;
            a.click();
            window.URL.revokeObjectURL(url);
        }).then(res => {
            message.loading('正在下载', 2.5)
        })

    }
    const actionRef = useRef(getData);
    const exports = async () => {
        const fieldsValue = await form.validateFields();
        let url = `?`;
        function test(s) {
            return s.charAt(s.length - 1) === '?';
        }
       
        if (fieldsValue.code) {
            if (test(url)) {
                url += `code=${fieldsValue.code}`
            } else {
                url += `&code=${fieldsValue.code}`
            }
        }
        if (fieldsValue.name) {
            if (test(url)) {
                url += `name=${fieldsValue.name}`
            } else {
                url += `&name=${fieldsValue.name}`
            }
        }
        if (fieldsValue.contactName) {
            if (test(url)) {
                url += `contactName=${fieldsValue.contactName}`
            } else {
                url += `&contactName=${fieldsValue.contactName}`
            }
        }
       
        changeUrl(url);
        downLoads(url).then(res => {
            message.loading('正在下载。。。', 2.5)
        })
    }
    const search = async (types) => {
        const fieldsValue = await form.validateFields();
        let url = `?`;
        function test(s) {
            return s.charAt(s.length - 1) === '?';
        }
        if (fieldsValue.code) {
            if (test(url)) {
                url += `code=${fieldsValue.code}`
            } else {
                url += `&code=${fieldsValue.code}`
            }
        }
        if (fieldsValue.name) {
            if (test(url)) {
                url += `name=${fieldsValue.name}`
            } else {
                url += `&name=${fieldsValue.name}`
            }
        }
        if (fieldsValue.contactName) {
            if (test(url)) {
                url += `contactName=${fieldsValue.contactName}`
            } else {
                url += `&contactName=${fieldsValue.contactName}`
            }
        }
        billList(url).then(res => {
            if (res.code == '200') {
                changepayment(res.data.map(item => {
                    item.key = item.id;
                    return item;
                }))
            }
        })
    }
    const callback = (e) => {
        changeType(e)
        search(e)
        // changeUrl(url);
    }
    useEffect(() => {
        searchUser().then(res => {
            if (res.code == '200') {
                setuserList(res.data.map(item => {
                    item.key = item.id;
                    return item;
                }))
            }

        })
        wareSelects({ method: 'GET' }).then(res => {
            if (res.code == '200') {
                res.data.map(item => {
                    item.key = item.id;
                })
                changetWare(res.data)
            }
        })
        shopList({ method: 'GET' }).then(res => {
            if (res.code == '200') {
                res.data.map(item => {
                    item.key = item.id;
                })
                changeshopList(res.data)
            }
        })
        getData()
        setTimeout(() => {
            setLoading(false);
        }, 500);
    }, []);
    return (
        <PageHeaderWrapper content="" className={styles.main}>
            <Form form={form}>
                <Row gutter={16}>
                    <Col className="gutter-row" span={6}>
                        <FormItem
                            label="联系人："
                            name="contactName"
                        >
                            <Input
                                placeholder="请输入联系人"
                                style={{
                                    width: 180,
                                }}
                            />
                        </FormItem>
                    </Col>
                    <Col className="gutter-row" span={6}>
                        <FormItem
                            label=" 商家编码："
                            name="code"
                        >

                            <Input
                                placeholder="请输入商家编码"
                                style={{
                                    width: 180,
                                }}
                            />
                        </FormItem>
                    </Col>
                    <Col className="gutter-row" span={6}>
                        <FormItem
                            label=" 商家名称："
                            name="name"
                        >
                            <Input
                                placeholder="请输入商家名称"
                                style={{
                                    width: 180,
                                }}
                            />
                        </FormItem>
                    </Col>
                    <Col className="gutter-row" span={4}>
                        <div style={style}>
                            <Button type="primary" shape="" onClick={search}>
                                搜索
                             </Button>
                        </div>
                    </Col>
                </Row>
                <Row gutter={0}>
                    <Col className="gutter-row" span={18}>
                    </Col>
                    <Col className="gutter-row" span={4}>
                        <div style={style}>
                            <Button type="primary" shape="" onClick={reast}>
                                重置
                            </Button>
                        </div>
                    </Col>
                </Row>
                <Row gutter={0} style={{marginBottom:20}}>
                    <Col className="gutter-row" span={16}></Col>
                    <Col className="gutter-row" span={4}>
                        <div style={style}>
                            <Button type="primary" shape="" onClick={exports}>
                                导出本页
                             </Button>
                        </div>
                    </Col>
                    <Col className="gutter-row" span={4}>
                        <div style={style}>
                            <Button type="primary" shape="" onClick={exportAll}>
                                导出全部
                            </Button>
                        </div>
                    </Col>
                </Row>
                <TableBordered
                    paymentList={paymentList}
                    actionRef={actionRef}
                />
                <div
                    style={{
                        paddingTop: 100,
                        textAlign: 'center',
                    }}
                >
                    <Spin spinning={loading} size="large" />
                </div>
            </Form>
        </PageHeaderWrapper>
    );
};

