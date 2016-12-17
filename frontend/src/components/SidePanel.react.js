import React, { Component } from 'react'

import styles from './../../style/sidepanel.scss'

class SidePanel extends Component {

  constructor(props) {
    super(props)
    this.state = {
      questionCharLimit: 200,
      questionText: '',
      locationText: ''
    }
  }

  componentDidMount() {
    this.refs.questionInput.focus()
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

  disableEnter = (e) => {
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

    this.setState({questionText: '', locationText: ''}, () => {
      this.props.toggleSidePanel()
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
        className={styles.sidePanelContent}
        onSubmit={this.handleFormSubmit}
      >
        <div className={styles.exitForm}>X</div>
        <div className={styles.formHeader}>Join the queue</div>
        {this.renderQuestionSection()}
        {this.renderLocationSection()}
        <button className={styles.submit} action='submit'>Submit</button>
      </form>
    )
  }

  render() {
    return (
      <div
        // onKeyDown={this.props.toggleSidePanel}
        // tabIndex='0'
      >
        <div className={styles.mask}
          onClick={this.props.toggleSidePanel}
        />
        <div className={styles.sidePanel}>
          {this.renderForm()}
        </div>
      </div>
    )
  }
}

SidePanel.propTypes = {
  toggleSidePanel: React.PropTypes.func
}

export default SidePanel
