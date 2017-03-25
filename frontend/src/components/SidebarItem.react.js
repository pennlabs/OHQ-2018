import React, { Component, PropTypes } from 'react'

import styles from './../../style/SidebarItem.less'

class SidebarItem extends Component {

  static propTypes = {
    name: PropTypes.string,
    isSelected: PropTypes.bool,
    isActive: PropTypes.bool,
    id: PropTypes.number,
    onClick: PropTypes.func,
    isTAForSelectedClass: PropTypes.bool,
    isTAForThisClass: PropTypes.bool,
  }

  onClick = () => {
    this.props.onClick(this.props.id)
  }

  getClassName() {
    let className = styles.sidebarItem
    if (this.props.isSelected) {
      className = `${className} ${styles.isSelected}`
    }
    if (this.props.isActive) {
      className = `${className} ${styles.isActive}`
    }
    if (this.props.isTAForSelectedClass) {
      className = `${className} ${styles.isTA}`
    }
    return className
  }

  renderName() {
    if (this.props.isTAForThisClass) {
      return `${this.props.name} (TA)`
    }
    return this.props.name
  }

  render() {
    return (
      <div className={this.getClassName()} onClick={this.onClick}>
        {this.renderName()}
      </div>
    )
  }
}

export default SidebarItem
