import React, { Component } from 'react'

import styles from './../../style/calendaritem.scss'

class CalendarItem extends Component {

  getDuration(start, end) {

  }

  // Parses time HH:MM into twelve-hour time
  // Turns 2:00 -> 2
  // Adds 'am' & 'pm' 
  getTime(time) {
    var times = time.split(':')
    var hr = parseInt(times[0])
    var min = times[1]

    if (min === '00') {
      min = ''
    } else {
      min = ':' + min
    }

    if (hr && hr > 12) {
      hr -= 12
      min += ' pm'
    } else {
      min += ' am'
    }

    return (hr + min)
  }

  render() {
    return (
    	<div className={[styles.item, styles[this.props.day]].join(' ')}> 
    		{this.getTime(this.props.timeStart)} - {this.getTime(this.props.timeEnd)}
    	</div>
    )
  }
}

CalendarItem.propTypes = {
  day: React.PropTypes.string,
  timeStart: React.PropTypes.string,
  timeEnd: React.PropTypes.string,
}

export default CalendarItem
