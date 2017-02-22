import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { get } from 'lodash'

import { updateClassQueue } from './../sockets/emitToSocket'
import Queue from './Queue.react'
import ClassInfoTitle from './ClassInfoTitle.react'
import styles from './../../style/ClassPage.scss'
import JoinQueueButton from './JoinQueueButton.react'
import ExpandingSidePanel from './ExpandingSidePanel.react'
import CurrentQuestion from './CurrentQuestion.react'

import Modal from './Modal.react'

class ClassPage extends Component {

  state = {
    isExpandingSidePanelOpen: false,
  }

  static propTypes = {
    question: PropTypes.string,

    //from redux
    userInfo: PropTypes.object,
    selectedClass: PropTypes.number,
    classes: PropTypes.object
  }

  toggleExpandingSidePanel = () => {
    this.setState({isExpandingSidePanelOpen: !this.state.isExpandingSidePanelOpen})
  }

  updateSelectedClassQueue = (question, location) => {
    if (this.props.selectedClass == null || !this.props.userInfo) return null

    const queueData = {
      question,
      location,
      userInfo: this.props.userInfo,
      classId: this.props.selectedClass
    }
    updateClassQueue(queueData)
  }

  getQuestionContainerClassName() {
    let className = styles.currentQuestionContainer
    const hasQuestion = this.getCurrentQuestion()
    const hasQueue = this.getSelectedClassProperty('queue').length
    if (!hasQuestion && hasQueue) {
      className = `${className} ${styles.isEmptyAndQueue}`
    } else if (!hasQuestion && !hasQueue) {
      className = `${className} ${styles.isEmptyAndNoQueue}`
    }
    return className
  }

  getCurrentQuestion() {
    //TODO: also if user is a TA
    if (!this.props.userInfo ||
     this.props.selectedClass == null ||
     !this.props.classes) return null

    return this.props.classes[this.props.selectedClass].queue.find(data => (
      data.userInfo.id === this.props.userInfo.id
    ))
  }

  getSelectedClassProperty(property) {
    return get(this.props.classes, `[${this.props.selectedClass}[${property}]`)
  }

  renderTopRow() {
    return (
      <div className={styles.topRow}>
        <ClassInfoTitle
          teacher='John Doe'
          classCode={this.getSelectedClassProperty('name')}
          location='Moore 001'
        />
        <JoinQueueButton
          isExpandingSidePanelOpen={this.state.isExpandingSidePanelOpen}
          toggleExpandingSidePanel={this.toggleExpandingSidePanel}
        />
      </div>
    )
  }

  renderMiddleRow() {
    return (
      <div className={styles.middleRow}>
        <Queue
          userInfo={this.props.userInfo}
          line={this.getSelectedClassProperty('queue')}
        />
        <div className={this.getQuestionContainerClassName()}>
          <CurrentQuestion questionData={this.getCurrentQuestion()}/>
        </div>
      </div>
    )
  }

  renderExpandingSidePanel() {
    return (
      <Modal>
        <ExpandingSidePanel
          toggleExpandingSidePanel={this.toggleExpandingSidePanel}
          isOpen={this.state.isExpandingSidePanelOpen}
          submitQuestion={this.updateSelectedClassQueue}
        />
      </Modal>
    )
  }

  render() {
    return (
      <div className={styles.container}>
        {this.renderTopRow()}
        {this.renderMiddleRow()}
        {this.renderExpandingSidePanel()}
      </div>
    )
  }
}

function mapStateToProps({userInfo, selectedClass, classes}) {
  return {
    userInfo,
    selectedClass,
    classes
  }
}

export default connect(mapStateToProps)(ClassPage)
