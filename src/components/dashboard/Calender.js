import React, { Component } from 'react';
import DateObj from '../date';

import { getDateProps } from '../../utils/date';

class Calender extends Component {
// Start is the first day of the month, end is the last.
// Last is the number of days the prior month

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
        
			let date = new Date(this.props.year + "-" + this.props.month + "-" + counter)
			let dayEvents = []
			let dayToday;
			if(isThisMonth) {
				if(counter === todaysDate) {
					dayToday = true;
				} else {
				dayToday = false;
				}
			} else {
				dayToday = false
			}
			tableRow.push(<DateObj
			  key={i} 
			  date={date} 
			  day={counter}
			  dayToday={dayToday}
			  dayEvents={dayEvents}/>);

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
      <table className="table" id="calender">
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
