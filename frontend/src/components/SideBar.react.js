import React, { Component } from 'react'

import styles from './../../style/sidebar.scss'
import SidebarItem from './SidebarItem.react'

class SideBar extends Component {

  renderLinks() {

  }

  render() {
    return (
      <nav className={styles.sidebar}>
        <div className={styles.sidebarTitle}>
          OHQ
        </div>
        <div className={styles.sidebarLinks}>
          <SidebarItem title='link 1'/>
          <SidebarItem title='link 2' isActive isSelected/>
          <SidebarItem title='link 3' isActive/>
          <SidebarItem title='link 4'/>
          <SidebarItem title='link 5'/>
          <SidebarItem title='link 6'/>
        </div>
        <div className={styles.sidebarFooter}>
          <span className={styles.plus}>+</span> Add classes
        </div>
      </nav>
    )
  }
}

SideBar.propTypes = {
  classes: React.PropTypes.array,
}

export default SideBar
