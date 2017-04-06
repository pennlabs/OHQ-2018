import React, { Component, PropTypes } from 'react'

import styles from './../../style/TAActivityLogRow.less'

class TAActivityLogRow extends Component {

  static propTypes = {
    // the same as the regular questionInfo, containing question, location, userInfo, classId.
    questionInfo: PropTypes.object,
    // the time when the TA accepted the question
    time: PropTypes.string,
    // contains the TA id, and the TA firstName and lastName
    TAInfo: PropTypes.object,
  }

  render() {
    return (
      <div>

      </div>
    )
  }
}

export default TAActivityLogRow
