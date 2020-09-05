import React, { useState, useEffect } from 'react';
import { Form, Modal, Select, Table, Row, Col, Input, Button } from 'antd';
const { Option } = Select;
import { productList } from '../../../api'
const FormItem = Form.Item;
var selecList = []
const Models = props => {
    console.log(props)
    const [form] = Form.useForm();
    const { modalVisible, getData, onSubmit: handleAdds, onCancel } = props;
    const [nowList, changeNowlist] = useState([])
    const [nowMsg, changeMsg] = useState({})
    const [products, changeproduct] = useState([])
    // const getData = (page) => {
    //     productList(`?page=${page}`).then((res) => {
    //         if (res) {
    //             if (res.code == '200') {
    //                 changeMsg(res.data);
    //                 changeproduct(res.data.data.map(item => {
    //                     item.key = item.id;
    //                     return item;
    //                 }))
    //             }
    //         }
    //     })
    // }
    const search = async () => {
        const fieldsValue = await form.validateFields();
        let code = fieldsValue.code;
        console.log(code)
        props.getData('1', code)
    }
    useEffect(() => {
        console.log(products)
   
    }, [products])
  
    const columns = [
        {
            title: '商品编码 ',
            dataIndex: 'code',
            render: text => <span>{text}</span>,
        },
        {
            title: '商品名称',
            dataIndex: 'name',
        },
        {
            title: '颜色',
            dataIndex: 'color',
        },
        {
            title: '基准价',
            dataIndex: 'cost_price',
            render: (text) => {
                return <span>{text / 100}</span>
            }
        },
        {
            title: '备注',
            dataIndex: 'comment',
        },
    ];
    const [selectedRowKeys, setselectedRowKeys] = useState([]);
    const onSelectChange = selectedRowKeys => {
        setselectedRowKeys(selectedRowKeys)
        products.map(res => {
            selectedRowKeys.map(item => {
                if (res.id == item) {
                    selecList.push(res)
                    function unique(arr) {
                        return arr.filter(function (item, index) {
                            return arr.indexOf(item, 0) === index;
                        });
                    }
                    changeNowlist(unique(selecList))
                    return selecList
                }
            })
        })
    };
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const okHandle = async () => {
        selecList = []
        handleAdds(nowList);
        onCancel()
    };

    return (
        <Modal
            destroyOnClose
            title="采购"
            visible={modalVisible}
            onOk={okHandle}
            onCancel={onCancel}
            width={800}
        >
            <Form form={form}>
                <Row>
                    <Col lg={10} md={10} sm={24}>
                        <FormItem
                            label="商品编码:"
                            name="code"
                        >
                            <Input
                                placeholder='请输入商品编码'
                                style={{
                                    width: 200,
                                }}
                            />
                        </FormItem>
                    </Col>
                    <Col lg={4} md={4} sm={24}>
                        <Button type="primary" shape="" onClick={search}>
                            搜索
                        </Button>

                    </Col>
                </Row>
            </Form>
            <Table
                columns={columns}
                dataSource={props.product}
                rowSelection={rowSelection}
                bordered
                type={"1"}
                title={() => '商品列表'}
                pagination={{
                    showSizeChanger: false,//设置每页显示数据条数
                    showQuickJumper: false,
                    showTotal: () => `共${nowMsg.total}条`,
                    pageSize: nowMsg.pageSize,
                    total: nowMsg.total,  //数据的总的条数
                    defaultCurrent: 1,
                    onChange: (current) => { getData(current); }, //点击当前页码
                }}
            />
        </Modal>
    );
};

export default Models;
