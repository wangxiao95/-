import React from 'react'
import {Radio, Select, DatePicker} from 'antd';
import $ from "../scripts/jquery";

const Option = Select.Option
const RadioGroup = Radio.Group;
const {MonthPicker, RangePicker, WeekPicker} = DatePicker;

export default class OperationSelect extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
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
        {equipmentUuid: '', pointUuid: '', startTime: '', endTime: ''},
        {equipmentUuid: '', pointUuid: '', startTime: '', endTime: ''},
        {equipmentUuid: '', pointUuid: '', startTime: '', endTime: ''},
        {equipmentUuid: '', pointUuid: '', startTime: '', endTime: ''},
      ],
      selectData: [], //单选按钮已选择设备的报警信息
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
          <RadioGroup style={{width: '100%'}} onChange={val => this.radioChange(val)}>
            {this.state.list.map((item, i) => {
              return <Radio key={i} value={i} style={{width: '100%', marginRight: 0}}>
                <div className="radio-row">
                  <div className="row-item">
                    <Select placeholder="请选择设备"
                            showSearch
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                              option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                            style={{width: 'calc(50% - 5px)'}}
                            onChange={val => {
                              this.handleChange(i, val)
                            }}>
                      {this.state.equipmentList.map((option, index) => {
                        return <Option key={index} value={option.equipmentUuid}>{option.equipmentName}</Option>
                      })}
                    </Select>
                    <Select placeholder="请选择测点" style={{width: 'calc(50% - 5px)', marginLeft: 5}} onChange={val => {
                      this.pointChange(i, val)
                    }}>
                      {this.state.pointList[i].map((option, index) => {
                        return <Option key={index} value={option.pointUuid}>{option.pointName}</Option>
                      })}
                    </Select>
                  </div>
                  <div className="row-item">
                    <RangePicker onChange={(date, str) => this.dateHandle(date, str, i)} style={{width: 'calc(100% - 5px)'}}
                                 placeholder={['开始时间', '结束时间']}
                                 showTime/>
                  </div>
                </div>
              </Radio>
            })
            }
          </RadioGroup>
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
    console.log(val.target.value);
    let i = val.target.value;
    $.ajax({url: $.baseURI(`equipment/${this.state.result[i].equipmentUuid}/${this.state.result[i].startTime}/${this.state.result[i].endTime}/event`)})
      .then(res => {
        console.log(res.data);
      })

  }
  //选择设备框变化
  handleChange = (i, val) => {
    $.ajax({url: $.baseURI(`point/${val}/detail`)})
      .then(res => {
        this.state.pointList[i] = res.data;
        this.state.result[i].equipmentUuid = val;
        this.setState({})
      })
  }
  //pointChange选择测点
  pointChange = (i, val) => {
    this.state.result[i].pointUuid = val;
    this.setState({})
    $.ajax({url: $.baseURI(`trend/${val}/${this.state.result[i].startTime}/${this.state.result[i].endTime}/info`)})
      .then(res => {

      })
  }
  //时间框变化
  dateHandle = (date, str, i) => {
    this.state.result[i].startTime = +date[0]._d;
    this.state.result[i].endTime = +date[1]._d;
    this.setState({});
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
