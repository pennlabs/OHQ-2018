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

  componentWillUpdate() {
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
