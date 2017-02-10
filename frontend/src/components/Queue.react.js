import React, { Component } from 'react'
import { connect } from 'react-redux'

import QueueItem from './QueueItem.react'
import styles from './../../style/Queue.scss'

class Queue extends Component {

  static propTypes = {
    line: React.PropTypes.array,
    isTAForCurrentClass: React.PropTypes.bool,
  }

  getPosition() {
    if (!this.props.line || !this.props.line.length) return null
    const pos = this.props.line.findIndex(student => student.isUser)
    return pos < 0 ? null : pos + 1
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

    return this.props.line.map((student, index) => {
      return (
        <QueueItem
          name={student.user}
          key={index} //TODO: need a proper key
          isFirst={index === 0}
          isLast={index === this.props.line.length - 1}
          // isUser={student.isUser} HACK: temporarily disabled
          isUser={index === 1 && this.props.line.length > 2}
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

function mapStateToProps(state) {
  if (!state.queue) {
    return {
      line: null
    }
  }
  const currentLine = state.queue[state.activeClass]
  console.warn(state.queue)
  console.warn(currentLine)
  return {
    line: currentLine
  }
}

export default connect(mapStateToProps)(Queue)
