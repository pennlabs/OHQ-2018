import React, { Component } from 'react'

import styles from './../../style/sidebar.scss'
import SidebarItem from './SidebarItem.react'
import CustomCross from './CustomCross.react'

class SideBar extends Component {

  renderLinks() {
    const sidebarLinks = this.props.classes
    ? this.props.classes.map(data => <SidebarItem {...data} key={data.title}/>)
    : <p className={styles.noClassText}>No Classes</p>

    const className = this.props.classes
    ? styles.sidebarLinks
    : `${styles.sidebarLinks} ${styles.noLinks}`

    return (
      <div className={className}>
        {sidebarLinks}
      </div>
    )
  }

  render() {
    return (
      <nav className={styles.sidebar}>
        <div className={styles.sidebarTitle}>
          OHQ
        </div>
        {this.renderLinks()}
        <div className={styles.sidebarFooter}>
          <CustomCross color='white' height='20px' width='20px'/>
          <div className={styles.footerSpace} />
          <p className={styles.footerText}>Add Courses</p>
        </div>
      </nav>
    )
  }
}

SideBar.propTypes = {
  classes: React.PropTypes.array,
}

export default SideBar
