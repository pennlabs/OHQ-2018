import React, { Component } from 'react'

import styles from './../../style/SidebarItem.scss'

class SidebarItem extends Component {

  static propTypes = {
    name: React.PropTypes.string,
    isSelected: React.PropTypes.bool,
    isActive: React.PropTypes.bool,
  }

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
        {this.props.name}
      </div>
    )
  }
}

export default SidebarItem
