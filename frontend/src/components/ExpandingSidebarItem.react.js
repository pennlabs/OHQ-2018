import React, { Component } from 'react'

import styles from './../../style/expandingsidebaritem.scss'

class ExpandingSidebarItem extends Component {

  getClassName() {
    let className = styles.expandingSidebarItem
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

ExpandingSidebarItem.propTypes = {
  title: React.PropTypes.string,
  isSelected: React.PropTypes.bool,
  isActive: React.PropTypes.bool,
}

export default ExpandingSidebarItem
