import React, { Component } from 'react'
import { Link } from 'react-router'

import Header from './Header.react'

export default class App extends Component {
  render() {
    (async () => {
      await console.log('es8!')
    })()
    return (
      <div>
        <Header />
        <div> This will be the splash page</div>
        <Link to='signin'> Log In </Link><br/>
        <Link to='class'> Class - main view </Link><br/>
        <Link to='class/queue'> Queue </Link><br/>
        {this.props.children}
      </div>
    )
  }
}
