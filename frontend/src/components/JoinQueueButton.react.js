import React, { Component } from 'react'
import CustomCross from './CustomCross.react'

import styles from './../../style/JoinQueueButton.scss'

class JoinQueueButton extends Component {

  static propTypes = {
    toggleExpandingSidePanel: React.PropTypes.func,
    isExpandingSidePanelOpen: React.PropTypes.bool,
  }

  getClassName() {
    return this.props.isExpandingSidePanelOpen
    ? `${styles.greenBox} ${styles.sidePanelOpen}`
    : styles.greenBox
  }

  render() {
    return (
      <div
        className={this.getClassName()}
        title='Join the queue'
        onClick={this.props.toggleExpandingSidePanel}
      >
        <CustomCross
          customClassName={styles.crossContainer}
          color='white'
        />
      </div>
    )
  }
}

export default JoinQueueButton
