import React, { Component } from 'react'

import styles from './../../style/customcross.scss'

class CustomCross extends Component {

  getDimensions() {
    if (!(this.props.height && this.props.width)) return null
    const { height, width } = this.props
    return { height, width }
  }

  getCrossColor() {
    if (!this.props.color) return null
    const { color: backgroundColor } = this.props
    return { backgroundColor }
  }

  render() {
    return (
      <div
        className={this.props.customClassName}
        style={this.getDimensions()}
      >
        <div
          className={styles.horizontalBar}
          style={this.getCrossColor()}
        />
        <div
          className={styles.verticalBar}
          style={this.getCrossColor()}
        />
      </div>
    )
  }
}

//use height and width if the cross doesn't need to be responsive;
//else use a custom class name to set the height and width.
//Only use one or the other!
CustomCross.propTypes = {
  height: React.PropTypes.string,
  width: React.PropTypes.string,
  color: React.PropTypes.string,
  customClassName: React.PropTypes.string,
}

export default CustomCross
