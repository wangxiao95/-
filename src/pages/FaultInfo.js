import React from 'react'
import {Tabs} from 'antd'

const TabPane = Tabs.TabPane;

export default class FaultInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    return (
      <div className="fault-info fl">
        <Tabs type="card">
          <TabPane tab="DZTB故障信息" key={1}>
11
          </TabPane>
          <TabPane tab="DZTB标注信息" key={2}>
22
          </TabPane>
        </Tabs>
      </div>
    )
  }
}