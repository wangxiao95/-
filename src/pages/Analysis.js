import React from 'react'
import {Tabs} from 'antd'

const TabPane = Tabs.TabPane;

export default class Analysis extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    return (
      <div className="analysis fl">
        <Tabs type="card">
          <TabPane tab="DZTB趋势信息" key={1}>

          </TabPane>
        </Tabs>
      </div>
    )
  }
}