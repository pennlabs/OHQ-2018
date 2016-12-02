import React, { Component } from 'react'

import CalendarItem from './CalendarItem.react'
import styles from './../../style/calendar.scss'

class Calendar extends Component {

    renderSessions() {
      let key = 0
      return (
        this.props.sessions.map(data => { 
          <CalendarItem {...data} key={key}/>
          key++
        })
      )
    }

  render() {
    return (
      <div className={styles.container}>
      	<div className={styles.title}>
          This week's office hours 
        </div>
      	<div className={styles.calendar}> 
      	hi
        {this.renderSessions()}
      	</div>
      </div>
    )
  }
}

Calendar.propTypes = {
  sessions: React.PropTypes.array,
}

export default Calendar