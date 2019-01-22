import React, { Component } from 'react';
import Calendar from './Calendar';
import { getDateProps } from '../../utils/date'; 
import axios from 'axios';

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
			error: false
		}

		this.handleForm = this.handleForm.bind(this);
		this.submit = this.submit.bind(this);
        this.renderNextMonth = this.renderNextMonth.bind(this);
        this.renderPreviousMonth = this.renderPreviousMonth.bind(this);
    }  

	// dates provided by calender
	updateDates = (dates) => {
		this.setState({
			datesSelected: dates
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
			if(this.state.error === true) {
				this.setState({
					error: false
				})
			}
			setTimeout( () => { 
				axios.post('/api/request/addrequest', request)
				.then( res => console.log(res) )
				console.log(request)
			}, 1000)
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
			<div id="dashboard">
				<h1>{months[this.state.month - 1]} {this.state.year}</h1>
				<Calendar 
				start={this.state.start} 
				end={this.state.end} 
				year={this.state.year} 
				month={this.state.month}
				updateDates={this.updateDates}/>
			  <button type="button" className="btn btn-primary btn-sm" onClick={this.renderPreviousMonth}>Previous</button>
			  <button type="button" className="btn btn-primary btn-sm" onClick={this.renderNextMonth}>Next</button>
			</div>


		const forms = 
			<div id="forms">
			<form onSubmit={this.submit}>
				<label>Name</label>
				<br/>
				<input type="text" className="form-control" onChange={this.handleForm} placeholder="Name" name="name"/>
				<br/>
				<label>Email address</label>
				<br/>
				<input type="email" className="form-control" onChange={this.handleForm} placeholder="name@example.com" name="email"/>
				<br/>
				<label>Phone Number</label>
				<br/>
				<input type="phone" className="form-control" onChange={this.handleForm} placeholder="Phone Number" name="phone"/>
				<br/>
				<button type="submit">Submit</button>
				<br/>
				{this.state.error ? "Please complete all of the fields above and select the dates to be booked" : null }
				
			</form>
			</div>

		return ( <div>{calendar} {forms}</div> )
  };
}

export default Dashboard;
