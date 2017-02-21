import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { get } from 'lodash'

import styles from './../../style/Sidebar.scss'
import SidebarItem from './SidebarItem.react'
import CustomCross from './CustomCross.react'
import { updateSelectedClass } from './../actions/index.js'

class Sidebar extends Component {

  static propTypes = {
    //from redux
    classes: PropTypes.object,
    selectedClass: PropTypes.object,
    updateSelectedClass: PropTypes.func
  }

  updateSelectedClass = (id) => {
    this.props.updateSelectedClass(this.props.classes[id])
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
    ? Object.values(this.props.classes).map(data =>
        <SidebarItem
          {...data}
          isTAForCurrentClass={this.props.isTAForCurrentClass}
          isSelected={data.id === get(this.props, 'selectedClass.id', null)}
          key={data.id}
          onClick={this.updateSelectedClass}
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

function mapStateToProps({selectedClass, classes}) {
  return {
    selectedClass,
    classes
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updateSelectedClass: (id) => { dispatch(updateSelectedClass(id)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)
