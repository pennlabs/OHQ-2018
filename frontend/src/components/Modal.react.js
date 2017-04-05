
//This file is a generic modal container that wraps child elements.
//It implements a custom render function to render child components
//and mounts them to a custom node separate from the default root node,
//but at the same level as it.

import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import { Store } from './../index'
import styles from './../../style/Modal.less'

class Modal extends Component {

  static propTypes = {
    shouldBlurBackground: React.PropTypes.bool,
    shouldDarkenBackground: React.PropTypes.bool,
    animationDuration: React.PropTypes.string,
    onCloseCallback: React.PropTypes.func,
  }

  componentDidMount() {
    this.modalTarget = document.createElement('div')
    this.modalTarget.className = 'modal'
    document.body.appendChild(this.modalTarget)
    document.querySelector('.container').style.filter = 'blur(3px)'
    this._render()
  }

  componentDidUpdate() {
    this._render()
  }

  componentWillUnmount() {
    ReactDOM.unmountComponentAtNode(this.modalTarget)
    document.body.removeChild(this.modalTarget)
    document.querySelector('.container').style.filter = ''
  }

  _render() {
    ReactDOM.render(
      <Provider store={Store}>
        <div>
          <div className={styles.mask}></div>
          {this.props.children}
        </div>
      </Provider>,
      this.modalTarget
    )
  }

  render() {
    return null
  }
}

export default Modal
