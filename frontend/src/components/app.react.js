import { Component } from 'react'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'

class App extends Component {

  componentWillMount() {
    //If the user is not auth'd, redirect to the signin page
    if (!this.props.authenticated) {
      browserHistory.push('/signin')
    }
  }

  render() {
    (async () => {
      await console.log('es8!')
      console.log('test')
    })()
    return this.props.children
  }
}

function mapStateToProps(state) {
  return { authenticated: state.auth.authenticated }
}

export default connect(mapStateToProps)(App)
