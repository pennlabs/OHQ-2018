import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import styles from './../../style/Sidebar.less'
import SidebarItem from './SidebarItem.react'
import CustomCross from './CustomCross.react'
import { updateSelectedClass } from './../actions/index.js'

class Sidebar extends Component {

  static propTypes = {
    //from redux
    userInfo: PropTypes.object,
    classes: PropTypes.object,
    selectedClass: PropTypes.number,
    updateSelectedClass: PropTypes.func
  }

  //TODO: update select only an active class if one is available;
  //also need some kind of default state for if no classes are online.
  componentWillMount() {
    // if there is at least one active class, select the first one by default.
    if (this.props.selectedClass == null && this.props.classes) {
      this.props.updateSelectedClass(+Object.keys(this.props.classes)[0])
    }
  }

  isUserTAForSelectedClass() {
    const { classes, selectedClass, userInfo } = this.props
    if (classes == null || selectedClass == null || userInfo == null) return null
    return classes[selectedClass].TAs.includes(userInfo.id)
  }

  isUserTAForThisClass(classId) {
    const { classes, userInfo } = this.props
    if (classes == null || userInfo == null || classId == null) return null
    return classes[classId].TAs.includes(userInfo.id)
  }

  getClassName() {
    let className = styles.sidebar
    if (this.isUserTAForSelectedClass()) {
      className = `${className} ${styles.TA}`
    }
    return className
  }

  renderLinks() {
    const sidebarLinks = this.props.classes
      ? Object.values(this.props.classes).map(data =>
        <SidebarItem
          {...data}
          isTAForThisClass={this.isUserTAForThisClass(data.id)}
          isTAForSelectedClass={this.isUserTAForSelectedClass()}
          isSelected={data.id === this.props.selectedClass}
          key={data.id}
          onClick={this.props.updateSelectedClass}
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
          <CustomCross color='white' size='22px' />
          <div className={styles.footerSpace} />
          <p className={styles.footerText}>Add Courses</p>
        </div>
      </nav>
    )
  }
}

function mapStateToProps({ selectedClass, classes, userInfo }) {
  return {
    selectedClass,
    classes,
    userInfo
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updateSelectedClass: (id) => { dispatch(updateSelectedClass(id)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)
