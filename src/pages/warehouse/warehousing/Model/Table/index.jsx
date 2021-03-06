import React, { useContext, useState, useEffect, useRef } from 'react';
import { Table, Input, Select, Popconfirm, Form, InputNumber } from 'antd';
import './index.less'
import { wareSelects } from '../../../../allNeed'

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
      console.log('Save failed:', errInfo);
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
var nowList = []
const limitDecimalsF = (value) => {
  let reg = /^(-)*(\d+)\.(\d\d).*$/; return `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',').replace(reg, '$1$2.$3');
};
const limitDecimalsP = (value) => {
  let reg = /^(-)*(\d+)\.(\d\d).*$/;
  return value.replace(/￥\s?|(,*)/g, '').replace(reg, '$1$2.$3');
};
class EditableTable extends React.Component {
  componentWillMount() {
    wareSelects({ method: "get" }).then(res => {
      if (res.code == '200') {
        res.data.map(item => {
          item.key = item.id;
          return item;
        })
        this.setState({
          wareList: res.data,
        });
      }
    })
  }
  componentWillReceiveProps(props) {
    nowList = props.productList
    this.setState({
      dataSource: nowList,
    });


  }
  constructor(props) {
    super(props);

    this.columns = [
      {
        title: '商品编码',
        dataIndex: 'code',
        // editable: true,
      },
      {
        title: '商品名称',
        dataIndex: 'name',
        // editable: true,
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
        // render: (text) => {
        //   return <InputNumber min={0} step={0.01} value={text}
        //     style={{
        //       width: '100%',
        //     }}
        //     formatter={limitDecimalsF}
        //     parser={limitDecimalsP}
        //   />
        // }
      },
      {
        title: '采购价',
        dataIndex: 'purchasePrice',
        editable: true,
        required: true,
        render: (text) => {
          return <InputNumber min={0} step={0.01} value={text}
            style={{
              width: '100%',
            }}
            formatter={limitDecimalsF}
            parser={limitDecimalsP}
          />
        }

      },
      {
        title: '差额',
        dataIndex: 'reduce',
        // editable: true,
      },
      {
        title: '数量',
        dataIndex: 'num',
        editable: true,
        required: true,
        value: ''
      },
      {
        title: '接收仓库',
        required: true,
        key: 'id',
        render: (text, record) => {
          return <Select
            labelInValue
            placeholder='请选择'
            // value=''
            onSelect={() => this.changeSelects(record)}
            onChange={this.onThis}
          >
            {props.wareList.map(res => {
              return <Option value={res.id} key={res.id} >{res.name}</Option>
            })}
          </Select>
        }
      },
      // editable: true,
      {
        title: '合计',
        dataIndex: 'all',
        // editable: true,
      },
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
    this.state = {
      dataSource: nowList,
      count: 2,
      selectedRowKeys: props.onSelect,
      wareId: '0'
    };

  }
  onThis = e => {
    this.state.wareId = e.key;
  }
  changeSelects = e => {
    let newArr = this.state.dataSource;
    newArr.map(res => {
      if (res.id == e.id) {
        res.warehouseId = this.state.wareId
        return res;
      }
      return newArr
    })

    this.setState({
      dataSource: newArr
    })
  }
  handleDelete = key => {
    const dataSource = [...this.state.dataSource];
    let nows = dataSource.filter(item => item.key !== key)
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
    if (row.purchasePrice) {
      row.purchasePrice = Math.floor(row.purchasePrice * 100) / 100
      row.reduce = (row.purchasePrice * 100 - row.cost_price) / 100;
    }
    if (row.num) {
      row.all = Math.floor(row.purchasePrice * row.num * 100) / 100
    }

    const newData = [...this.state.dataSource];
    const index = newData.findIndex(item => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });
    this.props.toSend(newData)
    this.setState({
      dataSource: newData,
      selectedRowKeys: [],

    });
  };
  onSelectChange = selectedRowKeys => {
    this.setState({ selectedRowKeys });
    this.props.changeSelect(selectedRowKeys)

  };
  render() {
    const { dataSource } = this.state;
    const components = {
      body: {
        row: EditableRow,
        cell: EditableCell,
      },
    };
    const { loading, selectedRowKeys } = this.state;

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

