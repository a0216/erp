import React, { useState, useEffect, useRef } from 'react';

import { Table, message, Modal, Form, Row, Col, Input } from 'antd';
import styles from './index.less';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { audit } from '../../api'

const FormItem = Form.Item;
const TableBordered = props => {
  const [form] = Form.useForm();

  props.paymentList.map(res => {
    res.key = res.id;
    let time = new Date(res.created_at)
    let d = new Date(time);
    res.created_at = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
    return res;
  })

  const [createModalVisible, handleModalVisible] = useState(false);
  const [nowMsg, changeMsg] = useState();
  const examine = (e) => {
    changeMsg(e)
    handleModalVisible(true)
  }
  const handleAdd = (e) => {
    if (e == '200') {
      return true
    } else {
      return false
    }
  }

  const expandedRowRender = (record) => {
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
        render: (text) => <span>{text.cost_price/100}</span>,

      },
      {
        title: '零售价', dataIndex: 'skus', key: 'name',
        render: (text) => <span>{text.get_price/100}</span>,
      },
      {
        title: '商品数量', dataIndex: 'num', key: 'name',
      },
      {
        title: '审核人', dataIndex: 'audit_user',key: 'audit_user',
        render: (text) => {
          if(text){
           return <span>{text.name}</span>
          }else{
            ''
          }
         
        },
      },
      { title: '审核时间', dataIndex: 'audit_time', key: 'audit_time' },
      { title: '已入库数量', dataIndex: 'put_num', key: 'name' },
      {
        title: '单位', dataIndex: 'skus', key: 'name',
        render: (text) => <span>{text.unit}</span>,
      },
      { title: '备注', dataIndex: 'comment', key: 'name' },
      {
        title: '操作', render: (text, record) => (
          <span> {record.put_num == record.num ?
            ''
            : <a onClick={() => { examine(record); }}>审核</a>}</span>
        ),
      }
    ];
    let data = record.transfer;
    data.map(res => {
      res.key = res.id
      return res
    })
    return <Table columns={columns} dataSource={data} pagination={false}  />;
  };
  useEffect(() => {


  }, []);
  const onCancel = () => {
    handleModalVisible(false)

  }
  const okHandle = async () => {
    const fieldsValue = await form.validateFields();
    // form.resetFields();
    let data = {
      id: nowMsg.id,
      num: fieldsValue.num
    }
    audit({ method: 'post', data: data }).then(res => {
      if (res.code == '200') {
        message.success('审核成功')

      }
      handleAdd(res.code);
      onCancel()
    })
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
    // {
    //   title: '单据类型',
    //   dataIndex: 'category',
    //   render: (text) => <span>{text}</span>,
    // },
    {
      title: '制单人',
      dataIndex: 'user',
      render: (text) => <span>{text.name}</span>,
    },


  ];

  return (
    <div className={styles.container}>
      <div id="components-table-demo-bordered">
        {props.paymentList&&props.paymentList.length>0?
        <Table
          columns={columns}
          dataSource={props.paymentList}
          defaultExpandAllRows={true}
          bordered
          expandable={{
            expandedRowRender
          }}
          title={() => '商品列表'}
          pagination={{
            showSizeChanger: false,//设置每页显示数据条数
            showQuickJumper: false,
            showTotal: () => `共${props.total.total}条`,
            pageSize: props.total.pageSize,
            total: props.total.total,  //数据的总的条数
            defaultCurrent: 1,
            onChange: (current) => { props.actionRef.current( current); props.changePage(current) }, //点击当前页码
          }}
          // footer={() => 'Footer'}

        >
        </Table>:''}
        <Modal
          destroyOnClose
          title="审核"
          visible={createModalVisible}
          onOk={okHandle}
          onCancel={onCancel}
          width={800}
        >
          <Form form={form}>
            <Row>
              <Col lg={24} md={24} sm={24}>
                <FormItem
                  label="数量:"
                  name="num"
                >
                  <Input placeholder="请输入数量"
                    style={{
                      width: 400
                    }}
                  />
                </FormItem>
              </Col>

            </Row>

          </Form>
        </Modal>
        {/* <Model
          nowMsg={nowMsg}
          onSubmit={async value => {
            const success = await handleAdd(value);

            if (success) {
              handleModalVisible(false);

              // if (actionRef.current) {
              //   actionRef.current.reload();
              // }
            }
          }}
          onCancel={() => handleModalVisible(false)}
          modalVisible={createModalVisible}
        /> */}

      </div>
    </div>
  );
}

export default TableBordered
