import React, { Component } from 'react'

import CustomCross from './CustomCross.react'
import styles from './../../style/ExpandingSidePanel.scss'
import { updateQueue } from './../sockets/emitToSocket'

class ExpandingSidePanel extends Component {

  state = {
    questionCharLimit: 200,
    questionText: '',
    locationText: ''
  }

  static propTypes = {
    toggleExpandingSidePanel: React.PropTypes.func,
    isOpen: React.PropTypes.bool
  }

  componentDidUpdate(prevProps) {
    if (this.props.isOpen && !prevProps.isOpen) {
      this.refs.questionInput.focus()
    }
  }

  closeSidePanel = (e) => {
    e.preventDefault()
    e.stopPropagation()
    this.props.toggleExpandingSidePanel()
  }

  changeQuestionText = (e) => {
    const value = e.target.value.replace('\n', '')

    //allow the user to enter content that exceeds the char limit;
    //we will just truncate it.  Useful for instance if the user
    //is copy pasting text from somewhere else.
    this.setState({
      questionText: value.slice(0, this.state.questionCharLimit)
    })
  }

  changeLocationText = (e) => {
    e.preventDefault()
    e.stopPropagation()
    const value = e.target.value.replace('\n', '')

    this.setState({
      locationText: value
    })
  }

  disableEnter(e) {
    if (e.which === 13) { //enter
      e.preventDefault()
      e.stopPropagation()
    }
  }

  handleFormSubmit = (e) => {
    e.preventDefault()
    e.stopPropagation()
    //TODO: submit data to the backend here
    //Maybe trigger a loading state on sidepanel?  Or can trigger
    //it on the actual classpage?
    updateQueue({
      text: this.state.questionText,
      location: this.state.locationText
    })
    this.setState({questionText: '', locationText: ''}, () => {
      this.props.toggleExpandingSidePanel()
    })
  }

  renderQuestionSection() {
    return (
      <div className={styles.questionSection}>
        <div className={styles.questionTitle}>Question</div>
        <textarea className={styles.questionInput}
          placeholder='Start typing your question here.'
          value={this.state.questionText}
          onChange={this.changeQuestionText}
          ref='questionInput'
        />
        <div className={styles.questionCharacterLimit}>
          {`Characters: ${this.state.questionText.length}/${this.state.questionCharLimit}`}
        </div>
      </div>
    )
  }

  renderLocationSection() {
    return (
      <div className={styles.locationSection}>
        <div className={styles.locationTitle}>Location</div>
        <input
          className={styles.locationInput}
          placeholder='Where are you sitting?'
          value={this.state.locationText}
          onChange={this.changeLocationText}
          onKeyPress={this.disableEnter}
        />
      </div>
    )
  }

  renderForm() {
    return (
      <form
        className={styles.expandingSidePanelContent}
        onSubmit={this.handleFormSubmit}
      >
        <div className={styles.exitForm} onClick={this.closeSidePanel}>
          <CustomCross size='24px' color='#9b9b9b' makeX/>
        </div>
        <div className={styles.formHeader}>Join the queue</div>
        {this.renderQuestionSection()}
        {this.renderLocationSection()}
        <button className={styles.submit} action='submit'>Submit</button>
      </form>
    )
  }

  render() {
    if (!this.props.isOpen) return null
    return (
      <div
        // onKeyDown={this.props.toggleExpandingSidePanel}
        // tabIndex='0'
      >
        <div className={styles.mask}
          onClick={this.closeSidePanel}
        />
        <div className={styles.expandingSidePanel}>
          {this.renderForm()}
        </div>
      </div>
    )
  }
}

export default ExpandingSidePanel
