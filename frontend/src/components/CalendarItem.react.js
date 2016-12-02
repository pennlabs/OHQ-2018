import React, { Component } from 'react'

import styles from './../../style/calendaritem.scss'

class CalendarItem extends Component {

  render() {
    return (
      <div className={styles.item}>
        {this.props.timeStart} - {this.props.timeEnd}
        session ok
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
