import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link, browserHistory } from 'react-router'
import { get } from 'lodash'

import {
  joinClass as emitJoinClass,
  createClass as emitCreateClass
} from './../sockets/emitToSocket'

import { SocketActions } from './../../../shared'

import logo from './../../images/Splash.png'
import labsImg from './../../images/LabsLogo.png'
import styles from './../../style/SplashPage.less'

class SplashPage extends Component {

  static propTypes = {
    // from redux
    joinedClassStatus: PropTypes.string,
    classLinks: PropTypes.object,
  }

  state = {
    code: '',
    TALocation: '',
    TAClassName: '',
  }

  // TODO: error message when submitting invalid link
  componentWillReceiveProps(nextProps) {
    const status = get(nextProps, 'joinedClassStatus')
    if (status == null) {
      return
    }
    if (status === SocketActions.CLASS_JOINED_STUDENT) {
      browserHistory.push(`/${this.state.code}`)
    } else if (status === SocketActions.CLASS_JOINED_TA) {
      browserHistory.push(`/${nextProps.classLinks.TALink}`)
    }
  }

  changeCode = (e) => {
    e.preventDefault()
    e.stopPropagation()
    const val = e.target.value.trim() // no whitespace
    this.setState({ code: val.slice(0, 4) })
  }

  changeTALocation = (e) => {
    e.preventDefault()
    e.stopPropagation()
    this.setState({ TALocation: e.target.value })
  }

  changeTAClassName = (e) => {
    e.preventDefault()
    e.stopPropagation()
    this.setState({ TAClassName: e.target.value })
  }

  submitCode = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (this.state.code.length === 4) {
      // browserHistory.push(this.state.code)
      emitJoinClass({ link: this.state.code })
    }
  }

  submitCreateClass = (e) => {
    e.preventDefault()
    e.stopPropagation()
    // TODO: show error when not enough info
    if (this.state.TAClassName.length > 0 && this.state.TALocation.length > 0) {
      emitCreateClass({
        name: this.state.TAClassName,
        location: this.state.TALocation,
      })
    }
  }

  render() {
    return (
      <div className={styles.splashpage}>
        <img className={styles.logo} src={logo} />
        <div className={styles.buttonRow}>
          <div className={styles.buttonUnit}>
            {/* <div className={styles.helperText}>For Students</div> */}
            <div
              className={this.state.code.length < 4
                ? `${styles.button} ${styles.disabled}`
                : styles.button}
              onClick={this.submitCode}
            >
              {this.state.code.length < 4 ? '(Students) Enter code' : 'Join!'}
            </div>
            <input className={styles.inputBox} value={this.state.code} onChange={this.changeCode} />
          </div>
          <div className={styles.buttonUnit}>
            <div className={styles.helperText}>For TAs</div>
            <div
              className={styles.button}
              onClick={this.submitCreateClass}
            >
              Create a session
            </div>
            Location
            <input
              className={styles.inputBox}
              value={this.state.TALocation}
              onChange={this.changeTALocation}
            />
            Class
            <input
              className={styles.inputBox}
              value={this.state.TAClassName}
              onChange={this.changeTAClassName}
            />
            <div
              className={styles.labs}
            >
              <p>Developed by</p>
              <img
                className={styles.labsImg}
                src={labsImg}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps({ joinedClassStatus, classLinks }) {
  return { joinedClassStatus, classLinks }
}


export default connect(mapStateToProps)(SplashPage)
