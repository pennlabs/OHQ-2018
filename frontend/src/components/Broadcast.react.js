import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { updateBroadcast as emitUpdateBroadcast } from './../sockets/emitToSocket'

class Broadcast extends Component {

  static propTypes = {
    broadcastMessage: PropTypes.string,
    selectedClassId: PropTypes.number,
    isUserTAForSelectedClass: PropTypes.bool
  }

  state = {
    broadcastMessage: ''
  }

  // Don't think we need to handle a user becoming a TA in the middle of a session
  componentWillReceiveProps({ broadcastMessage }) {
    if (broadcastMessage !== this.props.broadcastMessage) {
      this.setState({ broadcastMessage })
    }
  }

  componentWillMount() {
    if (this.props.broadcastMessage) {
      this.setState({ broadcastMessage: this.props.broadcastMessage })
    }
  }

  onChange = (e) => {
    e.preventDefault()
    e.stopPropagation()
    this.setState({ broadcastMessage: e.target.value })
  }

  updateBroadcastMessage = () => {
    emitUpdateBroadcast({
      classId: this.props.selectedClassId,
      broadcast: this.state.broadcastMessage
    })
  }

  renderHeader(string) {
    return (
      <div>{string}</div>
    )
  }

  renderStudentBroadcast() {
    return (
      <div>
        {this.renderHeader('Announcements')}
        <div>{this.props.broadcastMessage || 'No Announcements'}</div>
      </div>
    )
  }

  renderTABroadcast() {
    return (
      <div>
        {this.renderHeader('Announcements')}
        <input value={this.state.broadcastMessage} onChange={this.onChange} />
        <button onClick={this.updateBroadcastMessage}>Update Announcement</button>
      </div>
    )
  }

  render() {
    return this.props.isUserTAForSelectedClass
      ? this.renderTABroadcast()
      : this.renderStudentBroadcast()
  }
}

function mapStateToProps({ classInfo, classLinks }) {
  return { classInfo, classLinks }
}

export default connect(mapStateToProps)(Broadcast)
