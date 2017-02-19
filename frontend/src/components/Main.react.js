import React, { Component } from 'react'
import { Link } from 'react-router'

import styles from './../../style/Main.scss'
import Sidebar from './Sidebar.react'
import ClassPage from './ClassPage.react'

class Main extends Component {

  render() {
    return (
      <div className={styles.container}>
				<Sidebar isTAForCurrentClass/>
        <ClassPage />
      </div>
    )
  }
}

export default Main
