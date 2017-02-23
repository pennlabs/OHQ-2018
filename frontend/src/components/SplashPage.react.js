import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, browserHistory } from 'react-router'

import logo from './../../images/Splash.png'
import labsImg from './../../images/LabsLogo.png'
import styles from './../../style/SplashPage.less'

class SplashPage extends Component {

  componentWillMount() {
    if (this.props.authenticated) {
      browserHistory.push('/')
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.authenticated) {
      browserHistory.push('/')
    }
  }

  render() {
    return (
      <div className={styles.splashpage}>
        <img className={styles.logo} src={logo} />
        <Link className={styles.button} to=''>Log In with PennKey</Link>
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
    )
  }
}

function mapStateToProps(state) {
  return { authenticated: state.auth.authenticated }
}

export default connect(mapStateToProps)(SplashPage)
