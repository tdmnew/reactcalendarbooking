import React, { Component } from 'react';


class ToolTip extends Component {
	render() {

		const availability = this.props.available ? "Available" : "Unavailable"
		//Checks if reservation made by client (.includes("name")) or if it was made by the admin
		const reservationInfo = (this.props.reservation !== null && Object.keys(this.props.reservation).includes("name")) ? 
			<ul style={{listStyleType: "none"}}>
				<li>Name: {this.props.reservation.name}</li>
				<li>Email: {this.props.reservation.email}</li>
				<li>Phone: {this.props.reservation.phone}</li>
			</ul> : "Reserved by you" 

		const styleToolTip = {
			display: this.props.hover ? "block" : "none", 
			color: "white", 
			backgroundColor: "grey", 
			position: "absolute",
			padding: "3px",
			marginTop: "15px"
		}

			return(
			<div className="tooltip" style={styleToolTip}>{this.props.reservation !== null ? reservationInfo : availability }</div>
		)
	}

}

export default ToolTip;
