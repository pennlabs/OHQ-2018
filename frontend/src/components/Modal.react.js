
//This file is a generic modal container that wraps child elements.
//It implements a custom render function to render child components
//and mounts them to a custom node separate from the default root node,
//but at the same level as it.

import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import { Store } from './../index'

class Modal extends Component {

  componentDidMount() {
    this.modalTarget = document.createElement('div')
    this.modalTarget.className = 'modal'
    document.body.appendChild(this.modalTarget)
    this._render()
  }

  componentDidUpdate() {
    this._render()
  }

  componentWillUnmount() {
    ReactDOM.unmountComponentAtNode(this.modalTarget)
    document.body.removeChild(this.modalTarget)
  }

  _render() {
    ReactDOM.render(
      <Provider store={Store}>
        <div>{this.props.children}</div>
      </Provider>,
      this.modalTarget
    )
  }

  render() {
    return null
  }
}

export default Modal
