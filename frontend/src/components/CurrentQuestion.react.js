import React, { Component } from 'react'
import BeardedMan from './../../images/BeardedMan.png'
import styles from './../../style/CurrentQuestion.scss'

class CurrentQuestion extends Component {

  static propTypes = {
    question: React.PropTypes.string,
  }

  // static defaultProps = {
  //   question: 'foobarbaz asdfasdfasd fasdfasdfasdf asdfasdf asdfasdfa afsfdasdf asfdasdfa fsdfa sdfa sdf foobarbaz asdfasdfasd fasdfasdfasdf asdfasdf asdfasdfa afsfdasdf asfdasdfa fsdfa sdfa sdf foobarbaz asdfasdfasd fasdfasdfasdf asdfasdf asdfasdfa afsfdasdf asfdasdfa fsdfa sdfa sdf'
  // }

  renderQuestion() {
    return (
      <div className={styles.questionContainer}>
        <span className={styles.questionHeader}>Your Question</span>
        <span className={styles.questionText}>{this.props.question}</span>
      </div>
    )
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
