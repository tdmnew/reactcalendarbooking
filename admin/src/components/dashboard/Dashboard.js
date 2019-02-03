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
			datesReserved: [],
			datesSelected: [],
			requests: null,
			reservations: null,
			reservedSelected: null,
			datesError: false
		}
		
		this.logOff = this.logOff.bind(this);
		this.markReserved = this.markReserved.bind(this);
		this.removeReservation = this.removeReservation.bind(this);
		this.parseRequests = this.parseRequests.bind(this);
		this.setStateReserved = this.setStateReserved.bind(this);
		this.handleRequest = this.handleRequest.bind(this);
        this.renderNextMonth = this.renderNextMonth.bind(this);
        this.renderPreviousMonth = this.renderPreviousMonth.bind(this);
    }  
	
	logOff(e) {
		localStorage.clear()
		window.location.assign("/")
	}

	async componentDidMount() {
		let requests = await axios.get('/api/request/current')
		let reserved = await axios.get('/api/reservation/current')
		
		this.parseRequests(requests.data)
		this.setStateReserved(reserved.data)
	}

	markReserved(e) {
		e.preventDefault()
		let dates = { dates: this.state.datesSelected }
		axios.post('/api/reservation/adddate', dates)
		.then( res => { 
			console.log(res)
			window.location.assign("/")
		})
		.catch( err => console.log(err) )
	}

	removeReservation(e) {
		e.preventDefault()
		//Delete requests do not support a body, must use the {data :{}} field
		if(window.confirm("Are you sure you want to remove these dates? This action cannot be undone")) {
			axios.delete('/api/reservation/deletereservations', {data: {dates: this.state.datesSelected}})
			.then( res => { 
				console.log(res.data)
				window.location.assign("/")
			})
			.catch( err => console.log(err) )
		}
	}

	handleRequest(e, request) {
		e.preventDefault()
		if(e.target.name === "approve") {
			const requestsArray = []
			const dates = []
			for(let i = 0; i < request.dates.length; i++) {
				requestsArray.push({name: request.name, email:request.email,
				phone: request.phone, date: request.dates[i]})
				dates.push(request.dates[i])
			}
			const requestObject = {requests: requestsArray, dates: dates}
			console.log(requestObject)
			axios.post('/api/reservation/adddate', requestObject)
			.then(res => {
				axios.delete('/api/request/deleterequest', {data: {name: request.name}})
				.then( res => {
					window.location.assign("/")
				})
			})
			.catch(err => {
				this.setState({datesError: true})
			})
		} else if (e.target.name === "deny") {
			if(window.confirm("Are you sure you want to deny this request? This action cannot be undone")) {
				axios.delete('/api/request/deleterequest', {data: {name: request.name}})
				.then( res => {
					window.location.assign("/")
				})
			}
		}
	}

	// dates provided by calender
	updateDates = (dates) => {
		this.setState({
			datesSelected: dates 
		})
	}


	// Status if date was reseved provided by calender 
	 reservedSelected = (reserved) => {
		this.setState({
			reservedSelected: reserved 
		})
	}
	

	parseRequests = (requests) => {
		const parsedRequests = requests.map( i => {

			let buttonApprove = <button name="approve" onClick={ (e) => this.handleRequest(e, i)}>Approve</button>
			let buttonDeny = <button name="deny" onClick={ (e) => this.handleRequest(e, i)}>Deny</button>

			let contact = <div>Email: {i.email}<br/>Phone: {i.phone}</div>
			let dates = i.dates.map ( i => { return(<li key={i + "dates"}>{i}</li>) })
			let request = <div><br/>{i.name} has requested the following dates: {dates} {contact} {buttonApprove} {buttonDeny}</div>
			return(request)
		})

		this.setState({
			requests: parsedRequests
		})
	}

	setStateReserved = (reserved) => {

		let reservedDates = reserved.map( i => {
			return(i.date)
		})

		this.setState({
			reservations: reserved,
			datesReserved: reservedDates
		})
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
				<div>
				
					<button className="btn--log-off" onClick={this.logOff}>Log Off</button>
					<h1 className="booking-form--dashboard__heading">{months[this.state.month - 1]} {this.state.year}</h1>
						<Calendar 
						start={this.state.start} 
						end={this.state.end} 
						year={this.state.year} 
						month={this.state.month}
						reservedSelected={this.reservedSelected}
						updateDates={this.updateDates}
						reservations={this.state.reservations}/>
			<div className="booking-form--dashboard--buttons">
					<button type="button" className="btn btn-primary btn-sm" onClick={this.renderPreviousMonth}>Previous</button>
					<button type="button" className="btn btn-primary btn-sm" onClick={this.renderNextMonth}>Next</button>
					{ (this.state.datesSelected.length > 0 && this.state.reservedSelected === false) ?
					 <button onClick={this.markReserved}>Mark Reserved</button> : null }
					{ (this.state.datesSelected.length > 0 && this.state.reservedSelected === true) ?
					 <button onClick={this.removeReservation}>Remove Reservation</button> : null }
				</div>
				</div>

		const errorChecking = 
					<div><br/>{ this.state.datesError ? "Approval failed (Have some or all of the dates in this request already been reserved?)" : null }</div>

		
		return ( <div className="booking-form">{calendar} <div className="booking-form--dashboard--requests">{this.state.requests}</div> {errorChecking} </div> )
  }
}

export default Dashboard;
