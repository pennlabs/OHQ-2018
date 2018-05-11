import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, browserHistory } from 'react-router'

import { joinClass as emitJoinClass } from './../sockets/emitToSocket'

import logo from './../../images/Splash.png'
import labsImg from './../../images/LabsLogo.png'
import styles from './../../style/SplashPage.less'

class SplashPage extends Component {

  state = {
    code: ''
  }

  // TODO: disable button until something is typed in.
  // Have a nice animation where the button lights up when something is typed
  changeCode = (e) => {
    e.preventDefault()
    e.stopPropagation()
    const val = e.target.value.trim() // no whitespace
    this.setState({ code: val.slice(0, 4) })
  }

  submitCode = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (this.state.code.length < 4) return
    browserHistory.push(this.state.code)
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
            <div className={styles.button} to=''>Create a session</div>
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



export default SplashPage
