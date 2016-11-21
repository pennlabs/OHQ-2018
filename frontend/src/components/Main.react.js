import React, { Component } from 'react'
import { Link } from 'react-router'


import styles from './../../style/main.scss'
import SideBar from './SideBar.react'
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
				<SideBar classes={classes}/>
        <ClassPage />
      </div>
    )
  }
}

export default Main
