import React, { Component } from 'react'
import { connect } from 'react-redux'

import styles from './../../style/class.scss'

class Class extends Component {

  render() {

    return (
      <nav className={styles.class}>
        <div className={styles.classInfo}>
          THIS IS A CLASS
        </div>
      </nav>
    )
  }
}

function mapStateToProps(state) {
  return { authenticated: state.auth.authenticated }
}
export default connect(mapStateToProps)(Class)
