import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { get } from 'lodash'

import { updateClassQueue } from './../sockets/emitToSocket'
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

  updateSelectedClassQueue = (question, location) => {
    const { selectedClass, userInfo } = this.props
    if (selectedClass == null || userInfo == null) return null
    const queueData = {
      question,
      location,
      userInfo: this.props.userInfo,
      classId: this.props.selectedClass
    }
    updateClassQueue(queueData)
  }

  getCurrentQuestion() {
    const { classes, selectedClass, userInfo } = this.props
    if (classes == null || selectedClass == null || userInfo == null) return null

    return this.props.classes[this.props.selectedClass].queue.find(data => (
      data.userInfo.id === this.props.userInfo.id
    ))
  }

  getSelectedClassProperty(property) {
    return get(this.props.classes, `[${this.props.selectedClass}[${property}]`)
  }

  renderJoinQueueButton() {
    // TAs cannot join the queue of their own OH
    if (this.isUserTAForSelectedClass()) {
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
        isSelectedClassActive={this.getSelectedClassProperty('active')}
        isUserTAForSelectedClass={this.isUserTAForSelectedClass()}
        currentQuestion={this.getCurrentQuestion()}
      />
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
