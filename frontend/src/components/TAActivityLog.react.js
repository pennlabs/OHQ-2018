import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import TAActivityLogRow from './TAActivityLogRow.react'

import styles from './../../style/TAActivityLog.less'

class TAActivityLog extends Component {

  static propTypes = {
    // log is an array of TALogInfo
    log: PropTypes.array
  }

  renderLog() {
    return this.props.log.map(rowData => <TAActivityLogRow {...rowData} />)
  }

  render() {
    return (
      <div className={styles.activityLogContainer}>
        This is the TA Log
        {this.renderLog()}
      </div>
    )
  }
}

function mapStateToProps({ classes: { TAActivityLog: log } }) {
  return { log }
}

export default TAActivityLog
