import React, { Component, PropTypes } from 'react'
import BeardedMan from './../../images/BeardedMan.png'
import styles from './../../style/CurrentQuestion.less'

class CurrentQuestion extends Component {

  static propTypes = {
    questionData: PropTypes.object,
    isUserTAForSelectedClass: PropTypes.bool
  }

  renderQuestionStudentView() {
    return (
      <div className={styles.questionContainer}>
        <span className={styles.questionHeader}>Your Question</span>
        <span className={styles.questionText}>{this.props.questionData.question}</span>
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

  renderQuestionTAView() {
    const { questionData: data } = this.props
    const { firstName: first, lastName: last } = data
    return (
      <div className={styles.questionContainer}>
        <span className={styles.questionHeader}>{`${first} ${last}'s question`}</span>
        <span className={styles.questionText}>{this.props.questionData.question}</span>
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
    return this.props.questionData
    ? this.renderQuestionStudentView()
    : this.renderStudentEmptyState()
  }

  renderTAView() {
    return this.props.questionData
    ? this.renderQuestionTAView()
    : this.renderTAEmptyState()
  }

  render() {
    return this.props.isUserTAForSelectedClass
    ? this.renderTAView()
    : this.renderStudentView()
  }
}

export default CurrentQuestion
