import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { get, find } from 'lodash'

import { joinClassQueue } from './../sockets/emitToSocket'
import ClassInfoTitle from './ClassInfoTitle.react'
import JoinQueueButton from './JoinQueueButton.react'
import ExpandingSidePanel from './ExpandingSidePanel.react'
import Modal from './Modal.react'
import ClassPageMiddleRow from './ClassPageMiddleRow.react'
import styles from './../../style/ClassPage.less'

class ClassPage extends Component {

  state = {
    isExpandingSidePanelOpen: false,
  }

  static propTypes = {
    //from redux
    userInfo: PropTypes.object,
    selectedClass: PropTypes.number,
    classes: PropTypes.object
  }

  // NOTE: may want to memoize or refactor this later, as it's being called
  // multiple times on each render
  isUserTAForSelectedClass() {
    const { classes, selectedClass, userInfo } = this.props
    if (classes == null || selectedClass == null || userInfo == null) return null
    return classes[selectedClass].TAs.includes(userInfo.id)
  }

  toggleExpandingSidePanel = () => {
    this.setState({isExpandingSidePanelOpen: !this.state.isExpandingSidePanelOpen})
  }

  joinSelectedClassQueue = (question, location) => {
    const { selectedClass, userInfo } = this.props
    if (selectedClass == null || userInfo == null) return null
    const queueData = {
      question,
      location,
      userInfo: this.props.userInfo,
      classId: this.props.selectedClass
    }
    joinClassQueue(queueData)
  }

  getTACurrentQuestion() {
    return this.props.classes[this.props.selectedClass].queue[0]
  }

  getCurrentQuestion() {
    const { classes, selectedClass, userInfo } = this.props
    if (classes == null || selectedClass == null || userInfo == null) return null

    if (this.isUserTAForSelectedClass()) {
      return this.getTACurrentQuestion()
    }
    return this.props.classes[this.props.selectedClass].queue.find(data => {
      return data.userInfo.id === this.props.userInfo.id
    })
  }

  getSelectedClassProperty(property) {
    return get(this.props.classes, `[${this.props.selectedClass}[${property}]`)
  }

  isStudentInQueue() {
    const queue = this.getSelectedClassProperty('queue')
    // using !! to cast the return value to a truthy value
    return !!find(queue, item => item.userInfo.id === this.props.userInfo.id)
  }

  renderJoinQueueButton() {
    // Don't render the button if user is TA or class isn't active
    if (this.isUserTAForSelectedClass() ||
    !this.getSelectedClassProperty('isActive') ||
    this.isStudentInQueue()) {
      return null
    }
    return (
      <JoinQueueButton
        isExpandingSidePanelOpen={this.state.isExpandingSidePanelOpen}
        toggleExpandingSidePanel={this.toggleExpandingSidePanel}
      />
    )
  }

  renderTopRow() {
    let student = `${get(this.props.userInfo, 'firstName')} ${get(this.props.userInfo, 'lastName')}`
    if (this.isUserTAForSelectedClass()) {
      student = `${student} (TA)`
    }
    const location = this.getSelectedClassProperty('locations')
    ? this.getSelectedClassProperty('locations')[0]
    : null

    return (
      <div className={styles.topRow}>
        <ClassInfoTitle
          student={student}
          classCode={this.getSelectedClassProperty('name')}
          location={location}
        />
        {this.renderJoinQueueButton()}
      </div>
    )
  }

  renderMiddleRow() {
    return (
      <ClassPageMiddleRow
        selectedClassQueue={this.getSelectedClassProperty('queue')}
        userInfo={this.props.userInfo}
        isSelectedClassActive={this.getSelectedClassProperty('isActive')}
        isUserTAForSelectedClass={this.isUserTAForSelectedClass()}
        currentQuestion={this.getCurrentQuestion()}
        selectedClassId={this.props.selectedClass}
      />
    )
  }

  renderExpandingSidePanel() {
    return (
      <Modal>
        <ExpandingSidePanel
          toggleExpandingSidePanel={this.toggleExpandingSidePanel}
          isOpen={this.state.isExpandingSidePanelOpen}
          submitQuestion={this.joinSelectedClassQueue}
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
