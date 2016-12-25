import React, { Component } from 'react'

import Queue from './Queue.react'
import ClassInfoTitle from './ClassInfoTitle.react'
import styles from './../../style/classpage.scss'
import JoinQueueButton from './JoinQueueButton.react'
import SidePanel from './SidePanel.react'

class ClassPage extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isSidePanelOpen: false,
    }
  }

  toggleSidePanel = () => {
    this.setState({isSidePanelOpen: !this.state.isSidePanelOpen})
  }

  renderSidePanel() {
    return (
      <SidePanel
        toggleSidePanel={this.toggleSidePanel}
        isOpen={this.state.isSidePanelOpen}
      />
    )
  }

  render() {
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
        {this.renderSidePanel()}
      </div>
    )
  }
}

export default ClassPage
