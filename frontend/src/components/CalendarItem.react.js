import React, { Component } from 'react'

import styles from './../../style/CalendarItem.scss'

class CalendarItem extends Component {

  renderDay() {
    this.state = {
      currentPosition: 0,
    }
    const sessions = this.props.sessions.map(data => {
      return (
        <div style={this.itemStyle(data.start, data.end)} className={[styles.item, styles[this.props.day]].join(' ')} key={data.timeStart}>
          <div className={styles.itemText}>
            {this.getTime(data.start)} - {this.getTime(data.end)}
          </div>  
        </div>
        )
    })

    return <div className={styles.itemWrapper}>{sessions}</div>
  }

  getDuration(start, end) {
    const startTime = start.split(':'),
      endTime = end.split(':')

    const dHour = parseInt(endTime[0]) - parseInt(startTime[0])

    let startMin = startTime[1], endMin = endTime[1]

    if (!startMin) {
      startMin = 0
    } 

    if (!endMin) {
      endMin = 0
    }

    const dMin = endMin - startMin

    return (dHour + dMin / 60) * 100 / 14
  }

  getStart(time) {
    const times = time.split(':')
    const hour = parseInt(times[0]) - 8
    let min = times[1]

    if (min) {
      min = parseInt(times[1])
    } else {
      min = 0
    }

    return (hour + min / 60) * 100 / 14
  }



  itemStyle(start, end) {
    console.log("before: " + this.state.currentPosition);
    const dur = this.getDuration(start, end)
    const startPos = this.getStart(start) - this.state.currentPosition

    this.state.currentPosition += dur

    console.log("startPos for " + start + " is " + startPos)
    return {
      height: dur + "%",
      top: startPos + "%"
    }
  }

  // Parses time HH:MM into twelve-hour time
  // Turns 2:00 -> 2
  // Adds 'am' & 'pm' 
  getTime(time) {
    var times = time.split(':')
    var hour = parseInt(times[0])
    var min = times[1]

    if (! min || min === '00') {
      min = ''
    } else {
      min = ':' + min
    }

    if (hour && hour > 12) {
      hour -= 12
      min += 'PM'
    } else if (hour === 12) {
      min += 'PM'
    } else {
      min += 'AM'
    }

    return (hour + min)
  }


  render() {
    return (
      <div className={styles.container} >
        {this.renderDay()}
      </div>
    )
  }
}

CalendarItem.propTypes = {
  day: React.PropTypes.string,
  sessions: React.PropTypes.array,
}

export default CalendarItem
