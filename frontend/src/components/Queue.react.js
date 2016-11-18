import React from 'react'

class Queue extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      list: ['suzanne', 'julia', 'aaron', 'tiff'],
    }
  }

  handleChange = (name) => {
    console.log(name)
    const ourList = this.state.list
    let index = ourList.lastIndexOf(name)
    ourList.splice(index, 1)
    this.setState({
      list: ourList
    })
  }

  render() {
    return (
      <div>
      <form>
        <button action='submit'>
          Add Name
        </button>
        <button action='submit'>
          Remove
        </button>
      </form>
      <ul>
        {this.state.list.map((listValue) => {
          return (
            <div
             onClick={e => {
               this.handleChange(listValue)
             }}
            >
              {listValue}
            </div>
          )
        })}
      </ul>
      </div>
    )
  }
}

export default Queue
