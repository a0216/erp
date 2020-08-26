import React, { useState, useEffect } from 'react';
import { Form, Modal, Select, Table, message } from 'antd';
const { Option } = Select;
// import {productList} from '../../../api'

const FormItem = Form.Item;
const Models = props => {
    const [form] = Form.useForm();
    const { modalVisible, product, onSubmit: handleAdds, onCancel, onCheckAllChange, onChanges } = props;
    const [nowList, changeNowlist] = useState([])
    useEffect(() => {
        props.changeList(props.product.map(res => {
            res.key = res.id;
            return res;
        }))
    }, [])
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
    let selecList = []

    const onSelectChange = selectedRowKeys => {
        setselectedRowKeys(selectedRowKeys)
        props.product.map(res => {
            selectedRowKeys.map(item => {
                if (res.id == item) {
                    selecList.push(res)
                    changeNowlist(selecList)
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
        // props.changeList(nowList)
        //  console.log(selecList)
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
            <Table
                columns={columns}
                dataSource={props.product}
                rowSelection={rowSelection}
                bordered
                title={() => '商品列表'}
                footer={() => 'Footer'}
            />
        </Modal>
    );
};

export default Models;
