import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import styles from './../../style/Main.less'
// import ClassPage from './ClassPage.react'
import { joinClass as emitJoinClass } from './../sockets/emitToSocket'

// This component acts as a controller.  When a potential path is provided, this component
// waits to see if a the path is valid, and renders the app according to the three possible states
// (TA, Student, Invalid)
class VerifyClass extends Component {

  static propTypes = {
    // from react-router
    location: PropTypes.object
    // from redux
  }

  state = {
    pending: true
  }

  componentDidMount() {
    emitJoinClass({ link: this.props.location.pathname.slice(1) })
  }

  render() {
    return (
      <div className={styles.container}>
        path is {this.props.location.pathname}
        <br />
        status is {this.props.joinClassStatus}
        {/* <ClassPage /> */}
      </div>
    )
  }
}

function mapStateToProps({ joinClassStatus }) {
  return { joinClassStatus }
}

export default connect(mapStateToProps)(VerifyClass)
