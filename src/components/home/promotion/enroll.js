import React from 'react'
import Fade from 'react-reveal/Fade'
import FormField from '../../ui/formFields'
import { validate } from '../../ui/misc'
import { dbPromos } from '../../../database'

class Enroll extends React.Component {

	state = {
		formError: false,
		formSuccess: '',
		formData: {
			email: {
				element: 'input',
				value: '',
				config: {
					name: 'email_input',
					type: 'email',
					placeholder: 'Enter your email.'
				},
				validation: {
					required: true,
					email: true
				},
				valid: false,
				validationMessage: ''
			}
		}
	}
	submitForm(event) {
		event.preventDefault()

		const dataToSubmit = {}
		let formIsValid = true

		for (let key in this.state.formData) {
			dataToSubmit[key] = this.state.formData[key].value
			formIsValid = this.state.formData[key].valid && formIsValid
		}

		if (formIsValid) {
			dbPromos.orderByChild('email').equalTo(dataToSubmit.email).once("value")
				.then((snapshot) => {
					if(snapshot.val() === null) {
						dbPromos.push(dataToSubmit)
						this.resetFormSuccess(true)
					} else {
						this.resetFormSuccess(false)
					}
				})
		} else {
			this.setState({
				formError: true
			})
		}
	}

	resetFormSuccess(type) {
		const newFormData = {...this.state.formData}
		for (let key in newFormData) {
			newFormData[key].value = ''
			newFormData[key].valid = false
			newFormData[key].validationMessage = ''
		}

		this.setState({
			formError: false,
			formData: newFormData,
			formSuccess: type ? 'You\'ve successfully signed up!' : 'You\'re already signed up. Thanks!'
		})
		this.successMessage()
	}

	successMessage() {
		setTimeout(() =>
			this.setState({ formSuccess: '' }), 2000)
	}

	updateForm(element) {
		const newFormData = {...this.state.formData}
		const newElement = {...newFormData[element.id]}

		newElement.value = element.event.target.value
		const validData = validate(newElement)
		newElement.valid = validData[0]
		newElement.validationMessage = validData[1]
		newFormData[element.id] = newElement

		this.setState({
			formError: false,
			formData: newFormData
		})
	}
	render() {
		return (
			<Fade>
				<div className="enroll_wrapper">
					<form onSubmit={(event) => this.submitForm(event)}>
						<div className="enroll_title">Enter your email.</div>
						<div className="enroll_input">
							<FormField
								id={'email'}
								formData={this.state.formData.email}
								change={(element) => this.updateForm(element)}
							/>
							{this.state.formError ? <div className="error_label">Something is wrong. Try again.</div> : null}
							<div className="success_label">{this.state.formSuccess}</div>
							<button onClick={(event) => this.submitForm(event)}>Enroll</button>
						</div>
					</form>
				</div>
			</Fade>
		)
	}
}

export default Enroll
