import React, { Component } from 'react'

import styles from './../../style/ClassInfoTitle.less'

class ClassInfoTitle extends Component {

  static propTypes = {
    student: React.PropTypes.string,
    classCode: React.PropTypes.string,
    location: React.PropTypes.string,
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.classCode}>{this.props.classCode}</div>
        <div className={styles.location}>{this.props.location}</div>
        <div className={styles.student}>{this.props.student}</div>
      </div>
    )
  }
}

export default ClassInfoTitle
