import React, { Component } from 'react'

import styles from './../../style/calendaritem.scss'

class CalendarItem extends Component {

  render() {
    return (
    	<div className={[styles.item, styles[this.props.day]].join(' ')}> 
    		{this.props.timeStart} - {this.props.timeEnd}
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
