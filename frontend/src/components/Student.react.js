import React from 'react'

class Student extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			names: this.props.names
		}
	}

	handleRemove(e, name) {
		let i = state.names.indexOf(name)
		let n = state.names.splice(i, 1)
		this.setState(names: n)
	}

	render() {
		return (
			{state.names.map( (name) => {
            	return <span>{name}</span>
	        		<button onclick={(e)=>this.handleRemove(e, {name})}>
	        			Remove
	        		</button>
          	})}
   		)
	}

}
export default Student