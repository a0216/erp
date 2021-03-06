import React, { useContext, useState, useEffect, useRef } from 'react';
import { Table, Input, Button, Popconfirm, Form, InputNumber } from 'antd';
import './index.less'
const EditableContext = React.createContext();

const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef();
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };

  const save = async e => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
        <div
          className="editable-cell-value-wrap"
          style={{
            paddingRight: 24,
          }}
          onClick={toggleEdit}
        >
          {children}
        </div>
      );
  }

  return <td {...restProps}>{childNode}</td>;
};
const limitDecimalsF =(value)=>{
  let reg = /^(-)*(\d+)\.(\d\d).*$/;return `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',').replace(reg,'$1$2.$3');
};
const limitDecimalsP =(value)=>{
  let reg = /^(-)*(\d+)\.(\d\d).*$/;
  return value.replace(/￥\s?|(,*)/g, '').replace(reg,'$1$2.$3');
};
class EditableTable extends React.Component {
  constructor(props) {
    super(props);

    const changeNum = (value) => {
      console.log(value)
  
    }
    this.columns = [
      {
        title: '商品编码',
        dataIndex: 'code',
        editable: true,
      },
      {
        title: '商品名称',
        dataIndex: 'name',
        editable: true,
      },
      {
        title: '颜色',
        dataIndex: 'color',
        editable: true,

      },
      {
        title: '基准价',
        dataIndex: 'cost_price',
        editable: true,
        render: (text) => {
          return <InputNumber min={0} step={0.01} value={text} 
          style={{
            width:'100%',
          }}
          formatter={limitDecimalsF}
          parser={limitDecimalsP} 
          />
        }
      },
      {
        title: '零售价',
        dataIndex: 'get_price',
        editable: true,
        render: (text) => {
          return <InputNumber min={0} step={0.01} value={text}
          style={{
            width:'100%',
          }}
          formatter={limitDecimalsF}
          parser={limitDecimalsP} 
          />
        }
      },
      {
        title: '促销价',
        dataIndex: 'sale_price',
        editable: true,
        render: (text) => {
          return <InputNumber min={0} step={0.01} value={text}
          style={{
            width:'100%',
          }}
          formatter={limitDecimalsF}
          parser={limitDecimalsP} 
           />
        }
      },
      // {
      //   title: '京东skuid',
      //   dataIndex: 'jd_sku_id',
      //   editable: true,
      // },
      {
        title: '备注',
        dataIndex: 'comment',
        editable: true,
      },

      {
        title: '操作',
        dataIndex: 'operation',
        render: (text, record) =>
          this.state.dataSource.length >= 1 ? (
            <Popconfirm title="确定删除吗？" onConfirm={() => this.handleDelete(record.key)}>
              <a>删除</a>
            </Popconfirm>
          ) : null,
      },
    ];
    if (props.type == '2') {
      props.sendList.map(res => {
        res.cost_price = res.cost_price / 100;
        res.sale_price = res.sale_price / 100;
        res.get_price = res.get_price / 100;
        return res;
      })
      this.state = {
        dataSource: props.sendList,
        count: 2,
        change: props.changeList
      };
      props.changeList(this.state.dataSource)
    } else {
      this.state = {
        dataSource: props.addList,
        count: 2,
        change: props.changeList
      };
    }
  }
  handleDelete = key => {
    const dataSource = [...this.state.dataSource];
    this.setState({
      dataSource: dataSource.filter(item => item.key !== key),
    });
  };

  handleAdd = () => {
    const { count, dataSource } = this.state;
    const newData = {
      key: count,

    };
    this.setState({
      dataSource: [...dataSource, newData],
      count: count + 1,
    });
  };

  handleSave = row => {
    // console.log(row)
    if(row.cost_price){
      row.cost_price=Math.floor((row.cost_price*100))/100
    }
    if(row.get_price){
      row.get_price=Math.floor((row.get_price*100))/100
    }
    if(row.sale_price){
      row.sale_price=Math.floor((row.sale_price*100))/100
    }
    const newData = [...this.state.dataSource];
    const index = newData.findIndex(item => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });
    this.props.changeList(newData)
    this.setState({
      dataSource: newData,
    });
  };

  render() {
    const { dataSource } = this.state;
    const components = {
      body: {
        row: EditableRow,
        cell: EditableCell,
      },
    };
    const columns = this.columns.map(col => {
      if (!col.editable) {
        return col;
      }

      return {
        ...col,
        onCell: record => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave,
        }),
      };
    });
    return (
      <div>
        <Button
          onClick={this.handleAdd}
          type="primary"
          style={{
            marginBottom: 16,
          }}
        >
          添加商品
        </Button>
        <Table
          components={components}
          rowClassName={() => 'editable-row'}
          bordered
          dataSource={dataSource}
          columns={columns}
        />
      </div>
    );
  }
}

// ReactDOM.render(<EditableTable />, mountNode);
export default EditableTable

