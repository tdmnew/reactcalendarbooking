import React, { Component } from 'react';

class DateObj extends Component {

	constructor() {
		super()
		this.selfClicked = this.selfClicked.bind(this)
	}

    static defaultProps = {
		day: "",
		date: null,
		dayToday: false, // True passed in if it IS today's date
		available: true,
		selected: false
    }


	selfClicked(e) {
		this.props.dateClicked(e, this.props.date)
	}

  render(){

	var styleDT = {
		backgroundColor:"black",
		color:"white"
	}
	var styleClicked = {
		backgroundColor: "green",
		color: "black"
	}
	var styleUnavailable = {
		backgroundColor: "grey",
		color: "black",
		opacity: "0.7"
	}

    if(this.props.dayToday) { //Highlight if TD, activities complete ot not 
      return(
        <td onClick={this.selfClicked} style={this.props.selected ? styleClicked : styleDT}>{this.props.day}</td>
      )
	} else if(this.props.available === false) {
		return (
		<td style={styleUnavailable}>{this.props.day}</td>
		)
    } else { 
      return(
        <td style={this.props.selected ? styleClicked : null} onClick={this.selfClicked}>{this.props.day}</td>
      )
    }
  }
}


export default DateObj;
