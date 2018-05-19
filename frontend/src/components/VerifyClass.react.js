import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import ClassPage from './ClassPage.react'
import { joinClass as emitJoinClass } from './../sockets/emitToSocket'
import { SocketActions } from './../../../shared'
import styles from './../../style/VerifyClass'

// This component acts as a controller.  When a potential path is provided, this component
// waits to see if a the path is valid, and renders the app according to the three possible states
// (TA, Student, Invalid)
class VerifyClass extends Component {

  static propTypes = {
    // from react-router
    location: PropTypes.object,
    // from redux
    joinedClassStatus: PropTypes.string,
  }

  componentDidMount() {
    emitJoinClass({ link: this.props.location.pathname.slice(1) })
  }

  renderInvalidLink() {
    return (
      <div className={styles.container}>
        Invalid link
        <br />
        path is {this.props.location.pathname}
        <br />
        status is {this.props.joinedClassStatus}
      </div>
    )
  }

  renderClassPage() {
    return <ClassPage path={this.props.location.pathname} />
  }

  render() {
    // loading state
    if (this.props.joinedClassStatus == null) {
      return <div />
    }
    if (this.props.joinedClassStatus === SocketActions.CLASS_JOINED_STUDENT
      || this.props.joinedClassStatus === SocketActions.CLASS_JOINED_TA) {
      return this.renderClassPage()
    }
    return this.renderInvalidLink()
  }
}

function mapStateToProps({ joinedClassStatus }) {
  return { joinedClassStatus }
}

export default connect(mapStateToProps)(VerifyClass)
