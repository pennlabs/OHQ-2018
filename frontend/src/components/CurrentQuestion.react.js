import React, { Component, PropTypes } from 'react'

import { removeFromQueue } from './../sockets/emitToSocket'

import BeardedMan from './../../images/BeardedMan.png'
import styles from './../../style/CurrentQuestion.less'

class CurrentQuestion extends Component {

  static propTypes = {
    // See shared folder for description of questionInfo
    questionInfo: PropTypes.object,
    isUserTAForSelectedClass: PropTypes.bool,
    isStudentInactiveState: PropTypes.bool,
    selectedClassId: PropTypes.number,
  }

  removeFromQueue = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (this.props.selectedClassId == null) return

    removeFromQueue({classId: this.props.selectedClassId})
  }

  renderStudentQuestionView() {
    return (
      <div className={styles.questionContainer}>
        <span className={styles.questionHeader}>Your Question</span>
        <span className={styles.questionText}>{this.props.questionInfo.question}</span>
      </div>
    )
  }

  renderStudentEmptyState() {
    return (
      <div className={styles.emptyContainer}>
        <img className={styles.beardedMan} src={BeardedMan}></img>
        <span className={styles.emptyText}>Click on the + button to add a question to the queue!</span>
      </div>
    )
  }

  renderTAQuestionView() {
    const { questionInfo: { userInfo: { firstName, lastName }, location, question } } = this.props
    return (
      <div className={styles.questionContainer}>
        <span className={styles.TAQuestionHeader}>{`${firstName} ${lastName}'s location`}</span>
        <span className={styles.questionText}>{location}</span>
        <span className={styles.TAQuestionHeader}>{`${firstName} ${lastName}'s question`}</span>
        <span className={styles.questionText}>{question}</span>
        <div className={styles.TAHelpButton} onClick={this.removeFromQueue}>Help this student</div>
      </div>
    )
  }

  renderTAEmptyState() {
    return (
      <div className={styles.emptyContainer}>
        <img className={styles.beardedMan} src={BeardedMan}></img>
        <span className={styles.emptyText}>No students are currently in the queue.</span>
      </div>
    )
  }

  renderStudentView() {
    return this.props.questionInfo
    ? this.renderStudentQuestionView()
    : this.renderStudentEmptyState()
  }

  renderTAView() {
    return this.props.questionInfo
    ? this.renderTAQuestionView()
    : this.renderTAEmptyState()
  }

  // TODO: maybe calendar here instead
  renderStudentInactiveState() {
    return (
      <div className={styles.emptyContainer}>
        <img className={styles.beardedMan} src={BeardedMan}></img>
        <span className={styles.emptyText}>This class is closed.</span>
      </div>
    )
  }

  render() {
    if (this.props.isStudentInactiveState) {
      return this.renderStudentInactiveState()
    }

    return this.props.isUserTAForSelectedClass
    ? this.renderTAView()
    : this.renderStudentView()
  }
}

export default CurrentQuestion
