import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { get, find } from 'lodash'

import {
  joinClassQueue as emitJoinClassQueue,
  deactivateClass as emitDeactivateClass
} from './../sockets/emitToSocket'
import ClassInfoTitle from './ClassInfoTitle.react'
import JoinQueueButton from './JoinQueueButton.react'
import ExpandingSidePanel from './ExpandingSidePanel.react'
import Modal from './Modal.react'
import ClassPageMiddleRow from './ClassPageMiddleRow.react'
import Broadcast from './Broadcast.react'
import styles from './../../style/ClassPage.less'


// TODO: isolate redux connections as close to the leaves as possible
// TODO: currently classPage cares about too many things
class ClassPage extends Component {

  state = {
    isExpandingSidePanelOpen: false,
    isTAConfirmCloseSessionModalOpen: false,
  }

  static propTypes = {
    //from redux
    userInfo: PropTypes.object,
    classInfo: PropTypes.object,
    classLinks: PropTypes.object // only sent if user joined as a TA
  }

  preventDefaultWrapper = (func, ...args) => {
    return (e) => {
      e.preventDefault()
      e.stopPropagation()
      func.apply(this, args)
    }
  }

  deactivateClass() {
    this.setState({ isTAConfirmCloseSessionModalOpen: false }, () => {
      emitDeactivateClass({ link: this.props.classLinks.TALink })
    })
  }

  isUserTAForCurrentClass() {
    return this.props.classLinks != null
  }

  toggleExpandingSidePanel = () => {
    this.setState({ isExpandingSidePanelOpen: !this.state.isExpandingSidePanelOpen })
  }

  joinCurrentClassQueue = (question, location) => {
    // TODO: make user info optional?
    const { userInfo } = this.props
    const link = null // TODO: set link
    const queueData = { question, location, link, userInfo }
    emitJoinClassQueue(queueData)
  }

  getTACurrentQuestion() {
    return this.props.classInfo.queue[0]
  }

  getCurrentQuestion() {
    if (this.props.classInfo == null) {
      return null
    }
    if (this.isUserTAForCurrentClass()) {
      return this.getTACurrentQuestion()
    }
    return this.props.classInfo.queue.find(question => {
      return question.userInfo.id === this.props.userInfo.id
    })
  }

  isStudentInQueue() {
    return find(
      this.props.classInfo.queue,
      question => question.userInfo.id === this.props.userInfo.id
    ) != null
  }

  renderTAConfirmCloseSessionModal = () => {
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
                  this.setState, { isTAConfirmCloseSessionModalOpen: false }
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
    if (this.isUserTAForCurrentClass()
      || this.props.classInfo == null
      || this.isStudentInQueue()) {
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
    if (this.isUserTAForCurrentClass()) {
      student = `${student} (TA)`
    }
    console.warn('@@@@@', this.props.classInfo)

    return (
      <div className={styles.topRow}>
        <ClassInfoTitle
          student={student}
          classCode={this.props.classInfo.name}
          location={this.props.classInfo.location}
        />
        {this.renderJoinQueueButton()}
      </div>
    )
  }

  renderMiddleRow() {
    // TODO: come back to me
    const queue = this.props.classInfo == null ? [] : this.props.classInfo.queue
    return (
      <ClassPageMiddleRow
        currentClassQueue={queue}
        userInfo={this.props.userInfo}
        isSelectedClassActive={this.getSelectedClassProperty('isActive')}
        isUserTAForCurrentClass={this.isUserTAForCurrentClass()}
        currentQuestion={this.getCurrentQuestion()}
        selectedClassId={this.props.selectedClass}
      />
    )
  }

  renderTACloseSessionButton() {
    const onClick = this.preventDefaultWrapper(
      this.setState, { isTAConfirmCloseSessionModalOpen: true }
    )
    return (
      <div
        className={styles.closeSessionButton}
        onClick={onClick}
      >
        Close Session
      </div>
    )
  }

  renderBottomRow() {
    if (this.props.classInfo == null) {
      return null
    }
    return (
      <div className={styles.bottomRow}>
        {this.isUserTAForCurrentClass() ? this.renderTACloseSessionButton() : null}
        <Broadcast
          isUserTAForCurrentClass={this.isUserTAForCurrentClass()}
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
        submitQuestion={this.joinCurrentClassQueue}
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

function mapStateToProps({ userInfo, classInfo, classLinks }) {
  console.warn(classInfo)
  return {
    userInfo,
    classInfo,
    classLinks
  }
}

export default connect(mapStateToProps)(ClassPage)
