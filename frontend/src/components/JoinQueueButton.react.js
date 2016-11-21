import React, { Component } from 'react'
import CustomCross from './CustomCross.react'

import styles from './../../style/joinqueuebutton.scss'

class JoinQueueButton extends Component {

  render() {
    return (
      <div
        className={styles.greenBox}
        title='Join the queue'
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
