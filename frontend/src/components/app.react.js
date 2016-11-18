import React, { Component } from 'react'
import { Link } from 'react-router'

import CommentBox from './CommentBox.react'
import Header from './Header.react'
import Class from './Class.react'

export default class App extends Component {
  render() {
    (async () => {
      await console.log('es8!')
    })()
    return (
      <div>
        <Header />
        <Link to='/signin'>Test Link</Link>
        {this.props.children}
      </div>
    )
  }
}
