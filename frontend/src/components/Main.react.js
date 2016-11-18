import React, { Component } from 'react'
import { Link } from 'react-router'


import styles from './../../style/main.scss'
import SideBar from './SideBar.react'

class Main extends Component {

  render() {
    return (
      <div className={styles.container}>
				<SideBar />
				<div className={styles.content}>
					<div>Hello, world!</div>
          <Link to='/signin'>Sign in</Link>
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default Main
