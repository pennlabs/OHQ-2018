import React, { Component } from 'react'

import CalendarItem from './CalendarItem.react'
import styles from './../../style/Calendar.scss'

class Calendar extends Component {
  renderSessions(sessions) {
    let items = []
    for (var day in sessions) {
      items.push( <CalendarItem sessions={sessions[day]} day={day} key={day} />)
    }
    
    return (
      <div className={styles.calendarItems}>
       {items}
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
          {this.renderSessions(this.props.sessions)}
        </div>
      </div>
    )
  }
}

Calendar.propTypes = {
  sessions: React.PropTypes.array,
}

export default Calendar