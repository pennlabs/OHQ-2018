import React, { Component } from 'react'
import CustomCross from './CustomCross.react'

import styles from './../../style/joinqueuebutton.scss'

class JoinQueueButton extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isMouseDown: false,
    }
  }

  getClassName() {
    return this.state.isMouseDown
    ? `${styles.greenBox} ${styles.mouseDown}`
    : styles.greenBox
  }

  setMouseDownState = (state) => {
    return (e) => {
      e.preventDefault()
      e.stopPropagation()
      this.setState({isMouseDown: state})
    }
  }

  render() {
    return (
      <div
        className={this.getClassName()}
        title='Join the queue'
        onMouseDown={this.setMouseDownState(true)}
        onMouseUp={this.setMouseDownState(false)}
        onMouseLeave={this.setMouseDownState(false)}
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
