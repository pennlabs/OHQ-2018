import React, { Component, PropTypes } from 'react'

import styles from './../../style/SidebarItem.less'

class SidebarItem extends Component {

  static propTypes = {
    name: PropTypes.string,
    isSelected: PropTypes.bool,
    isActive: PropTypes.bool,
    id: PropTypes.number,
    onClick: PropTypes.func,
    isTA: PropTypes.bool
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
    if (this.props.isTA) {
      className = `${className} ${styles.isTA}`
    }
    return className
  }

  render() {
    return (
      <div className={this.getClassName()} onClick={this.onClick}>
        {this.props.name}
      </div>
    )
  }
}

export default SidebarItem
