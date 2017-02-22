import React, { Component, PropTypes } from 'react'
import { get } from 'lodash'

import QueueItem from './QueueItem.react'
import styles from './../../style/Queue.scss'

class Queue extends Component {

  static propTypes = {
    line: PropTypes.array,
    isTAForCurrentClass: PropTypes.bool,
    userInfo: PropTypes.object
  }

  getPosition() {
    if (!this.props.line || !this.props.line.length) return null
    const pos = this.props.line.findIndex(data =>
      data.userInfo.id === get(this.props, 'userInfo.id', null
    ))
    return pos < 0 ? null : pos + 1
  }

  getQueueClassName() {
    let className = styles.container
    if (!this.props.line.length) {
      className = `${className} ${styles.isEmpty}`
    }
    return className
  }

  renderPositionTitle() {
    if (!this.props.line || !this.props.line.length) return null
    if (this.props.isTAForCurrentClass) return 'Next Student'

    const pos = this.getPosition()
    if (!pos) {
      if (this.props.line.length === 1) return '1 person in line'
      return `${this.props.line.length} people in line`
    }
    return `You are position ${pos}/${this.props.line.length}`
  }

  renderQueue() {
    if (!this.props.line) return null

    return this.props.line.map((data, index) => {
      return (
        <QueueItem
          name={data.userInfo.firstName}
          key={data.userInfo.id}
          isFirst={index === 0}
          isLast={index === this.props.line.length - 1}
          isUser={data.userInfo.id === get(this.props, 'userInfo.id', null)}
          isTAForCurrentClass={this.props.isTAForCurrentClass}
        />
      )
    })
  }

  render() {
    return (
      <div className={this.getQueueClassName()}>
        <span className={styles.positionTitle}>
          {this.renderPositionTitle()}
        </span>
        <div className={styles.queue}>
          {this.renderQueue()}
        </div>
      </div>
    )
  }
}

export default Queue
