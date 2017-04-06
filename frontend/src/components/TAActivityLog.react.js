import React, { Component, PropTypes } from 'react'

import TAActivityLogRow from './TAActivityLogRow.react'

import styles from './../../style/TAActivityLog.less'

class TAActivityLog extends Component {

  static propTypes = {
    // log is an array of objects, where each object has the following properties:
    // TAInfo (with name and id), time,
    // and questionInfo (same as normal questionInfo, containing question, userInfo, location, & classId)
    log: PropTypes.array
  }

  renderLog() {
    return this.props.log.map(rowData => <TAActivityLogRow {...rowData} />)
  }

  render() {
    return (
      <div className={styles.activityLogContainer}>
        {this.renderLog()}
      </div>
    )
  }
}

export default TAActivityLog
