import React, { Component } from "react";
import axios from 'axios';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./Login.css";
import {validateEmail} from "./Helpers.js";

//check login page for more comments


//State consists of Name, email, role, username and passwords (2 password fields to ensure correct password set)
export default class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: "",
      firstName: "",
      lastName: "",
      email: "",
      username: "",
      password: "",
      password2: "",
      role: ""
    };
  }

  //Validates correct inputs
  validateForm() {
    return validateEmail(this.state.email) && this.state.password.length > 0 && 
    this.state.firstName.length > 0 && this.state.lastName.length > 0 &&
    this.state.password === this.state.password2 && this.state.role != null;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
  };

  //Sets fields to inputs in text boxes when Register button clicked, to be passed into our data variable and posted to Database
  handleClick = event =>{
    var self = this;
    var usrf = this.state.firstName;
    var usrl = this.state.lastName;
    var pass = this.state.password;
    var mail = this.state.email;
    var usrn = this.state.username;
    var renter = true;
    var seller = true;

    var headers1 = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    };

    //Collects data from page, stores as object
    var data = {
          firstName: usrf,
          lastName: usrl,
          id: usrn,
          password: pass,
          email: mail,
          isRenter: renter,
          isSeller: seller,
          parkingManager:
          {
              pkey: "1"
          },
        headers: headers1
      };

      //Posted to database, if successful, stores current state and login status in localStorage
      //Redirects to browse page upon success, if failure then alert pop-up
    axios.post("https://parking-system-ecse428.herokuapp.com/user", data)
        .then((function (response){
            if(response.status == 200){
                var email = mail;
                var password = pass;
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
                axios.post("https://parking-system-ecse428.herokuapp.com/user/authenticate", data, {headers: headers} )
                    .then((function (response){
                        if(response.status == 200){
                            self.props.userHasAuthenticated(true);
                            localStorage.setItem('myData', JSON.stringify(response.data));
                            localStorage.setItem('loginStatus', 'true')
                            self.props.history.push("/browse");
                        }
                    })).catch(function (error){
                    var errorMsg = error.response.data;
                    this.setState({error: errorMsg})
                    console.log(error.response);
                    console.log('Failed');
                });
            }
        }))
        .catch(e => {
        var errorMsg = e.response.data;
        this.setState({error: errorMsg})
    });

  };

  //Renders input fields and sets state
  render() {

    return (
      <p className="Login">
        <form onSubmit={this.handleSubmit}>
        <FormGroup>
            <div style={{"color": "red"}}>
              <p>
                {this.state.error}
              </p>
            </div>
        </FormGroup>
        <FormGroup controlId="firstName" bsSize="medium">
            <ControlLabel>First Name</ControlLabel>
            <FormControl
              autoFocus
              type="firstName"
              value={this.state.firstName}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="lastName" bsSize="medium">
            <ControlLabel>Last Name</ControlLabel>
            <FormControl
              autoFocus
              type="lastName"
              value={this.state.lastName}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="email" bsSize="medium">
            <ControlLabel>Email</ControlLabel>
            <FormControl
              autoFocus
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="username" bsSize="medium">
            <ControlLabel>Username</ControlLabel>
            <FormControl
              autoFocus
              type="username"
              value={this.state.username}
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
          <FormGroup controlId="password2" bsSize="medium">
            <ControlLabel>Confirm Password</ControlLabel>
            <FormControl
              value={this.state.password2}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
          <Button
            block
            bsSize="medium"
            disabled={!this.validateForm()}
            type="submit"
            onClick={this.handleClick}
          >
            Register
          </Button>
        </form>
      </p>
    );
  }
}