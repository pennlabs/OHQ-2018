import React, { Component } from 'react'

import QueueItem from './QueueItem.react'
import styles from './../../style/queue.scss'

class Queue extends Component {

  getPosition() {
    if (!this.props.line) return null
    const pos = this.props.line.findIndex(student => student.isUser)
    return pos < 0 ? null : pos + 1
  }

  renderPositionTitle() {
    const pos = this.getPosition()
    if (!pos) return 'You are not in queue'
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

Queue.propTypes = {
  line: React.PropTypes.array,
}

export default Queue
