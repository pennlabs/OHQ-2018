import React, { Component } from 'react'
import { connect } from 'react-redux'

import styles from './../../style/header.scss'

class Header extends Component {
  renderSigninLink() {
    if (this.props.authenticated) {
      return 'Hello, user!'
    }
    return 'Log in'
  }

  render() {

    return (
      <nav className={styles.header}>
        <div className={styles.headerLinks}>
          This is my header!
          <div>Link 1</div>
          <div>Link 2</div>
          <div>{this.renderSigninLink()}</div>
        </div>
      </nav>
    )
  }
}

function mapStateToProps(state) {
  return { authenticated: state.auth.authenticated }
}
export default connect(mapStateToProps)(Header)
