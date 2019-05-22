import React from 'react';
import OperationSelect from './OperationSelect'
import Chart from './Chart'
import FaultInfo from './FaultInfo'
import Analysis from './Analysis'

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      text: 'fdsf'
    }
  }

  render() {
    return (
      <div className="container fix">
        <OperationSelect></OperationSelect>
        <Chart></Chart>
        <FaultInfo></FaultInfo>
        <Analysis></Analysis>
      </div>
    )
  }

  btnHandle = () => {
    console.log(this);
    this.setState({
      text: '我变了'
    })
  }
}

export default Home