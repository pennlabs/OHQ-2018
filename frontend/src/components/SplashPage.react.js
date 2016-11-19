import React, { Component } from 'react'

import { Link } from 'react-router'


import styles from './../../style/splashpage.scss'

class SplashPage extends Component {

  render() {
    return (
      <div className={styles.splashpage}>
        <img className={styles.logo} src={'https://cdn.zeplin.io/5827a5a8096f25bc1a22dab7/assets/1062CC45-9B56-46DA-BA4F-3B35C0AB32CE.png'} />
        <Link className={styles.button} to=''>Log In with PennKey</Link>
         <div
           className={styles.labs}>
           <span>Developed by<br/></span>
           <img
            src={'https://cdn.zeplin.io/5827a5a8096f25bc1a22dab7/assets/91F41CD0-1042-429B-A05B-FD0AE7C7B3A2.png'}
          />
          </div>
      </div>
    )
  }
}

export default SplashPage
