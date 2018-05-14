import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'

import Queue from './Queue.react'
import CurrentQuestion from './CurrentQuestion.react'
import { activateClass as activateClassAux } from './../sockets/emitToSocket'
import styles from './../../style/ClassPageMiddleRow.less'

class ClassPageMiddleRow extends Component {

  state = {
    endTimeInputText: '',
    locationText: ''
  }

  static propTypes = {
    currentClassQueue: PropTypes.array,
    userInfo: PropTypes.object,
    // isSelectedClassActive: PropTypes.bool,
    isUserTAForSelectedClass: PropTypes.bool,
    currentQuestion: PropTypes.object,
    selectedClassId: PropTypes.number,

    // from redux
  }

  getQuestionContainerClassName() {
    let className = styles.currentQuestionContainer
    const hasQuestion = this.props.currentQuestion
    const hasQueue = this.props.currentClassQueue.length
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
    activateClassAux({
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
          questionInfo={this.props.currentQuestion}
          userInfo={this.props.userInfo}
          isUserTAForSelectedClass={this.props.isUserTAForSelectedClass}
          selectedClassId={this.props.selectedClassId}
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
      <div className={styles.middleRow}>
        <Queue
          userInfo={this.props.userInfo}
          line={this.props.currentClassQueue}
          isTAForCurrentClass
        />
        {this.renderCurrentQuestion()}
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
          line={this.props.currentClassQueue}
        />
        {this.renderCurrentQuestion()}
      </div>
    )
  }

  renderTAMiddleRow() {
    // if the class is not active, we render a panel for them to create a session.
    // else, we allow them to interact with the queue
    return this.renderTAActiveRow()
  }

  renderStudentMiddleRow() {
    return this.renderStudentActiveRow()
  }

  render() {
    return this.props.isUserTAForSelectedClass
      ? this.renderTAMiddleRow()
      : this.renderStudentMiddleRow()
  }
}

function mapStateToProps({ userInfo, classInfo, classLinks }) {
  return {
    userInfo,
    classInfo,
    classLinks
  }
}


export default connect(mapStateToProps)(ClassPageMiddleRow)
