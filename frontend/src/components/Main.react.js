import React, { Component } from 'react'

import styles from './../../style/Main.less'
import Sidebar from './Sidebar.react'
import ClassPage from './ClassPage.react'

// NOTE: strip sidebar for now while implementing first version
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
