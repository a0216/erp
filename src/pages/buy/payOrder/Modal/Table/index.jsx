import React, { useState, useEffect, useRef } from 'react';

import { Table, message, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';


const Tables = props => {
    console.log(props)
    const [newArr, setnewArr] = useState([]);
    const sendData = () => {
        let arr=[]
        arr[0]=props.nowMsg
        setnewArr(arr)
    }
    useEffect(() => {
        sendData()
        // console.log(props.nowMsg)
        // setnewArr( newArr.push(props.nowMsg))

        // return () => {
        //     console.log(props.nowMsg)
        // };
    }, []);
    const expandedRowRender = (record) => {
        console.log(record)
        const columns = [
            {
                title: '商品名称', dataIndex: 'skus', key: 'name',
                render: (text) => <span>{text.name}</span>,
            },
            {
                title: '商品编码', dataIndex: 'skus', key: 'name',
                render: (text) => <span>{text.code}</span>,
            },
            {
                title: '接收仓库', dataIndex: 'accept_warehouse', key: 'name',
                render: (text) => <span>{text.name}</span>,

            },
            {
                title: '基准价', dataIndex: 'skus', key: 'name',
                render: (text) => <span>{text.cost_price}</span>,

            },
            {
                title: '零售价', dataIndex: 'skus', key: 'name',
                render: (text) => <span>{text.get_price}</span>,

            },
            {
                title: '商品数量', dataIndex: 'num', key: 'name',

            },
            { title: '已入库数量', dataIndex: 'put_num', key: 'name' },
            {
                title: '单位', dataIndex: 'skus', key: 'name',
                render: (text) => <span>{text.unit}</span>,
            },
            { title: '备注', dataIndex: 'comment', key: 'name' },

        ];
        let data = record.transfer;
        data.map(res => {
            res.key = res.id
            return res
        })
        return <Table columns={columns} dataSource={data} pagination={false} key={data.id} />;
    };


    const columns = [
        {
            title: '采购申请日期',
            dataIndex: 'created_at',
            render: (text) => <span>{text}</span>,
        },
        {
            title: '采购单号',
            dataIndex: 'code',
            render: (text) => <span>{text}</span>,

        },
        {
            title: '供应商',
            dataIndex: 'shop',
            render: (text) => <span>{text.name}</span>,
        },

        {
            title: '制单人',
            dataIndex: 'user',
            render: (text) => <span>{text.name}</span>,
        },


    ];

    return (
        <div >
            <div id="components-table-demo-bordered">
                <Table
                    columns={columns}
                    dataSource={newArr}
                    bordered
                    expandable={{
                        expandedRowRender
                    }}
                >
                </Table>
            </div>
        </div>
    );
}

export default Tables
