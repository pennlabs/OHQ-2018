import React, { Component } from 'react'
import { connect } from 'react-redux'

import Queue from './Queue.react'
import ClassInfoTitle from './ClassInfoTitle.react'
import styles from './../../style/ClassPage.scss'
import JoinQueueButton from './JoinQueueButton.react'
import ExpandingSidePanel from './ExpandingSidePanel.react'
import CurrentQuestion from './CurrentQuestion.react'
// import SidePanel from './SidePanel.react'
import Calendar from './Calendar.react'

import Modal from './Modal.react'

class ClassPage extends Component {

  state = {
    isExpandingSidePanelOpen: true,
  }

  static propTypes = {
    question: React.PropTypes.string,
  }

  toggleExpandingSidePanel = () => {
    this.setState({isExpandingSidePanelOpen: !this.state.isExpandingSidePanelOpen})
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
        />
      </Modal>
    )
  }

  render() {
    const sessions = {
      'monday': [
        {start: '9:30', end: '14:00'},
        {start: '14:30', end: '16:00'},
      ], 
      'tuesday': [
        {start: '13', end:'16'},
        {start: '16', end: '19:30'},
        {start: '20:00', end: '22:00'},
      ], 
      'wednesday': [
        {start: '11:30', end: '12:30'},
        {start: '12:30', end: '16'},
      ], 
      'thursday': [
        {start: '8', end: '14:00'},
        {start: '15:00', end: '17:00'},
      ], 
      'friday': [
        {start: '15:30', end: '18:00'},
      ],
    }

    return (
      <div className={styles.container}>
        <div className={styles.topRow}>
          <ClassInfoTitle
            teacher='John Doe'
            classCode='CIS 110'
            location='Moore 001'
          />
          <JoinQueueButton
            isExpandingSidePanelOpen={this.state.isExpandingSidePanelOpen}
            toggleExpandingSidePanel={this.toggleExpandingSidePanel}
          />
        </div>
        <div className={styles.middleRow}>
          <Queue //TODO: the props will be handled by node and redux
            // line={[
            //   {name: 'foo'},
            //   {name: 'bar'},
            //   {name: 'baz', isUser: true},
            //   {name: 'wibble'},
            //   {name: 'wobble'},
            //   {name: 'foo'},
            //   {name: 'bar'},
            // ]}
            // isTAForCurrentClass
          />
          <div className={styles.currentQuestionContainer}>
            <CurrentQuestion question={this.props.question}/>
          </div>
        </div>
        {this.renderExpandingSidePanel()}
        <Queue //TODO: the props will be handled by node and redux
          line={[
            {name: 'foo'},
            {name: 'bar'},
            {name: 'baz', isUser: true},
            {name: 'wibble'},
            {name: 'wobble'},
            {name: 'foo'},
            {name: 'bar'},
          ]}
        />

        <Calendar sessions={sessions}/>

      </div>
    )
  }
}

function mapStateToProps(state) {
  return {

  }
}

export default connect(mapStateToProps)(ClassPage)
