import React, { Component } from 'react';
import axios from 'axios';

class Login extends Component {

    constructor(props){
    super(props)
        this.state = {
            email: '',
            password: '',
			error: false
        }

        this.handleChange = this.handleChange.bind(this)
        this.submit = this.submit.bind(this)
    }

    handleChange(event){
        this.setState({
           [event.target.name]: event.target.value 
        })

    }

    submit(e) {

        const userData = {
            email: this.state.email,
            password: this.state.password
        }
		
		axios.post('/api/users/login/', userData)
		.then( res => {
			window.location.assign("/")
			localStorage.setItem("jwtToken", res.data.token)
		})
		.catch(err => {
			this.setState({error: true })
			console.log(err)
		})
        e.preventDefault()
		
    }

    render() {
        return(
    <div className="login" style={{paddingTop:'50px', paddingRight:'30%', paddingLeft:'30%'}}>
        <form onSubmit={this.submit}>
            <label className="login--label">Email Address</label>
            <input type="email" className="form-control" name="email" aria-describedby="emailHelp" placeholder="Enter email" onChange={this.handleChange} />
            <label className="login--label">Password</label>
            <input type="password" className="form-control" name="password" placeholder="Password" onChange={this.handleChange}/>
			<br/>
            {this.state.error ? "There was an issue with the information you have entered. Please try again." : null}
			<br/>
          <button type="submit" className="btn btn-login" >Submit</button>
        </form> 
    </div>
        )
    }
}

export default Login; 
