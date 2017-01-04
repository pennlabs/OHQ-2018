import React, { Component } from 'react'

import Queue from './Queue.react'
import ClassInfoTitle from './ClassInfoTitle.react'
import styles from './../../style/ClassPage.scss'
import JoinQueueButton from './JoinQueueButton.react'
import ExpandingSidePanel from './ExpandingSidePanel.react'
import CurrentQuestion from './CurrentQuestion.react'

class ClassPage extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isExpandingSidePanelOpen: false,
    }
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
      </div>
    )
  }
}

ClassPage.propTypes = {
  question: React.PropTypes.string,
}

export default ClassPage
