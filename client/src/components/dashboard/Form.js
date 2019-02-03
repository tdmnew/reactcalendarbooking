import React from 'react';

const Form = ( props ) => {	
		return (
			<div className="form-fields">
			<form onSubmit={props.submit}>
				<br/>
				<label>Name</label>
				<br/>
				<input type="text" className="form-fields--form" onChange={props.handleForm} placeholder="Name" name="name"/>
				<br/>
				<label>Email Address</label>
				<br/>
				<input type="email" className="form-fields--form" onChange={props.handleForm} placeholder="name@example.com" name="email"/>
				<br/>
				<label>Phone Number</label>
				<br/>
				<input type="phone" className="form-fields--form" onChange={props.handleForm} placeholder="Phone Number" name="phone"/>
				<br/>
				<button className="form-fields--btn" type="submit">Submit</button>
				<br/>
				{props.error ? "Please complete all of the fields above and select the dates you wish to book" : null }
				{props.successful ? "Thank you. Your request has been received and we will be in touch as soon as possible" : null }
			</form>
			</div>
		)
	}

export default Form;
