import React, { Component } from 'react'

import Queue from './Queue.react'
import ClassInfoTitle from './ClassInfoTitle.react'
import styles from './../../style/ClassPage.scss'
import JoinQueueButton from './JoinQueueButton.react'
import ExpandingSidePanel from './ExpandingSidePanel.react'
import CurrentQuestion from './CurrentQuestion.react'
// import SidePanel from './SidePanel.react'
import Calendar from './Calendar.react'

class ClassPage extends Component {

  state = {
    isExpandingSidePanelOpen: false,
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
      <ExpandingSidePanel
        toggleExpandingSidePanel={this.toggleExpandingSidePanel}
        isOpen={this.state.isExpandingSidePanelOpen}
      />
    )
  }

  render() {
    const sessions = [
      {day: 'monday', timeStart: '10:30', timeEnd: '14:00'},
      {day: 'monday', timeStart: '13:30', timeEnd: '16:00'},
      {day: 'tuesday', timeStart: '10:30', timeEnd: '14:00'},
      {day: 'wednesday', timeStart: '10:30', timeEnd: '14:00'},
      {day: 'thursday', timeStart: '10:30', timeEnd: '14:00'},
      {day: 'friday', timeStart: '10:30', timeEnd: '14:00'},
    ]
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
            line={[
              {name: 'foo'},
              {name: 'bar'},
              {name: 'baz', isUser: true},
              {name: 'wibble'},
              {name: 'wobble'},
              {name: 'foo'},
              {name: 'bar'},
            ]}
            isTAForCurrentClass
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

export default ClassPage
