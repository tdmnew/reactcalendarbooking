import React, { Component } from 'react';
import Calendar from './Calendar';
import { getDateProps } from '../../utils/date'; 
import axios from 'axios';
import Form from './Form';

class Dashboard extends Component {
    constructor(){
        super()
		
		this.state = {
			start: getDateProps().start,
			end: getDateProps().end,
			month: getDateProps().month,
			year: getDateProps().year,
			datesSelected: [],
			contact: {
				name: null,
				email: null,
				phone: null
			},
			reservations: null,
			error: false,
			successful: false
		}

		this.handleForm = this.handleForm.bind(this);
		this.submit = this.submit.bind(this);
		this.parseReserved = this.parseReserved.bind(this);
        this.renderNextMonth = this.renderNextMonth.bind(this);
        this.renderPreviousMonth = this.renderPreviousMonth.bind(this);
    }  


	async componentDidMount() {
		let reserved = await axios.get('/api/reservation/current/') 
		this.parseReserved(reserved.data)
	}

	// dates provided by calender
	updateDates = (dates) => {
		this.setState({
			datesSelected: dates
		})
	}

	parseReserved = (reserved) => {
		const parsedReservations = reserved.map( i => {
			return(i.date)
		})
		
		this.setState({
			reservations: parsedReservations
		})
	}


	handleForm(e) {
		e.preventDefault()
		switch(e.target.name) {
			case "name":
					this.setState({
						contact: {
							name: e.target.value,
							email: this.state.contact.email,
							phone: this.state.contact.phone,
						}
					})
					break;
			case "email":
					this.setState({
						contact: {
							name: this.state.contact.name,
							email: e.target.value,
							phone: this.state.contact.phone

						}
					})
					break;
			case "phone":
					this.setState({
						contact: {
							name: this.state.contact.name,
							email: this.state.contact.email,
							phone: e.target.value 
						}
					})
					break;
			default:
				console.log("Error")
		}
	}


	submit(e) {
		e.preventDefault()
		var request = {
			name: this.state.contact.name,
			email: this.state.contact.email,
			phone: this.state.contact.phone,
			dates: this.state.datesSelected
		}
		if(request.name == null || request.email == null || request.phone == null || request.dates.length === 0 ) {
			this.setState({
				error: true
			})
		} else { 
			//Prevent multiple submissions
			if(this.state.successful === false) {
				axios.post('/api/request/addrequest', request)
				.then( res => {
					console.log(res)
					this.setState({ successful: true})
					if(this.state.error) {
						this.setState({ error: false})
					}
				})
				.catch( err => console.log(err) )
			}
		}
	}

	renderPreviousMonth() {
		var month = this.state.month
		var year = this.state.year
		var todaysDate = this.state.todaysDate

        if(month === 1) {
            year -= 1
            month = 12;
        } else {
            month -= 1
        }
        var date = { year, month, todaysDate  }
        this.setState({
			year: year,
			month: month,
			start: getDateProps(date).start,
			end: getDateProps(date).end,
			})
		}

    renderNextMonth() {
		var month = this.state.month
		var year = this.state.year
		var todaysDate = this.state.todaysDate

        if(month === 12) {
            year += 1
            month = 1;
        } else {
            month += 1
        }
        var date = { year, month, todaysDate  }
        this.setState({
			year: year,
			month: month,
			start: getDateProps(date).start,
			end: getDateProps(date).end,
			})
	}

    render() {
		let months = ["January", "February", "March", "April", "May", 
					  "June", "July", "August", "September", "October", 
					  "November", "December"]

		const calendar = 
			<div className="booking-form--dashboard">
				<h1 className="booking-form--dashboard__heading">{months[this.state.month - 1]} {this.state.year}</h1>
				<Calendar 
				start={this.state.start} 
				end={this.state.end} 
				year={this.state.year} 
				month={this.state.month}
				updateDates={this.updateDates}
				reservations={this.state.reservations}/>
				<div className="booking-form--dashboard--buttons">
				  <button className="btn btn-calender" onClick={this.renderPreviousMonth}>Previous</button>
				  <button className="btn btn-calender" onClick={this.renderNextMonth}>Next</button>
				</div>
			</div>

		return ( <div className="booking-form">
					{calendar} 
					<Form 
					submit={this.submit} 
					handleForm={this.handleForm} 
					error={this.state.error}
					successful={this.state.successful}/>
				</div> )
  };
}

export default Dashboard;
