import React, { Component } from 'react'
import { reduxForm } from 'redux-form'
import * as actions from './../../actions/index'

class Signin extends Component {

	handleFormSubmit = ({email, password}) => {
		console.log(email, password)
		this.props.signinUser({email, password})
	}

	renderAlert() {
		if (!this.props.errorMessage) {
			return null
		}
		return (
			<div className='alert alert-danger'>
				Invalid Username/Password
			</div>
		)
	}

	render() {

		const { handleSubmit, fields: { email, password }} = this.props

		return (
			<form onSubmit={handleSubmit(this.handleFormSubmit)}>
				<fieldset className='form-group'>
					<label>Email</label>
					<input {...email} className='form-control'></input>
				</fieldset>
				<fieldset className='form-group'>
					<label>Password</label>
					<input {...password} type='password' className='form-control'></input>
				</fieldset>
				{this.renderAlert()}
				<button action='submit' className='btn btn-primary'>Signin</button>
			</form>
		)
	}
}

function mapStateToProps(state) {
	return { errorMessage: state.auth.error}
}

export default reduxForm({
	form: 'signin',
	fields: ['email', 'password']
}, mapStateToProps, actions)(Signin)

// export default Signin
