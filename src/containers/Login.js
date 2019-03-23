import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./Login.css";
import {validateEmail} from "./Helpers.js";
import axios from 'axios';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };
  }

  validateForm() {
    return validateEmail(this.state.email) && this.state.password.length > 0;
  }

  handleClick = event =>{
    
    var email = this.state.email;
    var password = this.state.password;
    var header = email + ":" + password;
    var base64 = require('base-64');
    header = base64.encode(header);

    var headers = {
      'Authorization': 'Basic ' + header,
      'Method': 'email',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    };

    var data = {};

    var self = this;
    axios.post('https://parking-system-ecse428.herokuapp.com/user/authenticate', data, {headers: headers} )
    .then((function (response){
         if(response.status == 200){
          self.props.userHasAuthenticated(true);
          localStorage.setItem('myData', JSON.stringify(response.data));
          localStorage.setItem('loginStatus', 'true')
          self.props.history.push("/browse");
         }
      })).catch(function (error){
        alert('Invalid login credentials')
        console.log(error.response);
        console.log('Failed');
      });

      

  };


  //changes appropriate state variables for whatever is typed into the fields
  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  //suppresses the browser's default action on button press (for now at least)
  handleSubmit = event => {
    event.preventDefault();
  };

  render() {
    return (
      <p className="Login">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="email" bsSize="medium">
            <ControlLabel>Email</ControlLabel>
            <FormControl
              autoFocus
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="medium">
            <ControlLabel>Password</ControlLabel>
            <FormControl
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
          <Button
            block
            bsSize="medium"
            disabled={!this.validateForm()}     //the button is enabled only if the set conditions are satisfied
            type="submit"
            onClick={this.handleClick} 
          >
            Login
          </Button>
        </form>
      </p>
    );
  }
}