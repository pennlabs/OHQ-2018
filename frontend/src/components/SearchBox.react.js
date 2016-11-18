import React from 'react'
import styles from './../../style/searchbox.scss'

class SearchBox extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      comment: '',
    }
  }

  handleChange = (e) => {
    this.setState({
      comment: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    e.stopPropagation()
    this.setState({
      comment: ''
    })
  }

  render() {
    return (
      <nav className={styles.searchBox}>
      <form
        onSubmit={this.handleSubmit}
        className='searchBox'
      >
        <textarea
          value={this.state.comment}
          onChange={this.handleChange}
        />
        <button action='submit'>
          Add Name
        </button>
      </form>
      </nav>
    )
  }
}

export default SearchBox
