import React, { Component } from 'react'

import styles from './../../style/expandingsidebar.scss'
import ExpandingSidebarItem from './ExpandingSidebarItem.react'
import CustomCross from './CustomCross.react'

class ExpandingSidebar extends Component {

  getClassName() {
    let className = styles.expandingSidebar
    if (this.props.isTAForCurrentClass) {
      className = `${className} ${styles.TA}`
    }
    return className
  }

  renderLinks() {
    const expandingSidebarLinks = this.props.classes
    ? this.props.classes.map(data => <ExpandingSidebarItem {...data} key={data.title}/>)
    : <p className={styles.noClassText}>No Classes</p>

    const className = this.props.classes
    ? styles.expandingSidebarLinks
    : `${styles.expandingSidebarLinks} ${styles.noLinks}`

    return (
      <div className={className}>
        {expandingSidebarLinks}
      </div>
    )
  }

  render() {
    return (
      <nav className={this.getClassName()}>
        <div className={styles.expandingSidebarTitle}>
          OHQ
        </div>
        {this.renderLinks()}
        <div className={styles.expandingSidebarFooter}>
          <CustomCross color='white' size='22px'/>
          <div className={styles.footerSpace} />
          <p className={styles.footerText}>Add Courses</p>
        </div>
      </nav>
    )
  }
}

ExpandingSidebar.propTypes = {
  classes: React.PropTypes.array,
}

export default ExpandingSidebar
