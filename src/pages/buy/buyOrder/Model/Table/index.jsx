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
  const [wareId, changeWare] = useState();

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
      // console.log('Save failed:', errInfo);
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
var upList = []
const limitDecimalsF = (value) => {
  let reg = /^(-)*(\d+)\.(\d\d).*$/; return `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',').replace(reg, '$1$2.$3');
};
const limitDecimalsP = (value) => {
  let reg = /^(-)*(\d+)\.(\d\d).*$/;
  return value.replace(/￥\s?|(,*)/g, '').replace(reg, '$1$2.$3');
};
var arrs = []
class EditableTable extends React.Component {
  componentWillReceiveProps(props) {
    this.setState({
      wareList: props.wareList,
    });
    let product = JSON.stringify(props.productList)
    nowList = JSON.parse(product).map(res => {
      res.key = res.id;
      res.warehouseId = '0'
      return res;
    })
    let upsList = JSON.stringify(props.upList)
    upList = JSON.parse(upsList).map(res => {
      res.code = res.skus.code;
      res.name = res.skus.name;
      res.color = res.skus.color;
      res.get_price = res.skus.get_price;
      res.cost_price = res.skus.cost_price;
      res.sku_id = res.skus.id;
      res.key = res.id;
      return res;
    })

    if (props.type == '2') {
      if (props.productList.length > 0) {
        props.productList.map(res => {
          // res.sku_id=res.id;
          return res;
        })
        var newArr = upList.concat(props.productList);

        this.setState({
          dataSource: newArr,
        });

      } else {
        this.setState({
          dataSource: upList,
        });
      }
    } else {
      this.setState({
        dataSource: nowList,
      });
    }
  }
  constructor(props) {
    super(props);
    this.setState({
      wareList: props.wareList,
    });
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
        // editable: true,
      },
      {
        title: '采购价',
        dataIndex: 'purchasePrice',
        editable: true,
        required: true,
        render: (text) => {
          return <InputNumber min={0} step={0.01} value={text}
            formatter={limitDecimalsF}
            style={{ width: '100%' }}
            parser={limitDecimalsP}
          />
        }

      },
      {
        title: '拍单价',
        dataIndex: 'bidPrice',
        editable: true,
        required: true,
        render: (text) => {
          return <InputNumber min={0} step={0.01} value={text}
            formatter={limitDecimalsF}
            style={{ width: '100%' }}
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
        render: (text) => {
          return <InputNumber min={0} value={text}
            style={{ width: '100%' }}
          />
        }

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
            onSelect={(e) => this.changeSelects(record, e)}
            onChange={this.onThis}
            showSearch
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {this.state.wareList ? this.state.wareList.map(res => {
              return <Option value={res.id} key={res.id} >{res.name}</Option>
            }) : ''}
          </Select>
        }
      },
      // editable: true,
      {
        title: '补差合计',
        dataIndex: 'reduceAll',
        // editable: true,
      },
      {
        title: '采购合计',
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
  // componentDidUpdate(prevProps,prevState){
  //   prevState.dataSource.map(res=>{
  //     if(res.warehouseId!='0'){
  //       this.setState({
  //         dataSource: prevState.dataSource
  //       })
  //       this.props.toSend(prevState.dataSource)
  //     }
  //   })
  // }
  changeSelects = (record, e) => {
   
    let arr= JSON.stringify(this.state.dataSource);

    let newArr = JSON.parse(arr);
    newArr.map(res => {
      if(res.id==record.id){
        res.warehouseId=e.value;
        return res
      }

    })
    this.setState({
      dataSource: newArr
    })
    this.props.toSend(this.state.dataSource)

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
    if (row.bidPrice && row.purchasePrice) {
      row.bidPrice = Math.floor(row.bidPrice * 100) / 100
      row.purchasePrice = Math.floor(row.purchasePrice * 100) / 100
    }
    if (row.purchasePrice) {
      row.reduce = Math.floor(row.purchasePrice * 100 - row.cost_price) / 100;
      // console.log()
    }
    if (row.num) {
      row.all = Math.floor(row.purchasePrice * row.num * 100) / 100
      row.reduceAll = Math.floor(row.bidPrice - row.purchasePrice) * row.num;
    }
    const newData = [...this.state.dataSource];
    const index = newData.findIndex(item => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });
    let arr = JSON.stringify(arrs)
    this.props.toSend(JSON.parse(arr))
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
    arrs = dataSource
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
          arrs: dataSource,
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
          scroll={{ x: 1500 }}
        />
      </div>
    );
  }
}

// ReactDOM.render(<EditableTable />, mountNode);
export default EditableTable

