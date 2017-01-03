import React, { Component } from 'react'
import BeardedMan from './../../images/beardedman.png'
import styles from './../../style/CurrentQuestion.scss'

class CurrentQuestion extends Component {

  static propTypes = {
    queston: React.PropTypes.string,
  }

  renderQuestion() {
    return null
  }

  renderEmptyState() {
    return (
      <div className={styles.emptyContainer}>
        <img className={styles.beardedMan} src={BeardedMan}></img>
        <span>Click on the + button to add a question to the queue!</span>
      </div>
    )
  }

  render() {
    return this.props.question
    ? this.renderQuestion()
    : this.renderEmptyState()
  }
}

export default CurrentQuestion
