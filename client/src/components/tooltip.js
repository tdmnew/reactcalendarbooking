import React, { Component } from 'react';


class ToolTip extends Component {
	render() {
		const styleToolTip = {
			display: this.props.hover ? "block" : "none", 
			color: "white", 
			backgroundColor: "grey", 
			position: "absolute",
			padding: "3px",
			marginTop: "15px"
		}
			return(
			<div className="tooltip" style={styleToolTip}>{this.props.available ? "Available": "Unavailable"}</div>
		)
	}

}

export default ToolTip;
