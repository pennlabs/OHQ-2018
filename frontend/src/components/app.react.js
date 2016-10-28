import React, { Component } from 'react'
import CommentBox from './CommentBox.react'
import Header from './Header.react'

export default class App extends Component {
  render() {
    (async () => {
      await console.log('es7!')
    })()
    return (
      <div>
      Hello, world!
        <Header />
        {this.props.children}
      </div>
    )
  }
}
