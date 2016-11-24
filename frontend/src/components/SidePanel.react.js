import React, { Component } from 'react'

import styles from './../../style/sidepanel.scss'

class SidePanel extends Component {

  render() {
    if (!this.props.isOpen) return null

    return (
      <div className={styles.containerMask}
        onClick={this.props.toggleSidePanel}
      >
        <div className={styles.sidePanel} onClick={
          e => {
            e.preventDefault()
            e.stopPropagation()
          }}
        />
      </div>
    )
  }
}

SidePanel.propTypes = {
  isOpen: React.PropTypes.bool,
  toggleSidePanel: React.PropTypes.func
}

export default SidePanel
