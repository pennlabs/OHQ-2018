import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { get, find } from 'lodash'

import { joinClassQueue, deactivateClass } from './../sockets/emitToSocket'
import ClassInfoTitle from './ClassInfoTitle.react'
import JoinQueueButton from './JoinQueueButton.react'
import ExpandingSidePanel from './ExpandingSidePanel.react'
import Modal from './Modal.react'
import ClassPageMiddleRow from './ClassPageMiddleRow.react'
import Broadcast from './Broadcast.react'
import styles from './../../style/ClassPage.less'

class ClassPage extends Component {

  state = {
    isExpandingSidePanelOpen: false,
    isTAConfirmCloseSessionModalOpen: false,
  }

  static propTypes = {
    //from redux
    userInfo: PropTypes.object,
    selectedClass: PropTypes.number,
    classes: PropTypes.object
  }

  preventDefaultWrapper = (func, ...args) => {
    return (e) => {
      e.preventDefault()
      e.stopPropagation()
      func.apply(this, args)
    }
  }

  deactivateClass() {
    this.setState({isTAConfirmCloseSessionModalOpen: false}, () => {
      deactivateClass({classId: this.props.selectedClass})
    })
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
    return find(queue, item => item.userInfo.id === this.props.userInfo.id) != null
  }

  renderTAConfirmCloseSessionModal = () => {
    if (!(this.isUserTAForSelectedClass() && this.getSelectedClassProperty('isActive'))) {
      return null
    }
    if (!this.state.isTAConfirmCloseSessionModalOpen) {
      return null
    }
    return (
      <Modal>
        <div className={styles.confirmCloseSessionModal}>
          Are you sure you want to close this session?
          <div className={styles.closeSessionModalButtonRow}>
            <div
              className={`${styles.closeSessionModalButton} ${styles.yesButton}`}
              onClick={this.preventDefaultWrapper(this.deactivateClass)}
            >
              Yes
            </div>
            <div
              className={`${styles.closeSessionModalButton} ${styles.noButton}`}
              onClick={
                this.preventDefaultWrapper(
                  this.setState, {isTAConfirmCloseSessionModalOpen: false}
                )
              }
            >
              No
            </div>
          </div>
        </div>
      </Modal>
    )
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

  renderTACloseSessionButton() {
    const onClick = this.preventDefaultWrapper(this.setState, {isTAConfirmCloseSessionModalOpen: true})
    return (
      <div
        className={styles.closeSessionButton}
        onClick={onClick}
      >
        {/*onClick={deactivateClass.bind(this, this.props.selectedClass)}*/}
        Close Session
      </div>
    )
  }

  renderBottomRow() {
    if (!this.getSelectedClassProperty('isActive')) return null
    return (
      <div className={styles.bottomRow}>
        {this.isUserTAForSelectedClass() ? this.renderTACloseSessionButton() : null}
        <Broadcast
          isUserTAForSelectedClass={this.isUserTAForSelectedClass()}
          selectedClassId={this.props.selectedClass}
          broadcastMessage={this.getSelectedClassProperty('broadcast')}
        />
      </div>
    )
  }

  renderExpandingSidePanel() {
    return (
      <ExpandingSidePanel
        toggleExpandingSidePanel={this.toggleExpandingSidePanel}
        isOpen={this.state.isExpandingSidePanelOpen}
        submitQuestion={this.joinSelectedClassQueue}
      />
    )
  }

  render() {
    return (
      <div className={styles.container}>
        {this.renderTopRow()}
        {this.renderMiddleRow()}
        {this.renderBottomRow()}
        {this.renderTAConfirmCloseSessionModal()}
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
