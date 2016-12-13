import React, { Component } from 'react'

import styles from './../../style/customcross.scss'

class CustomCross extends Component {

  getDimensions() {
    //return null if a custom classname has been passed
    if (!this.props.size || this.props.customClassName) return null
    const { size } = this.props
    return { height: size, width: size }
  }

  getCrossColor() {
    if (!this.props.color) return null
    const { color: backgroundColor } = this.props
    return { backgroundColor }
  }

  //using JS styles because they're cleaner than using css here
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

//use size if the cross doesn't need to be responsive;
//else use a custom class name to set the height and width.
//Only use one or the other!
CustomCross.propTypes = {
  size: React.PropTypes.string,
  color: React.PropTypes.string,
  customClassName: React.PropTypes.string,
}

export default CustomCross
