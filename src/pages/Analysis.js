import React from 'react'
import {DatePicker} from 'antd'
import emitter from "../scripts/emitter";
import $ from "../scripts/jquery";
import echarts from "echarts";
import moment from "moment/moment";

export default class Analysis extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      equipmentName: '设备',
      data: {
        startTime: new Date(+new Date() - 30 * 24 * 3600 * 1000),
        endTime: new Date()
      }
    }
  }

  render() {
    return (
      <div className="analysis fl">
        <div className="head">
          <div className="title">{this.state.equipmentName + '趋势信息'}</div>
          <div className="date-box">
            <DatePicker.RangePicker
              ref="datePicker"
              // defaultValue={[moment(new Date(+new Date() - 30 * 24 * 3600 * 1000), 'YYYY-MM-DD HH:mm:ss'), moment(new Date(), 'YYYY-MM-DD HH:mm:ss')]}
              onChange={(date, str) => this.dateHandle(date, str)} style={{width: 'calc(100% - 5px)'}}
              value={[moment(this.state.data.startTime, 'YYYY-MM-DD HH:mm:ss'), moment(this.state.data.endTime, 'YYYY-MM-DD HH:mm:ss')]}
              placeholder={['开始时间', '结束时间']}
              allowClear={false}
              showTime/>
          </div>
        </div>
        <div id="infoChart">

        </div>
      </div>
    )
  }

  componentDidMount() {
    // this.initChart();

    emitter.addListener('radioChange', data => {
      this.state.data = Object.assign({}, data, {
        startTime: new Date(+new Date() - 30 * 24 * 3600 * 1000),
        endTime: new Date()
      });
      this.setState({
        equipmentName: data.equipmentName || '设备',
      })
      this.getData();
    })
    // emitter.addListener('itemChange', data => {
    //   this.state.data = Object.assign({}, data.result, {
    //     startTime: new Date(+new Date() - 30 * 24 * 3600 * 1000),
    //     endTime: new Date()
    //   });
    //   this.setState({
    //     equipmentName: data.result.equipmentName || '设备',
    //   })
    //   this.getData();
    // })
  }

  //获取设备导入时间equipment/{equipmentUuid}/info
  // getUpdateTime = data => {
  //   $.ajax({url: $.baseURI(`equipment/${data.equipmentUuid}/info`)})
  //     .then(res => {
  //       this.getData(data, res.data.updateTime)
  //     })
  // }

  //获取数据
  getData = () => {
    console.log(this.state);
    $.ajax({url: $.baseURI(`trend/${this.state.data.pointUuid}/${+this.state.data.startTime}/${+this.state.data.endTime}/info`)})
      .then(res => {
        let [xAxis, arr] = [[], []];
        res.data.trendInfo.map(item => {
          xAxis.push(item.trendTime)
          arr.push(item.trendValue.all);
        })
        this.initChart(xAxis, arr, this.state.data);
      })
  }

  dateHandle = (date, str) => {
    this.state.data = Object.assign({}, this.state.data, {
      startTime: date[0],
      endTime: date[1]
    })
    this.setState({})
    if (this.state.equipmentName !== '设备') {
      this.getData();
    }

  }
  //初始化chart
  initChart = (xAxis, arr, data) => {

    let myChart = echarts.init(document.getElementById('infoChart'));

    let option = {
      tooltip: {
        confine: true,
        trigger: 'axis',
        position: function (pt) {
          return [pt[0], '10%'];
        }
      },
      textStyle: {
        color: "#fff",
      },
      lineStyle: {
        color: "#FF0000",
      },
      xAxis: {
        lineStyle: {
          color: '#fff'
        },
        axisLine: {
          lineStyle: {
            color: "#fff"
          }
        },
        // type: 'value',
        data: xAxis
      },
      yAxis: {
        textStyle: {
          color: '#fff'
        },
        axisLine: {
          lineStyle: {
            color: '#fff'
          }
        },
        name: data.unit,
        type: 'value'
      },
      series: [{
        data: arr,
        type: 'line'
      }]
    };

    myChart.setOption(option);
  }
}