import React, { Component } from 'react'
// import { Link, Router } from 'react-router'
import { connect } from 'react-redux'


import Header from './Header.react'
// import CommentBox from './CommentBox.react'
import SplashPage from './SplashPage.react'
import Main from './Main.react'

class App extends Component {

  renderMain() {
    if (!this.props.authenticated) {
      return <SplashPage />
    }
    return <Main>{this.props.children}</Main>
  }

  render() {
    (async () => {
      await console.log('es8!')
    })()
    return (
      this.renderMain()
    )
  }
}

function mapStateToProps(state) {
  return { authenticated: state.auth.authenticated }
}
export default connect(mapStateToProps)(App)
