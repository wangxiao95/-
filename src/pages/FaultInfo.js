import React from 'react'
import {Tabs} from 'antd'
import emitter from '../scripts/emitter'
import $ from "../scripts/jquery";

const TabPane = Tabs.TabPane;

export default class FaultInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      equipmentName: '设备',
      faultData: [
        // {
        //   alarmStartTime: '2019-09-19',
        //   alarmEndTime: '2019-10-19',
        //   alarmInfo: '原因',
        //   alarmLevel: 1,
        //   value: 'dsfdsf'
        // }
      ],
      remarkData: [
        // {startTime: '2019-09-19', endTime: '2019-10-19', remarkInfo: '标注内容', remarkUuid: 1}
      ]
    }
  }

  render() {
    return (
      <div className="fault-info fl">
        <Tabs type="card" style={{height: '100%', width: '100%'}}>
          <TabPane tab={this.state.equipmentName + '故障信息'} key="1">
            {this.state.faultData.length ? this.state.faultData.map((item, i) => {
              return <div className="info-item" key={i}>
                <span>{item.alarmStartTime}</span>--<span>{item.alarmEndTime}</span>
                <span style={{marginLeft: 10}}>报警值为{item.value}</span>，
                <span>级别为{item.alarmLevel}</span>，
                <span>报警原因为{item.alarmInfo}</span>
              </div>
            }) : <div
              style={{height: '40px', width: '100%', lineHeight: '40px', textAlign: 'center', color: '#fff'}}>无数据</div>}
          </TabPane>
          <TabPane tab={this.state.equipmentName + '标注信息'} key="2">
            {this.state.remarkData.length ? this.state.remarkData.map((item, i) => {
              return <div className="info-item" key={i}>
                <span>{item.startTime}</span>--<span>{item.endTime}</span>
                <span style={{marginLeft: 10}}>标注数据{item.remarkUuid}</span>，
                <span>标注内容为{item.remarkInfo}</span>，
              </div>
            }) : <div
              style={{height: '40px', width: '100%', lineHeight: '40px', textAlign: 'center', color: '#fff'}}>无数据</div>}
          </TabPane>
        </Tabs>
      </div>
    )
  }

  componentDidMount() {
    emitter.on('radioChange', data => {
      this.setState({
        equipmentName: data.equipmentName || '设备'
      })
      this.getFaultData(data)
      this.getRemarkData(data)
    })
    emitter.addListener('itemChange', data => {
      this.setState({
        equipmentName: data.result.equipmentName || '设备'
      })
      this.getFaultData(data.result)
      this.getRemarkData(data.result)
    })
  }

  getFaultData = (data) => {
    let startTime = new Date(`${new Date().getFullYear() - 20}-${new Date().getMonth()}-${new Date().getDay()}`).getTime()
    let endTime = new Date().getTime()
    //设备历史报警事件记录
    $.ajax({url: $.baseURI(`equipment/${data.equipmentUuid}/${startTime}/${endTime}/event`)})
      .then(res => {
        console.log(res.data);
        this.setState({
          faultData: res.data || []
        })
      })
  }
  //获取标注
  getRemarkData = data => {
    $.ajax({url: $.baseURI(`remark?equipmentUuid=${data.equipmentUuid}`)})
      .then(res => {
        console.log(res.data);
        this.setState({
          faultData: res.data || []
        })
      })
  }

}