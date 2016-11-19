import React, { Component } from 'react'

import styles from './../../style/classinfotitle.scss'

class ClassInfoTitle extends Component {

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.classCode}>{this.props.classCode}</div>
        <div className={styles.location}>{this.props.location}</div>
        <div className={styles.teacher}>{this.props.teacher}</div>
      </div>
    )
  }
}

ClassInfoTitle.propTypes = {
  teacher: React.PropTypes.string,
  classCode: React.PropTypes.string,
  location: React.PropTypes.string,
}

export default ClassInfoTitle
