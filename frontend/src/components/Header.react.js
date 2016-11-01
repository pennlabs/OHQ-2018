import React, { Component } from 'react'
import { connect } from 'react-redux'


class Header extends Component {

  render() {

    return (
      <div>
        <nav className='navbar navbar-light'>
          <ul className='nav navbar-nav'>
            <li className='nav-item'>
              {this.props.authenticated}
            </li>
          </ul>
        </nav>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {authenticated: state.auth.authenticated}
}
export default connect(mapStateToProps)(Header)



//
// import React, { Component } from 'react'
//
// class Header extends Component {
//
//   render() {
//
//     return (
//       <div>
//         <nav className='navbar navbar-light'>
//           <ul className='nav navbar-nav'>
//             <li className='nav-item'>
//               Sign in
//             </li>
//           </ul>
//         </nav>
//       </div>
//     )
//   }
// }
//
//
// export default Header
