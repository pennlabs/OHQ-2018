import React, { Component } from 'react'
import { Link } from 'react-router'

import styles from './../../style/Main.scss'
import Sidebar from './Sidebar.react'
import ClassPage from './ClassPage.react'

class Main extends Component {

  render() {
    const classes = [
      {title: 'PHIL 473'},
      {title: 'CIS 110', isActive: true, isSelected: true},
      {title: 'URBS 243', isActive: true},
      {title: 'WRIT 030'},
      {title: 'MATH 455'},
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
