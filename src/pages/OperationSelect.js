import React from 'react'
import {Radio, Select, DatePicker} from 'antd';

const Option = Select.Option
const RadioGroup = Radio.Group;
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

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
      dotList: [
        {label: '温度', value: '1'},
        {label: '风力', value: '2'},
      ]
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
            <RadioGroup value={0} style={{width: '100%'}}>
              {this.state.list.map((item, i) => {
                return <Radio key={i} className="row-item" value={i}>
                    <Select placeholder="请选择设备" style={{width: 120}} onChange={val => {
                      this.handleChange(i, val)
                    }}>
                      {this.state.equipmentList.map((option, index) => {
                        return <Option key={index} value={option.value}>{option.label}</Option>
                      })}
                    </Select>
                    <Select placeholder="请选择测点" style={{width: 120, marginLeft: 5}} onChange={val => {
                      this.handleChange(i, val)
                    }}>
                      {this.state.dotList.map((option, index) => {
                        return <Option key={index} value={option.value}>{option.label}</Option>
                      })}
                    </Select>
                    <RangePicker onChange={this.dateHandle} style={{marginLeft: 15}} placeholder={['开始时间', '结束时间']} showTime/>
                  </Radio>
                })
              }
            </RadioGroup>
          </div>
        </div>
    )
  }
  //选择框变化
  handleChange = (i, val) => {
    console.log(i, val);
    this.state.list.map((item, idx) => {
      if(idx === i) {
        item.name = val;
      }
    })
    this.setState({});
    console.log(this.state);
  }
  //时间框变化
  dateHandle = (date, str) => {
    console.log(str);
  }
  //加号回调
  add = () => {
    this.state.list.push({})
    this.setState({})
  }
  //减号回调
  subtract = () => {
    this.state.list.splice(-1, 1)
    this.setState({})
  }
}