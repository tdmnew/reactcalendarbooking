import React, { Component } from 'react';
import DateObj from '../date';

import { getDateProps } from '../../utils/date';

class Calender extends Component {
	constructor() {
		super() 
		this.state = {
			datesSelected: [],
			datesReserved: [],
			reservedDateSelected: false
		}
		this.handleDateClicked = this.handleDateClicked.bind(this)
		this.addDateToArray = this.addDateToArray.bind(this)
	}

	componentDidMount() {
			setTimeout( () => {
				const datesReserved = this.props.reservations.map( i => {
				return(i.date)
			}) 
			this.setState({datesReserved: datesReserved})
			}, 1000)
		}

	addDateToArray(arr, newDate) {
		if(arr.includes(newDate) === false) {
			if(this.state.reservedDateSelected && this.state.datesReserved.includes(newDate)) {
				arr.push(newDate)
			} else if(this.state.reservedDateSelected === false && this.state.datesReserved.includes(newDate) === false) {
				arr.push(newDate)
			} else {
			}
		} else {
			arr.splice( arr.indexOf(newDate) )
		}
		
		this.setState({
			datesSelected: arr
		})


	}

	handleDateClicked(e, date) {
		var dateISO = date.toISOString()
		var newDate = dateISO.split("T")[0]
		var originalArray = this.state.datesSelected

		e.preventDefault()

		if(originalArray.length === 0) {
			if(this.state.datesReserved.includes(newDate)) {
				originalArray.push(newDate)
				this.setState({reservedDateSelected: true, datesSeelected: originalArray})
				this.props.reservedSelected(true)
			} else {
				originalArray.push(newDate)
				this.setState({reservedDateSelected: false, datesSelected: originalArray}) 
				this.props.reservedSelected(false)
			}
		} else {
			this.addDateToArray(originalArray, newDate)
		}
		
		//Pass dates up to Dashboard
		this.props.updateDates(this.state.datesSelected)
	}
	
	render(){

	//If the day of the week falls on the first day of the month, create a Date
    // object, otherwise create an empty table data object
    var tableRow = [];
    var tableRows = [];
    var counter = 0;

    //Work out if its the current month, and if so provide today's date
    var isThisMonth = false;
    var dateFunc = getDateProps();	

    if(this.props.year === dateFunc.year && this.props.month === dateFunc.month){
        isThisMonth = true
		var todaysDate = dateFunc.todaysDate
    }
    
    for(let i = 1; i < 44; i++) {
        if(tableRow.length > 6) { //Assign all dates to a row
        tableRows.push(<tr key={i}>{tableRow}</tr>);
        tableRow = [];
        };
        if(i === this.props.start) { //Check if the correct first day of the week
            counter++                  //then activate the counter for the loop below
        }

        if(counter >= 1 && counter <= this.props.end) { //Populate with this month's dates
        
			var date = new Date(this.props.year + "-" + this.props.month + "-" + counter)
			var dateISO = date.toISOString().split("T")[0]
			var dayToday;
			var selected = false;

			//Check if date has been selected already.

			if(this.state.datesSelected.includes(dateISO)) {
				selected = true;
			}

			//Check if today's date
			if(isThisMonth && counter === todaysDate) {
				dayToday = true;
			} else {
				dayToday = false
			}

			//Check if date is in the past 
			var available = true;
			var todaysDateEpoch = Math.floor ( new Date() / 1000 )
			var currentDateEpoch = Math.floor ( date / 1000 )

			if(currentDateEpoch < todaysDateEpoch) {
				available = false;
			}
			

			//Check if date is reserved - and populate with client info if available

			let reservation = null;
			if(this.props.reservations !== null) {
				let reservations = this.props.reservations
				for(let i = 0; i < reservations.length; i++) {
					if(reservations[i].date === dateISO) {
						reservation =  reservations[i] 
						available = false
					}
				}
			}	


			tableRow.push(<DateObj
			key={i} 
			date={date} 
			day={counter}
			dayToday={dayToday}
			selected={selected}
			reservation={reservation}
			available={available}
			dateClicked={this.handleDateClicked}/>
			);
			
        counter++;
      } else if(counter > this.props.end) { //Start again, with the dates for the next month
        tableRow.push(<td key={i}></td>)
        counter ++;
      } else { //For dates that exist in the previous month.
        tableRow.push(<td key={i}></td>)
      };
    };
    
	return (
    <div id="calender" className="container-fluid">
      <table className="booking-form--dashboard--calender">
        <thead>
            <tr id="daysOfWeek">
              <th>M</th>
              <th>T</th>
              <th>W</th>
              <th>T</th>
              <th>F</th>
              <th>S</th>
              <th>S</th>
            </tr>
        </thead>
      <tbody>
       {tableRows}
      </tbody>
      </table>
    </div>
    )
  };
};

export default Calender; 
