import React, { Component } from 'react'

import Queue from './Queue.react'
import ClassInfoTitle from './ClassInfoTitle.react'
import styles from './../../style/classpage.scss'
import JoinQueueButton from './JoinQueueButton.react'
import SidePanel from './SidePanel.react'
import Calendar from './Calendar.react'

class ClassPage extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isSidePanelOpen: true,
    }
  }

  toggleSidePanel = () => {
    this.setState({isSidePanelOpen: !this.state.isSidePanelOpen})
  }

  render() {
    const sessions = [
      {day: 'monday', timeStart: '10:30', timeEnd: '2:00'},
      {day: 'monday', timeStart: '1:30', timeEnd: '4:00'},
      {day: 'tuesday', timeStart: '10:30', timeEnd: '2:00'},
      {day: 'wednesday', timeStart: '10:30', timeEnd: '2:00'},
      {day: 'thursday', timeStart: '10:30', timeEnd: '2:00'},
      {day: 'friday', timeStart: '10:30', timeEnd: '2:00'},
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
            isSidePanelOpen={this.state.isSidePanelOpen}
            toggleSidePanel={this.toggleSidePanel}
          />
        </div>
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
        <SidePanel
          isOpen={this.state.isSidePanelOpen}
          toggleSidePanel={this.toggleSidePanel}
        />
      </div>
    )
  }
}

export default ClassPage
