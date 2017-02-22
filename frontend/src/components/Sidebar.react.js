import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import styles from './../../style/Sidebar.scss'
import SidebarItem from './SidebarItem.react'
import CustomCross from './CustomCross.react'
import { updateSelectedClass } from './../actions/index.js'

class Sidebar extends Component {

  static propTypes = {
    //from redux
    classes: PropTypes.object,
    selectedClass: PropTypes.number,
    updateSelectedClass: PropTypes.func
  }

  //TODO: update select only an active class if one is available;
  //also need some kind of default state for if no classes are online.
  componentWillMount() {
    if (this.props.selectedClass == null && this.props.classes) {
      this.props.updateSelectedClass(+Object.keys(this.props.classes)[0])
    }
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
          <CustomCross color='white' size='22px'/>
          <div className={styles.footerSpace} />
          <p className={styles.footerText}>Add Courses</p>
        </div>
      </nav>
    )
  }
}

function mapStateToProps({selectedClass, classes, userInfo}) {
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
