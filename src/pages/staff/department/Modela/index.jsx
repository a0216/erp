import React, { useState, useEffect } from 'react';
import { Form, Input, Modal, Select, Row, Col, Checkbox, notification } from 'antd';
// import Table from '../Table'
import { roleList, sendRole, changeRole } from '../../api'


const { Option } = Select

const FormItem = Form.Item;
const Model = props => {
    const [form] = Form.useForm();
    const { modalVisible, nowList, list, onSubmit: handleAdd, onCancel, onCheckAllChange, onChanges } = props;
    const [lists, getRole] = useState([])
    const [sendList,changeList]=useState([])
    // const [nowIds, changeId] = useState()
    let nowIds=''
    if (props.type == '2') {
        form.setFieldsValue({
            'roleName': props.nowId
        })
        let arr = []
        // let nowIds=''
        props.list.map(item => {
            item.key=item.id;
            item.roles.map(res => {
                if (res.name == props.nowId) {
                    res.key=res.id;
                    nowIds=res.id
                    // changeId(res.id)
                    arr.push(res.permissions.map(ids => {
                        return ids.permission_id;
                    }))
                }
            })
        })
        let data = lists.map(item => {
            if (item.permissions.length) {
                item.permissions.map(items => {
                    for (let i in arr[0]) {
                        if (items.id == arr[0][i]) {
                            item.key=item.id;
                            items.isCheck = true;
                            return items
                        }
                    }

                    return item;
                })
                let result = item.permissions.every(res => {
                    if (res.isCheck) {
                        return true
                    }
                })
                item.allIn = result;
            }

        })
        // getRole(data)
    }
    // nowValue
    const changeAll = (e) => {
        let data = lists.map(item => {
            if (e.target.value == item.id) {
                item.permissions.map(res => {
                    res.isCheck = e.target.checked
                    return res
                })
                item.allIn = e.target.checked;
            }
            return item
        });
        getRole(data)
    }

    const changes = (e) => {
        let data = lists.map(item => {
            item.permissions.map(res => {
                if (e.target.value == res.id) {
                    res.isCheck = e.target.checked;
                    return res;
                }

            })
            if (item.permissions.length > 0) {
                let result = item.permissions.every(res => {
                    if (res.isCheck) {
                        return true
                    }
                })
                item.allIn = result;
            }

            return item;
        })
        getRole(data)
    }

    useEffect(() => {
        roleList({ method: "GET" }).then(res => {
            if (res.code == '200') {
                let data = res.data.map(item => {
                    item.permissions.map(ress => {
                        ress.key = ress.id
                        ress.isCheck = false;
                        return ress;
                    })
                    item.key = item.id;
                    item.allIn = false;
                    return item;
                })
                getRole(data)

            }
        })

    }, [])
    const okHandle = async () => {
        const fieldsValue = await form.validateFields();
        form.resetFields();

        let permission = []
        lists.map(item => {
            item.permissions.map(res => {
                console.log(res)
                if (res.isCheck==true) {
                    changeList(permission.push(res.id))
                    return permission;
                }
            })
        })
        let formData = new FormData();
        let data = { name: fieldsValue.roleName, permission: JSON.parse(JSON.stringify(permission)), did: props.nowId }
        formData.append("name", fieldsValue.roleName)
        formData.append("permission", JSON.stringify(permission))
        if (props.type == '1') {
            formData.append("did", props.nowId);
            sendRole({ method: "POST", data: formData }).then(res => {
                if (res.code == '200') {
                    onCancel(fieldsValue)
                    handleAdd(res.code)
                } else {
                    notification.open({
                        message: `${res.message}`,
                    });
                }
            })
        } else {
            formData.append("rid", nowIds);
            changeRole({ method: "POST", data: formData }).then(res => {
                if (res.code == '200') {
                    onCancel(fieldsValue)
                    handleAdd(res.code)

                } else {
                    notification.open({
                        message: `${res.message}`,
                    });
                }
            })
        }


    };

    return (
        <Modal
            destroyOnClose
            title="权限管理单"
            visible={modalVisible}
            onOk={okHandle}
            onCancel={onCancel}
            width={1140}
        // state={state}
        >
            <Form form={form}
                initialValues={nowList}
            >
                <Row>
                    <Col lg={10} md={10} sm={24}>
                        <FormItem
                            label="职位名称"
                            name="roleName"
                            key="roleName"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入职位名称',
                                },
                            ]}
                        >
                            <Input placeholder="请输入职位名称"
                                style={{
                                    width: 200,
                                }}
                            />
                        </FormItem>
                    </Col>
                    <Col lg={10} md={10} sm={24}>
                        <FormItem
                            label="备注"
                            name="remake"
                        >
                            <Input placeholder="请输入备注"
                                style={{
                                    width: 200,
                                }}
                            />

                        </FormItem>
                    </Col>

                </Row>
            </Form>
            <div>
                {lists.map(item => {
                    return <div  >
                        <br />
                        <div className="site-checkbox-all-wrapper">
                            <Checkbox
                                indeterminate={item.allIn}
                                onChange={changeAll}
                                defaultChecked={item.allIn}
                                key={item.id}
                                value={item.id}
                            >
                                {item.name}
                            </Checkbox>
                        </div>
                        <br />
                        {item.permissions.map(res => {
                            return <Checkbox value={res.id} defaultChecked={res.isCheck} key={res.id} onChange={changes}>
                                {res.name}
                            </Checkbox>
                        })}
                    </div>


                })}
                {/* {checks} */}

            </div>
            {/* <Table /> */}
        </Modal>
    );
};


export default Model;
