import React, { Component } from 'react';

class DateObj extends Component {
    static defaultProps = {
      day: "",
      date: null,
      dayToday: false, // True passed in if it IS today's date
    }



  render(){

	var styleDT = {
      backgroundColor:"black",
      color:"white"
    }

    if(this.props.dayToday) { //Highlight if TD, activities complete ot not 
      return(
        <td style={styleDT}>{this.props.day}</td>
      )
    } else { 
      return(
        <td>{this.props.day}</td>
      )
    }
  }
}


export default DateObj;
