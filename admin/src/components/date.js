import React, { Component } from 'react';
import ToolTip from './tooltip';

class DateObj extends Component {

	constructor() {
		super()
		this.state = {
			hover: false,
			reservedDateClicked: false
		}
	}

	static defaultProps = {
		day: "",
		date: null,
		dayToday: false, 
		available: true,
		selected: false,
		reservation: null
    }

	handleMouseIn(e) {
		this.setState({
			hover: true
		})
	}

	handleMouseOut(e) {
		this.setState({
			hover: false
		})
	}

	selfClicked(e) {
		this.props.dateClicked(e, this.props.date)
	}

  render(){

	var reservation = this.props.reservation; 

	var styleDT = {
		backgroundColor:"black",
		color:"white"
	}
	var styleClicked = {
		backgroundColor: "green",
		color: "black"
	}
	var styleUnavailable = {
		backgroundColor: reservation ? "purple" : "grey",
		color: "black"
	}


	const tooltip = <ToolTip 
	  				hover={this.state.hover} 
	  				reservation={reservation !== null ? reservation : null}
		  			available={this.props.available}/>

    if(this.props.dayToday) { //Today's date
		return(
        <td 
		  style={this.props.selected ? styleClicked : styleDT}
		  onClick={this.selfClicked.bind(this)} 
		  onMouseOver={this.handleMouseIn.bind(this)} 
		  onMouseOut={this.handleMouseOut.bind(this)}>
		  {this.props.day}
		  {tooltip}
		</td>
      )
	} else if(this.props.available === false) { //Reserved/Unavailable
		return (
		<td 
			style={this.props.selected ? styleClicked : styleUnavailable}
			onClick={reservation !== null ? this.selfClicked.bind(this) : null}
			onMouseOver={this.handleMouseIn.bind(this)} 
			onMouseOut={this.handleMouseOut.bind(this)}>
			{this.props.day}
			{tooltip}
		</td>
		)
    } else { //Available
      return(
        <td 
		  style={this.props.selected ? styleClicked : null} 
		  onClick={this.selfClicked.bind(this)}
		  onMouseOver={this.handleMouseIn.bind(this)} 
		  onMouseOut={this.handleMouseOut.bind(this)}>
		  {this.props.day}
		  {tooltip}
		</td>
      )
    }
  }
}


export default DateObj;
