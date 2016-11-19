import React, { Component } from 'react'

import { Link } from 'react-router'


import styles from './../../style/splashpage.scss'

class SplashPage extends Component {

  render() {
    return (
      <div className={styles.splashpage}>
        <div className={styles.signin} >
        	<div className={styles.title}>
        		Office Hours Queue
        	</div>
        		
    		<Link className={styles.button} to=''>SIGN IN</Link>
        	

        </div>
      </div>
    )
  }
}

export default SplashPage
