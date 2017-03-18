import React, { Component, PropTypes } from 'react'
import BeardedMan from './../../images/BeardedMan.png'
import styles from './../../style/CurrentQuestion.less'

class CurrentQuestion extends Component {

  static propTypes = {
    questionData: PropTypes.object,
    isUserTAForSelectedClass: PropTypes.bool,
    isStudentInactiveState: PropTypes.bool,
  }

  renderStudentQuestionView() {
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

  renderTAQuestionView() {
    const { questionData: { userInfo: data, location, question } } = this.props
    const { firstName: first, lastName: last } = data
    return (
      <div className={styles.questionContainer}>
        <span className={styles.questionHeader}>{`${first} ${last}'s question`}</span>
        <span className={styles.questionText}>{question}</span>
        <span className={styles.questionHeader}>{`${first} ${last}'s location`}</span>
        <span className={styles.questionText}>{location}</span>
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
    ? this.renderStudentQuestionView()
    : this.renderStudentEmptyState()
  }

  renderTAView() {
    return this.props.questionData
    ? this.renderTAQuestionView()
    : this.renderTAEmptyState()
  }

  // TODO: maybe calendar here instead
  renderStudentInactiveState() {
    return (
      <div className={styles.emptyContainer}>
        <img className={styles.beardedMan} src={BeardedMan}></img>
        <span className={styles.emptyText}>This class isn't open.</span>
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
