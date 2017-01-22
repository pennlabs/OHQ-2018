import React, { Component } from 'react'

import styles from './../../style/Sidebar.scss'
import SidebarItem from './SidebarItem.react'
import CustomCross from './CustomCross.react'

class Sidebar extends Component {

  static propTypes = {
    classes: React.PropTypes.array,
  }

  getClassName() {
    let className = styles.sidebar
    if (this.props.isTAForCurrentClass) {
      className = `${className} ${styles.TA}`
    }
    return className
  }

  renderLinks() {
    const sidebarLinks = this.props.classes
    ? this.props.classes.map(data =>
        <SidebarItem
          {...data}
          isTAForCurrentClass={this.props.isTAForCurrentClass}
          key={data.title}
        />
      )
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
      <nav className={this.getClassName()}>
        <div className={styles.sidebarTitle}>
          OHQ
        </div>
        {this.renderLinks()}
        <div className={styles.sidebarFooter}>
          <CustomCross color='white' size='22px'/>
          <div className={styles.footerSpace} />
          <p className={styles.footerText}>Add Courses</p>
        </div>
      </nav>
    )
  }
}

export default Sidebar
