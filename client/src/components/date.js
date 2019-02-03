import React, { Component } from 'react';
import ToolTip from './tooltip';

class DateObj extends Component {

	constructor() {
		super()
		this.state = {
			hover: false
		}
	}

    static defaultProps = {
		day: "",
		date: null,
		dayToday: false, // True passed in if it IS today's date
		available: true,
		selected: false
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
		color: "black"
	}


	const tooltip = <ToolTip hover={this.state.hover} available={this.props.available}/>

    if(this.props.dayToday) { //Highlight if TD, activities complete ot not 
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
	} else if(this.props.available === false) {
		return (
		<td 
			style={styleUnavailable}
			onMouseOver={this.handleMouseIn.bind(this)} 
			onMouseOut={this.handleMouseOut.bind(this)}>
			{this.props.day}
			{tooltip}
		</td>
		)
    } else { 
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
