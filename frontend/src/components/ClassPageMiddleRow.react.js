import React, { PropTypes, Component } from 'react'
import Queue from './Queue.react'
import CurrentQuestion from './CurrentQuestion.react'
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

  renderTAInactiveRow() {
    return (
      <div className={styles.startSessionContainer}>
        <div className={styles.startSessionRow}>
          <div className={styles.startSessionText}>
            Location:
          </div>
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
        <div className={styles.createButton}></div>
      </div>
    )
  }

  renderTAActiveRow() {
    // TODO: allow TAs to interact with student queue
  }


  renderTAMiddleRow() {
    // if the class is not active, we render a panel for them to create a session.
    // else, we allow them to interact with the queue
    if (!this.props.isSelectedClassActive) {
      return this.renderTAInactiveRow()
    }
    return this.renderTAActiveRow()
  }

  renderCurrentQuestion() {
    return (
      <div className={this.getQuestionContainerClassName()}>
        <CurrentQuestion questionData={this.props.currentQuestion}/>
      </div>
    )
  }

  render() {
    if (this.props.isUserTAForSelectedClass) {
      return this.renderTAMiddleRow()
    }
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

}

export default ClassPageMiddleRow
