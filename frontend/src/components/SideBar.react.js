import React, { Component } from 'react'

import styles from './../../style/sidebar.scss'

class SideBar extends Component {

  render() {
    return (
      <nav className={styles.sidebar}>
        <div className={styles.sidebarLinks}>
          <div>Link 1</div>
          <div>Link 2</div>
          <div>Link 3</div>
          <div>Link 4</div>
          <div>Link 5</div>
          <div>Link 6</div>
          <div>Link 7</div>
          <div>Link 8</div>
        </div>
      </nav>
    )
  }
}

export default SideBar
