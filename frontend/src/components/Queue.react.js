import React, { Component } from 'react'

import QueueItem from './QueueItem.react'
import styles from './../../style/Queue.scss'

class Queue extends Component {

  static propTypes = {
    line: React.PropTypes.array,
    isTAForCurrentClass: React.PropTypes.bool,
  }

  getPosition() {
    if (!this.props.line) return null
    const pos = this.props.line.findIndex(student => student.isUser)
    return pos < 0 ? null : pos + 1
  }

  renderPositionTitle() {
    if (this.props.isTAForCurrentClass) return 'Next Student'

    const pos = this.getPosition()
    if (!pos) return `${this.props.line.length} people in line`
    return `You are position ${pos}/${this.props.line.length}`
  }

  renderQueue() {
    if (!this.props.line) return null

    return this.props.line.map((student, index) => {
      return (
        <QueueItem
          name={student.name}
          key={index} //TODO: need a proper key
          isFirst={index === 0}
          isLast={index === this.props.line.length - 1}
          isUser={student.isUser}
          isTAForCurrentClass={this.props.isTAForCurrentClass}
        />
      )
    })
  }

  render() {
    return (
      <div className={styles.container}>
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
