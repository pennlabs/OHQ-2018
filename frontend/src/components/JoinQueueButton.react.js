import React, { Component, PropTypes } from 'react'
import CustomCross from './CustomCross.react'

import styles from './../../style/JoinQueueButton.scss'

class JoinQueueButton extends Component {

  static propTypes = {
    toggleExpandingSidePanel: PropTypes.func,
    isExpandingSidePanelOpen: PropTypes.bool,
    shouldDisplay: PropTypes.bool,
  }

  static defaultProps = {
    shouldDisplay: true
  }

  getClassName() {
    return this.props.isExpandingSidePanelOpen
    ? `${styles.greenBox} ${styles.sidePanelOpen}`
    : styles.greenBox
  }

  render() {
    if (!this.props.shouldDisplay) return null
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
