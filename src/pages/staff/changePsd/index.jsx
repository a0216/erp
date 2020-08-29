import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useState, useEffect, useRef } from 'react';
import { router, routerRedux } from 'umi'
import { message, Row, Col, Form, Input, Button } from 'antd';
import {changePsd} from '../api'
export default () => {
    const FormItem = Form.Item;
    const [form] = Form.useForm();
    const search = async () => {
        const fieldsValue = await form.validateFields();
        let data = {}
        data.oPassword=fieldsValue.psd;
        data.password=fieldsValue.psda;
        if(fieldsValue.psda!=fieldsValue.psdb){
            message.error('两次输入密码不一致！');
        }else{
            changePsd({ method: 'POST', data: data }).then(res => {
                if (res.code == '200') {
                    message.success(res.message);
                    localStorage.clear()
                    location.reload()
                }
            })
        }
        // searchUser
    }
    return (
        <PageHeaderWrapper content="" style={{background:'#fff'}}>
            <Form form={form}>
                <Row gutter={16}>
                    <Col lg={12} md={12} sm={24}>
                        <FormItem
                            label="原密码:"
                            name="psd"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入原密码',
                                },
                            ]}
                        >
                            <Input placeholder="请输入原密码" type='password'
                                style={{
                                    width: 200,
                                }}
                            />
                        </FormItem>
                    </Col>
                    <Col lg={12} md={12} sm={24}>
                        <FormItem
                            label="新密码:"
                            name="psda"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入新密码',
                                },
                            ]}
                        >
                            <Input placeholder="请输入新密码"type='password'
                                style={{
                                    width: 200,
                                }}
                            />
                        </FormItem>
                    </Col>
                    <Col lg={12} md={12} sm={24}>
                        <FormItem
                            label="确认密码:"
                            name="psdb"
                            rules={[
                                {
                                    required: true,
                                    message: '请确认密码',
                                },
                            ]}
                        >
                            <Input placeholder="请确认密码"type='password'
                                style={{
                                    width: 200,
                                }}
                            />
                        </FormItem>
                    </Col>
                    <Col className="gutter-row" span={4}>
                        <Button type="primary" shape="" onClick={search}>
                            确认修改
                        </Button>
                    </Col>
                </Row>
            </Form>
        </PageHeaderWrapper>
    );
};

