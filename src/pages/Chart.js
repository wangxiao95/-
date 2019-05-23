import React from 'react'
import echarts from 'echarts'
import moment from 'moment'
import $ from 'jquery'


export default class Chart extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    let myChart = echarts.init(document.getElementById('myChart'));

    // var oneDay = 24 * 3600 * 1000;
    var base = +new Date(2019, 4, 23);
    var now = +new Date();
    var date = [];

    while(base <= now) {
      base = +new Date(base += 60 * 60 * 1000);
      date.push(moment(base).format("YYYY-MM-DD HH"));
    }
    console.log(JSON.stringify(date));

    var data = [Math.random() * 1000];

    for (var i = 1; i < 200; i++) {
      data.push(Math.round((Math.random() - 0.5) * 20 + data[i - 1]));
    }


    let option = {
      tooltip: {
        trigger: 'axis',
        position: function (pt) {
          return [pt[0], '10%'];
        }
      },
      title: {
        left: 'center',
        text: '趋势分析',
      },
      // toolbox: {
      //   feature: {
      //     dataZoom: {
      //       yAxisIndex: 'none'
      //     },
      //     restore: {},
      //     saveAsImage: {}
      //   }
      // },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: date
      },
      yAxis: [
        {
          type: 'value',
          name: '单位1',
          min: 0,
          max: 1000,
          position: 'left',
          offset: -50,
          boundaryGap: [0, '100%']
        },
        {
          type: 'value',
          name: '测点2',
          min: 0,
          max: 200,
          position: 'left',
          offset: 0,
          boundaryGap: [0, '100%']
        },
        {
          type: 'value',
          name: '单位3',
          min: 0,
          max: 1000,
          position: 'left',
          offset: 50,
          boundaryGap: [0, '100%']
        },
        {
          type: 'value',
          name: '单位4',
          min: 0,
          max: 1000,
          position: 'left',
          offset: 100,
          boundaryGap: [0, '100%']
        },
        {
          type: 'value',
          name: '单位1',
          min: 0,
          max: 1000,
          position: 'right',
          offset: -50,
          boundaryGap: [0, '100%']
        },
        {
          type: 'value',
          name: '测点2',
          min: 0,
          max: 200,
          position: 'right',
          offset: 0,
          boundaryGap: [0, '100%']
        },
        {
          type: 'value',
          name: '单位3',
          min: 0,
          max: 1000,
          position: 'right',
          offset: 50,
          boundaryGap: [0, '100%']
        },
        {
          type: 'value',
          name: '单位4',
          min: 0,
          max: 1000,
          position: 'right',
          offset: 100,
          boundaryGap: [0, '100%']
        },
      ],
      legend: {
        data:['Step Start', 'Step Middle', 'Step End']
      },
      dataZoom: [{
        type: 'inside',
        start: 0,
        end: 10
      }, {
        start: 0,
        end: 10,
        handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
        handleSize: '80%',
        handleStyle: {
          color: '#fff',
          shadowBlur: 3,
          shadowColor: 'rgba(0, 0, 0, 0.6)',
          shadowOffsetX: 2,
          shadowOffsetY: 2
        }
      }],
      series: [
        // {
        //   name:'测点1',
        //   type:'line',
        //   // smooth:true,
        //   // symbol: 'none',
        //   // sampling: 'average',
        //   itemStyle: {
        //     color: 'rgb(255, 70, 131)'
        //   },
        //   // areaStyle: {
        //   //   color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
        //   //     offset: 0,
        //   //     color: 'rgb(255, 158, 68)'
        //   //   }, {
        //   //     offset: 1,
        //   //     color: 'rgb(255, 70, 131)'
        //   //   }])
        //   // },
        //   data: data
        // },
        {
          name:'测点2',
          type:'line',
          yAxisIndex: 1,
          itemStyle: {
            color: 'rgb(255, 70, 131)'
          },
          data: [['2019-05-23 04', 100]]
        }
      ]
    };
    myChart.setOption(option);
  }

  render() {
    return (
      <div className="chart-box fl">
        <div id="myChart"></div>
      </div>
    )
  }
}