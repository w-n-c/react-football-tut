import React from 'react'
import AdminLayout from '../../../hoc/AdminLayout'
import FormField from '../../ui/formFields'
import { validate } from '../../ui/misc'

import { dbMatches, dbTeams, db } from '../../../database'
import { dbFormatter } from '../../ui/misc'

class EditMatch extends React.Component {

	state = {
		matchId:'',
		formType:'',
		formError: false,
		formSuccess: '',
		teams: [],
		formData: {
			date: {
				element: 'input',
				value: '',
				config: {
					label: 'Event date',
					name: 'date_input',
					type: 'date',
				},
				validation: {
					required: true,
				},
				valid: false,
				validationMessage: '',
				showLabel: true
			},
			local: {
				element: 'select',
				value: '',
				config: {
					label: 'Select a local team',
					name: 'select_local',
					type: 'select',
					options: []
				},
				validation: {
					required: true,
				},
				valid: false,
				validationMessage: '',
				showLabel: false
			},
			resultLocal: {
				element: 'input',
				value: '',
				config: {
					label: 'Local Result',
					name: 'result_local_input',
					type: 'text',
				},
				validation: {
					required: true,
				},
				valid: false,
				validationMessage: '',
				showLabel: false
			},
			away: {
				element: 'select',
				value: '',
				config: {
					label: 'Select a local team',
					name: 'select_local',
					type: 'select',
					options: []
				},
				validation: {
					required: true,
				},
				valid: false,
				validationMessage: '',
				showLabel: false
			},
			resultAway: {
				element: 'input',
				value: '',
				config: {
					label: 'Local Result',
					name: 'result_local_input',
					type: 'text',
				},
				validation: {
					required: true,
				},
				valid: false,
				validationMessage: '',
				showLabel: false
			},
			referee: {
				element: 'input',
				value: '',
				config: {
					label: 'Referee',
					name: 'referee_input',
					type: 'text',
				},
				validation: {
					required: true,
				},
				valid: false,
				validationMessage: '',
				showLabel: true
			},
			stadium: {
				element: 'input',
				value: '',
				config: {
					label: 'Stadium',
					name: 'stadium_input',
					type: 'text',
				},
				validation: {
					required: true,
				},
				valid: false,
				validationMessage: '',
				showLabel: true
			},
			result: {
				element: 'select',
				value: '',
				config: {
					label: 'Team Result',
					name: 'select_result',
					type: 'select',
					options: [
						{key: 'W', value: 'W'},
						{key: 'L', value: 'L'},
						{key: 'D', value: 'D'},
						{key: 'n/a', value: 'n/a'},
					]
				},
				validation: {
					required: true,
				},
				valid: false,
				validationMessage: '',
				showLabel: true
			},
			final: {
				element: 'select',
				value: '',
				config: {
					label: 'Game Played?',
					name: 'select_played',
					type: 'select',
					options: [
						{key: 'Yes', value: 'Yes'},
						{key: 'No', value: 'No'},
					]
				},
				validation: {
					required: true,
				},
				valid: false,
				validationMessage: '',
				showLabel: true
			},
		}
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

	updateFields(match, options, teams, type, matchId) {
		const newFormData = {
			...this.state.formData
		}

		for (let key in newFormData) {
			if(match) {
				newFormData[key].value = match[key]
				newFormData[key].valid = true
			}
			if(key === 'local' || key === 'away') {
				newFormData[key].config.options = options
			}
		}
		this.setState({
			matchId,
			formType: type,
			formData: newFormData,
			teams,
		})
	}

	componentDidMount() {
		const matchId = this.props.match.params.id
		const getTeams = (match, type) => (
			dbTeams.once('value').then((snapshot) => {
				const teams = dbFormatter(snapshot)
				const options = []
				snapshot.forEach(childSnap => {
					options.push({
						key: childSnap.val().shortName,
						value: childSnap.val().shortName
					})
				})
				this.updateFields(match, options, teams, type, matchId)
			})
		)
			
		if (!matchId) {
			getTeams(false, 'Add Match')
		} else {
			db.ref(`matches/${matchId}`).once('value')
				.then((snapshot) => {
					const match = snapshot.val()
					getTeams(match, 'Edit Match')
				})
		}
	}

	successForm(msg) {
		this.setState({
			formSuccess: msg
		})
		setTimeout(()=>{
			this.setState({
				formSuccess: ''
			})
		}, 2000)
	}

	submitForm(event) {
		event.preventDefault()

		const dataToSubmit = {}
		let formIsValid = true

		for (let key in this.state.formData) {
			dataToSubmit[key] = this.state.formData[key].value
			formIsValid = this.state.formData[key].valid && formIsValid
		}

		this.state.teams.forEach((team)=> {
			if (team.shortName === dataToSubmit.local) {
				dataToSubmit['localThmb'] = team.thmb
			}
			if (team.shortName === dataToSubmit.away) {
				dataToSubmit['awayThmb'] = team.thmb
			}
		})

		if (formIsValid) {
			if(this.state.formType === 'Edit Match') {
				db.ref(`matches/${this.state.matchId}`)
					.update(dataToSubmit).then(()=>{
						this.successForm('Updated correctly')
					}).catch(e => {
						this.setState({
							formError: true
						})
					})
			} else {
				dbMatches.push(dataToSubmit).then(()=>{
					this.props.history.push('/admin_matches')
				}).catch((e)=>{
					this.setState({ formError: true })
				})
			}
		} else {
			this.setState({
				formError: true
			})
		}
	}

	render() {
		return(
			<AdminLayout>
				<div className="editmatch_dialog_wrapper">
					<h2>
						{this.state.formType}
					</h2>
					<div>
						<form onSubmit={(event) => this.submitForm(event)}>
							<FormField
								id={'date'}
								formData={this.state.formData.date}
								change={(element) => this.updateForm(element)}
							/>
							<div className="select_team_layout">
								<div className="label_inputs">Local</div>
								<div className="wrapper">
									<div className="left">
										<FormField
											id={'local'}
											formData={this.state.formData.local}
											change={(element) => this.updateForm(element)}
										/>
									</div>
									<div>
										<FormField
											id={'resultLocal'}
											formData={this.state.formData.resultLocal}
											change={(element) => this.updateForm(element)}
										/>
									</div>
								</div>
							</div>
							<div className="select_team_layout">
								<div className="label_inputs">Away</div>
								<div className="wrapper">
									<div className="left">
										<FormField
											id={'away'}
											formData={this.state.formData.away}
											change={(element) => this.updateForm(element)}
										/>
									</div>
									<div>
										<FormField
											id={'resultAway'}
											formData={this.state.formData.resultAway}
											change={(element) => this.updateForm(element)}
										/>
									</div>
								</div>
							</div>
							<div className="split_fields">
								<FormField
									id={'referee'}
									formData={this.state.formData.referee}
									change={(element) => this.updateForm(element)}
								/>
								<FormField
									id={'stadium'}
									formData={this.state.formData.stadium}
									change={(element) => this.updateForm(element)}
								/>
							</div>
							<div className="split_fields last">
								<FormField
									id={'result'}
									formData={this.state.formData.result}
									change={(element) => this.updateForm(element)}
								/>
								<FormField
									id={'final'}
									formData={this.state.formData.final}
									change={(element) => this.updateForm(element)}
								/>
							</div>
							<div className="success_label">{this.state.formSuccess}</div>
							{this.state.formError?
								<div className="error_label">
									Something is wrong.
								</div>
							:''}
						</form>
						<div className="admin_submit">
							<button onClick={(event)=> this.submitForm(event)}>
								{this.state.formType}
							</button>
						</div>
					</div>
				</div>
			</AdminLayout>
		)
	}
}

export default EditMatch
