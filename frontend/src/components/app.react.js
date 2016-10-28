import React, { Component } from 'react'
import { Link } from 'react-router'

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
      <Link to='/signin'>Test Link</Link>
        <Header />
        {this.props.children}
      </div>
    )
  }
}
