import React, { Component } from 'react'
import { Link } from 'react-router'


import styles from './../../style/main.scss'
import SideBar from './SideBar.react'
import ClassPage from './ClassPage.react'

class Main extends Component {

  render() {
    return (
      <div className={styles.container}>
				<SideBar />
        <ClassPage />
      </div>
    )
  }
}

export default Main
