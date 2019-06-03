import React from 'react'
import echarts from 'echarts'
import emitter from "../scripts/emitter";


const colors = ['#FF0000', '#03d536', '#ff00fa', '#FFFA00', '#D57103', '#8600FF', '#00FAFF', '#C0FF00']

export default class Chart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      //渲染数据
      source: [
        {
          name: '',
          type: 'line',
          data: []
        }
      ],
      //各个设备的时间轴
      xList: [
        []
      ],
      xAxis: [1970, 2019],
      yAxis: [{
        type: 'value',
        textStyle: {
          color: '#fff'
        },
        axisLine: {
          lineStyle: {
            color: '#fff'
          }
        },
      }],
    }
  }
  componentDidMount() {
    this.initChart();
    emitter.addListener('itemChange', data => {
      this.getData(data)
    });

  }

  render() {
    return (
      <div className="chart-box fl">
        <div id="myChart"></div>
      </div>
    )
  }

  getData = data => {
    let [index, arr, isUnit] = [data.index, [], false];
    this.state.xAxis = [];
    this.state.source[index] = [];
    this.state.xList[index] = [];

    this.state.yAxis.map((item, i) => {
      if (item.name === data.result.unit) {
        isUnit = i;
      }
    })

    // if (isUnit === false) {
    if (true) {
      this.state.yAxis[index] = {
        type: 'value',
        name: data.result.unit,
        textStyle: {
          color: '#fff'
        },
        axisLine: {
          lineStyle: {
            color: '#fff'
          }
        },
        // min: 0,
        // max: 1000,
        position: index <= 3 ? 'left' : 'right',
        offset: index <= 3 ? index * 40 : (index - 4) * 40,
        boundaryGap: [0, '100%']
      }
    }

    data.data.trendInfo.map(item => {
      this.state.xList[index].push(item.trendTime);
      arr.push(item.trendValue.all);
      this.state.source[index] = {
        name: data.result.equipmentName + '(' + data.result.pointName + ')',
        type: 'line',
        // yAxisIndex: isUnit ? isUnit : this.state.yAxis.length - 1,
        yAxisIndex: index,
        itemStyle: {
          color: colors[index]
        },
        lineStyle: {
          color: colors[index]
        },
        data: arr
      }
    })

    this.state.xList.map(item => {
      this.state.xAxis.push(...item);
    })
    this.state.xAxis.sort();
    this.setState({});
    console.log(this.state);
    this.initChart();
  }
  initChart = () => {
    let myChart = echarts.init(document.getElementById('myChart'));

    // var oneDay = 24 * 3600 * 1000;
    // var base = +new Date(2019, 4, 23);
    // var now = +new Date();
    // var date = [];
    //
    // while(base <= now) {
    //   base = +new Date(base += 60 * 60 * 1000);
    //   date.push(moment(base).format("YYYY-MM-DD HH"));
    // }
    // console.log(JSON.stringify(date));
    //
    // var data = [Math.random() * 1000];
    //
    // for (var i = 1; i < 200; i++) {
    //   data.push(Math.round((Math.random() - 0.5) * 20 + data[i - 1]));
    // }


    let option = {
      tooltip: {
        confine: true,
        trigger: 'axis',
        position: function (pt) {
          return [pt[0], '10%'];
        }
      },
      grid: {
        top: '20%',
        left: this.getOffsetLeft(),
        // right: '10%'
        right: this.getOffsetRight()
      },
      title: {
        left: 'center',
        text: '趋势分析',
        textStyle: {
          color: "#fff",
          // fontSize: 14,
        }
      },
      textStyle: {
        color: "#fff",
      },
      lineStyle: {
        color: "#fff",
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
        // type: 'category',
        // boundaryGap: false,
        data: this.state.xAxis
      },
      yAxis: this.state.yAxis,
      legend: {
        textStyle: {
          color: "#fff",
        },
        left: 0,
        top: 30,
        data: this.state.source.map(item => {
          return item.name;
        })
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
        textStyle: {
          color: '#fff'
        },
        handleStyle: {
          color: '#fff',
          shadowBlur: 3,
          shadowColor: 'rgba(0, 0, 0, 0.6)',
          shadowOffsetX: 2,
          shadowOffsetY: 2
        }
      }],
      series: this.state.source
    };
    myChart.setOption(option);
  }

  getOffsetLeft = () => {
    let len = this.state.yAxis.length;
    // if (len > 4) return '20%';
    switch (len) {
      case 1:
        return '40';
      case 2:
        return '80';
      case 3:
        return '120';
      case 4:
        return '160';
      default:
        return '160';

    }
  }
  getOffsetRight = () => {
    let len = this.state.yAxis.length;
    if (len > 8) return '20%';
    switch (len) {
      case 5:
        return '40';
      case 6:
        return '80';
      case 7:
        return '120';
      case 8:
        return '160';
      default:
        return '5%';

    }
  }
}