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
    isExpandingSidePanelOpen: true,
  }

  static propTypes = {
    question: PropTypes.string,

    //from redux
    userInfo: PropTypes.object,
    selectedClass: PropTypes.object,
  }

  toggleExpandingSidePanel = () => {
    this.setState({isExpandingSidePanelOpen: !this.state.isExpandingSidePanelOpen})
  }

  updateSelectedClassQueue = (question, location) => {
    if (!this.props.selectedClass || !this.props.userInfo) return null

    const queueData = {
      question,
      location,
      userInfo: this.props.userInfo,
      class: this.props.selectedClass
    }
    updateClassQueue(queueData)
  }

  getQuestionComponentClassName() {
    let className = styles.currentQuestionContainer
    if (!this.props.question) {
      className = `${className} ${styles.isEmpty}`
    }
    return className
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
        <div className={styles.topRow}>
          <ClassInfoTitle
            teacher='John Doe'
            classCode={get(this.props, 'selectedClass.name', null)}
            location='Moore 001'
          />
          <JoinQueueButton
            isExpandingSidePanelOpen={this.state.isExpandingSidePanelOpen}
            toggleExpandingSidePanel={this.toggleExpandingSidePanel}
          />
        </div>
        <div className={styles.middleRow}>
          <Queue
            line={get(this.props, 'selectedClass.queue', null)}
          />
          <div className={styles.currentQuestionContainer}>
            <CurrentQuestion question={this.props.question}/>
          </div>
        </div>
        {this.renderExpandingSidePanel()}
      </div>
    )
  }
}

function mapStateToProps({userInfo, selectedClass}) {
  return {
    userInfo,
    selectedClass,
  }
}

export default connect(mapStateToProps)(ClassPage)
