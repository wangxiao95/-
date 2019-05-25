import React from 'react'
import {Tabs} from 'antd'
import emitter from "../scripts/emitter";
import $ from "../scripts/jquery";
import echarts from "echarts";

const TabPane = Tabs.TabPane;

export default class Analysis extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      equipmentName: '设备',
    }
  }

  render() {
    return (
      <div className="analysis fl">
        <Tabs type="card" style={{width: '100%', height: '100%'}}>
          <TabPane tab={this.state.equipmentName + '趋势信息'} key={1} style={{width: '100%', height: '100%'}}>
            <div id="infoChart" style={{width: '100%', height: '100%'}}></div>
          </TabPane>
        </Tabs>
      </div>
    )
  }

  componentDidMount() {
    this.initChart();
    // emitter.on('radioChange', data => {
    //   this.setState({
    //     equipmentName: data.equipmentName || '设备'
    //   })
    //   this.getUpdateTime(data);
    // })
  }

  //获取设备导入时间equipment/{equipmentUuid}/info
  getUpdateTime = data => {
    $.ajax({url: $.baseURI(`equipment/${data.equipmentUuid}/info`)})
      .then(res => {
        this.getData(data, res.data.updateTime)
      })
  }

  //获取数据
  getData = (data, time) => {
    $.ajax({url: $.baseURI(`equipment/${data.equipmentUuid}/info`)})
      .then(res => {
        this.setState({

        })
        this.initChart();
      })
  }

  //初始化chart
  initChart = () => {
    let myChart = echarts.init(document.getElementById('infoChart'));

    let option = {
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line'
      }]
    };
    myChart.setOption(option);
  }
}