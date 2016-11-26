import React, { Component } from 'react'
import CustomCross from './CustomCross.react'

import styles from './../../style/joinqueuebutton.scss'

class JoinQueueButton extends Component {

  getClassName() {
    return this.props.isSidePanelOpen
    ? `${styles.greenBox} ${styles.sidePanelOpen}`
    : styles.greenBox
  }

  render() {
    return (
      <div
        className={this.getClassName()}
        title='Join the queue'
        onClick={this.props.toggleSidePanel}
      >
        <CustomCross
          customClassName={styles.crossContainer}
          color='white'
        />
      </div>
    )
  }
}

JoinQueueButton.propTypes = {
  toggleSidePanel: React.PropTypes.func,
  isSidePanelOpen: React.PropTypes.bool,
}

export default JoinQueueButton
