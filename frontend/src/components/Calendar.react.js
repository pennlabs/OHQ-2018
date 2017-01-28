import React, { Component } from 'react'

import CalendarItem from './CalendarItem.react'
import styles from './../../style/calendar.scss'

class Calendar extends Component {
  renderSessions() {
    let key = 0
    const sessions = this.props.sessions.map(data => 
        <CalendarItem {...data} key={data.day + data.timeStart} />
    )
    return (
      <div className={styles.calendarItems}>
       {sessions}
      </div>
    )
  }

  render() {
    return (
      <div className={styles.container}>
      	<div className={styles.title}>
          This week's office hours 
        </div>
        <div className={styles.calendar}>
          <div className={styles.calendarSide}>
            <div>8AM</div>
            <div>10PM</div>
          </div>
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