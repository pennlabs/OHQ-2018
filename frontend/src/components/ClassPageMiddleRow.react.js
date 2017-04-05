import React, { PropTypes, Component } from 'react'
import Queue from './Queue.react'
import CurrentQuestion from './CurrentQuestion.react'
import { activateClass } from './../sockets/emitToSocket'
import styles from './../../style/ClassPageMiddleRow.less'

class ClassPageMiddleRow extends Component {

  state = {
    endTimeInputText: '',
    locationText: ''
  }

  static propTypes = {
    selectedClassQueue: PropTypes.array,
    userInfo: PropTypes.object,
    isSelectedClassActive: PropTypes.bool,
    isUserTAForSelectedClass: PropTypes.bool,
    currentQuestion: PropTypes.object,
    selectedClassId: PropTypes.number,
  }

  getQuestionContainerClassName() {
    let className = styles.currentQuestionContainer
    const hasQuestion = this.props.currentQuestion
    const hasQueue = this.props.selectedClassQueue.length
    if (!hasQuestion && hasQueue) {
      className = `${className} ${styles.isEmptyAndQueue}`
    } else if (!hasQuestion && !hasQueue) {
      className = `${className} ${styles.isEmptyAndNoQueue}`
    }
    return className
  }

  updateInputText = (e) => {
    e.preventDefault()
    e.stopPropagation()
    this.setState({
      endTimeInputText: e.target.value
    })
  }

  updateLocationText = (e) => {
    e.preventDefault()
    e.stopPropagation()
    this.setState({
      locationText: e.target.value
    })
  }

  // TODO: add warning messages if TA doesn't location/endtime
  activateClass = () => {
    activateClass({
      classId: this.props.selectedClassId,
      locationText: this.state.locationText,
      endTime: this.state.endTimeInputText
    })
  }

  renderInactiveQuestion() {
    return (
      <div className={this.getQuestionContainerClassName()}>
        <CurrentQuestion
          isStudentInactiveState
        />
      </div>
    )
  }

  renderCurrentQuestion() {
    return (
      <div className={this.getQuestionContainerClassName()}>
        <CurrentQuestion
          questionData={this.props.currentQuestion}
          isUserTAForSelectedClass={this.props.isUserTAForSelectedClass}
        />
      </div>
    )
  }

  renderTAInactiveRow() {
    return (
      <div className={styles.startSessionContainer}>
        <div className={styles.startSessionRow}>
          <div className={styles.startSessionText}>
            Location:
          </div>
          {/*Todo: inner divs?*/}
          <div>
            <input
              className={styles.locationInput}
              value={this.state.locationText}
              onChange={this.updateLocationText}
            />
          </div>
        </div>
        <div className={styles.startSessionRow}>
          <div className={styles.startSessionText}>
            End time:
          </div>
          <div>
            <input
              className={styles.timeInput}
              value={this.state.endTimeInputText}
              onChange={this.updateInputText}
            />
          </div>
        </div>
        <div
          className={styles.createButton}
          onClick={this.activateClass}
        >
          Create Session
        </div>
      </div>
    )
  }

  renderTAActiveRow() {
    // TODO: allow TAs to interact with student queue.
    // Also probably want some kind of confirm modal before
    // TAs close a session.
    return (
      <div>
        {this.renderCurrentQuestion()}
        <Queue
          userInfo={this.props.userInfo}
          line={this.props.selectedClassQueue}
          isTAForCurrentClass
        />
      </div>
    )
  }

  renderStudentInactiveRow() {
    // TODO: implement styles - ripped from CurrentQuestion
    // We do it this way so currentQuestion is only be responsible for
    // handling active classes
    return (
      <div className={styles.middleRow}>
        {this.renderInactiveQuestion()}
      </div>
    )
  }

  renderStudentActiveRow() {
    return (
      <div className={styles.middleRow}>
        <Queue
          userInfo={this.props.userInfo}
          line={this.props.selectedClassQueue}
        />
        {this.renderCurrentQuestion()}
      </div>
    )
  }

  renderTAMiddleRow() {
    // if the class is not active, we render a panel for them to create a session.
    // else, we allow them to interact with the queue
    return this.props.isSelectedClassActive
    ? this.renderTAActiveRow()
    : this.renderTAInactiveRow()
  }

  renderStudentMiddleRow() {
    return this.props.isSelectedClassActive
    ? this.renderStudentActiveRow()
    : this.renderStudentInactiveRow()
  }

  render() {
    return this.props.isUserTAForSelectedClass
    ? this.renderTAMiddleRow()
    : this.renderStudentMiddleRow()
  }
}

export default ClassPageMiddleRow
