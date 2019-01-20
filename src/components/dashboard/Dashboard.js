import React, { Component } from 'react';
import Calendar from './Calendar';
import { getDateProps } from '../../utils/date'; 

class Dashboard extends Component {
    constructor(){
        super()
		
		this.state = {
			start: getDateProps().start,
			end: getDateProps().end,
			month: getDateProps().month,
			year: getDateProps().year
		}

        this.renderNextMonth = this.renderNextMonth.bind(this);
        this.renderPreviousMonth = this.renderPreviousMonth.bind(this);
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
				month={this.state.month}/>
			  <button type="button" className="btn btn-primary btn-sm" onClick={this.renderPreviousMonth}>Previous</button>
			  <button type="button" className="btn btn-primary btn-sm" onClick={this.renderNextMonth}>Next</button>
			</div>

		return ( calendar )
  };
}

export default Dashboard;
