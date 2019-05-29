import React from 'react'
import {DatePicker, Radio, Select, Tooltip} from 'antd';
import moment from 'moment'
import $ from "../scripts/jquery";
import emitter from '../scripts/emitter'

const Option = Select.Option
// const RadioGroup = Radio.Group;
const {RangePicker} = DatePicker;

let defaultRadioFlag = true; //第一次填写完之后默认选中,选中后不再执行默认选中

export default class OperationSelect extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectRadio: undefined, //默认选中数据
      list: [
        {name: 'aa', dot: 'w'},
        {name: 'aa', dot: 'w'},
        {name: 'aa', dot: 'w'},
        {name: 'aa', dot: 'w'},
      ],
      equipmentList: [
        {label: '设备1', value: '1'},
        {label: '设备2', value: '2'},
      ],
      pointList: [
        [], [], [], []
      ],
      result: [
        {equipmentUuid: '', pointUuid: undefined, startTime: '', endTime: ''},
        {equipmentUuid: '', pointUuid: undefined, startTime: '', endTime: ''},
        {equipmentUuid: '', pointUuid: undefined, startTime: '', endTime: ''},
        {equipmentUuid: '', pointUuid: undefined, startTime: '', endTime: ''},
      ],
      //单选按钮已选择信息
      selectData: {
        equipment: {},
        point: {},
        time: {}
      },
    }
  }

  render() {
    return (
      <div className="operation-box fl">
        <div className="title">
          <span>添加设备</span>
          <span className="add" onClick={this.add}>+</span>
          <span className="min" onClick={this.subtract}>—</span>
        </div>
        <div style={{width: '100%', overflow: 'hidden'}}>
          <Radio.Group style={{width: '100%'}} value={this.state.selectRadio} onChange={val => this.radioChange(val)}>
            {this.state.list.map((item, i) => {
              return <Radio key={i} value={i} style={{width: '100%', marginRight: 0}}>
                <div className="radio-row">
                  <div className="row-item">
                    <Select placeholder="请选择设备"
                            showSearch
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                              option.props.children.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                            style={{width: 'calc(50% - 5px)'}}
                            onChange={(val, option) => {
                              this.handleChange(i, val, option)
                            }}>
                      {this.state.equipmentList.map((option, index) => {
                        return <Option key={index} value={option.equipmentUuid}>
                          <Tooltip placement="rightBottom" title={option.equipmentName}
                                   arrowPointAtCenter>{option.equipmentName}</Tooltip>
                        </Option>
                      })}
                    </Select>
                    <Select value={this.state.result[i].pointUuid} placeholder="请选择测点"
                            showSearch
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                              option.props.children.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                            style={{width: 'calc(50% - 5px)', marginLeft: 5}}
                            onChange={(val, option) => {
                              this.pointChange(i, val, option)
                            }}>
                      {this.state.pointList[i].map((option, index) => {
                        return <Option key={index} option={option} value={option.pointUuid}>
                          <Tooltip placement="rightBottom" title={option.pointName}
                                   arrowPointAtCenter>{option.pointName}</Tooltip>
                        </Option>
                      })}
                    </Select>
                  </div>
                  <div className="row-item">
                    <RangePicker
                      // defaultValue={[moment('2010-01-01 10:09:21', 'YYYY-MM-DD HH:mm:ss'), moment('2019-01-01 10:09:21', 'YYYY-MM-DD HH:mm:ss')]}
                      onChange={(date, str) => this.dateHandle(date, str, i)} style={{width: 'calc(100% - 5px)'}}
                      placeholder={['开始时间', '结束时间']}
                      showTime/>
                  </div>
                </div>
              </Radio>
            })
            }
          </Radio.Group>
        </div>
      </div>
    )
  }

  componentDidMount() {
    console.log(this);
    this.getList();
  }

  //单选按钮
  radioChange = val => {
    let i = val.target.value;
    this.setState({selectRadio: i})
    emitter.emit('radioChange', this.state.result[i]);
  }
  //选择设备框变化
  handleChange = (i, val, option) => {
    console.log(option);
    $.ajax({url: $.baseURI(`point/${val}/detail`)})
      .then(res => {
        this.state.pointList[i] = res.data; //更新测点列表
        this.state.result[i].pointUuid = undefined; //清空已选择测点
        this.state.result[i].equipmentUuid = val;
        this.state.result[i].equipmentName = option.props.children.props.children;
        this.setState({})
      })
  }
  //pointChange选择测点
  pointChange = (i, val, option) => {
    console.log(option);
    this.state.result[i].pointUuid = val;
    this.state.result[i].unit = option.props.option.unit;
    this.state.result[i].pointName = option.props.option.pointName;
    console.log(this.state.result[i]);
    if (this.state.result[i].startTime && this.state.result[i].endTime) {
      // this.setState({ selectRadio: 0 })
      if (defaultRadioFlag) {
        this.radioChange({target: {value: i}})
        defaultRadioFlag = false;
      }
      $.ajax({url: $.baseURI(`trend/${val}/${this.state.result[i].startTime}/${this.state.result[i].endTime}/info`)})
        .then(res => {
          emitter.emit('itemChange', {data: res.data, index: i, result: this.state.result[i]});
        })
    }
    this.setState({})

  }
  //时间框变化
  dateHandle = (date, str, i) => {
    this.state.result[i].startTime = +date[0]._d;
    this.state.result[i].endTime = +date[1]._d;
    if (this.state.result[i].pointUuid) {
      if (defaultRadioFlag) {
        this.radioChange({target: {value: i}})
        defaultRadioFlag = false;
      }
      $.ajax({url: $.baseURI(`trend/${this.state.result[i].pointUuid}/${+date[0]._d}/${+date[1]._d}/info`)})
        .then(res => {
          emitter.emit('itemChange', {data: res.data, index: i, result: this.state.result[i]});
        })
    }
    this.setState({})
  }
  //加号回调
  add = () => {
    this.state.list.push({})
    this.state.pointList.push([])
    this.state.result.push({equipmentUuid: '', pointUuid: '', startTime: '', endTime: ''})
    this.setState({})
  }
  //减号回调
  subtract = () => {
    this.state.list.splice(-1, 1)
    this.state.pointList.splice(-1, 1)
    this.state.result.splice(-1, 1)
    this.setState({})
  }

  getList = async () => {
    $.ajax({
      url: $.baseURI('node/info')
    }).then(res => {
      let nodeId = res.data[0].nodeId
      $.ajax({
        url: $.baseURI('equipment/node/' + nodeId + '/info')
      }).then(res => {
        this.setState({
          equipmentList: res.data
        })
      })
    })
  }
}
