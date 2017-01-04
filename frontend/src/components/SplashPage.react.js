import React, { Component } from 'react'
import { Link } from 'react-router'

import logo from './../../images/Splash.png'
import labsImg from './../../images/LabsLogo.png'
import styles from './../../style/SplashPage.scss'

class SplashPage extends Component {

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

export default SplashPage
