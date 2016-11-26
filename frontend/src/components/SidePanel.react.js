import React, { Component } from 'react'

import styles from './../../style/sidepanel.scss'

class SidePanel extends Component {

  render() {
    if (!this.props.isOpen) return null

    return (
      <div
        // onKeyDown={this.props.toggleSidePanel}
        // tabIndex='0'
      >
        <div className={styles.mask}
          onClick={this.props.toggleSidePanel}
        />

        <div className={styles.sidePanel}>
          Hello, world!
        </div>
      </div>
    )
  }
}

SidePanel.propTypes = {
  isOpen: React.PropTypes.bool,
  toggleSidePanel: React.PropTypes.func
}

export default SidePanel
