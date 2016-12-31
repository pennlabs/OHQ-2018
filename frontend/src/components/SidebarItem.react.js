import React, { Component } from 'react'

import styles from './../../style/sidebaritem.scss'

class SidebarItem extends Component {

  getClassName() {
    let className = styles.sidebarItem
    if (this.props.isSelected) {
      className = `${className} ${styles.isSelected}`
    }
    if (this.props.isActive) {
      className = `${className} ${styles.isActive}`
    }
    return className
  }

  render() {
    return (
      <div className={this.getClassName()}>
        {this.props.title}
      </div>
    )
  }
}

SidebarItem.propTypes = {
  title: React.PropTypes.string,
  isSelected: React.PropTypes.bool,
  isActive: React.PropTypes.bool,
}

export default SidebarItem
