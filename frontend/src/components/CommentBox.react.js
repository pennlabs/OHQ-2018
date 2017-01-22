import React from 'react'

class CommentBox extends React.Component {

  state = {
    comment: '',
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
      <form
        onSubmit={this.handleSubmit}
        className='comment-box'
      >
        <textarea
          value={this.state.comment}
          onChange={this.handleChange}
        />
        <button action='submit'>
          Submit Comment
        </button>
      </form>
    )
  }
}

export default CommentBox
