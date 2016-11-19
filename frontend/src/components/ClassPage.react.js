import React, { Component } from 'react'

import Queue from './Queue.react'
import ClassInfoTitle from './ClassInfoTitle.react'
import styles from './../../style/classpage.scss'

class ClassPage extends Component {

  render() {
    return (
      <div className={styles.container}>
        <ClassInfoTitle
          teacher='John Doe'
          classCode='CIS 110'
          location='Moore 001'
        />
        <Queue //TODO: the props will be handled by node and redux
          line={[
            {name: 'foo'},
            {name: 'bar'},
            {name: 'baz', isUser: true},
            {name: 'wibble'},
            {name: 'wobble'},
          ]}
        />
      </div>
    )
  }
}

export default ClassPage
