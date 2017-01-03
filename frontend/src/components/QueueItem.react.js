import React, { Component } from 'react'

import styles from './../../style/QueueItem.scss'

class QueueItem extends Component {

  getBoxClassName() {
    let className = styles.box

    if (this.props.isFirst) {
      className = `${className} ${styles.isFirst}`
    }
    if (this.props.isTAForCurrentClass) {
      className = `${className} ${styles.isTAForCurrentClass}`
      //early return because we don't want other styles being applied for TAs
      return className
    }
    if (this.props.isUser) {
      className = `${className} ${styles.isUser}`
    }
    if (this.props.isLast) {
      className = `${className} ${styles.isLast}`
    }
    return className
  }

  render() {
    return (
      <div className={this.getBoxClassName()}>
        {this.props.name}
      </div>
    )
  }

}

QueueItem.propTypes = {
  name: React.PropTypes.string,
  isUser: React.PropTypes.bool,
  isFirst: React.PropTypes.bool,
  isLast: React.PropTypes.bool,
}

export default QueueItem
