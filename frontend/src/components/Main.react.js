import React, { Component } from 'react'
import { Link } from 'react-router'

import styles from './../../style/Main.scss'
import Sidebar from './Sidebar.react'
import ClassPage from './ClassPage.react'

class Main extends Component {

  render() {
    const classes = [
      {title: 'link 1'},
      {title: 'link 2', isActive: true, isSelected: true},
      {title: 'link 3', isActive: true},
      {title: 'link 4'},
      {title: 'link 5'},
    ]
    return (
      <div className={styles.container}>
				<Sidebar classes={classes} isTAForCurrentClass/>
        <ClassPage />
      </div>
    )
  }
}

export default Main
