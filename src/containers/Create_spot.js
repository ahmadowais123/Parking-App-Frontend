import React,{Component} from "react";
import { Button, Form, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import axios from 'axios';
import swal from 'sweetalert';

export default class Create_spot extends Component{

  //Necessary state variables required in spot creation
  state = {
    pkey : "",
    addressNumber : "",
    streetName : "",
    postalCode : "",
    avgRating : "",
    currentPrice : ""
  };


  //changes appropriate state variables for whatever is typed into the fields
  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  //Error checking in input fields
  validateForm() {

    var PCregex = new RegExp(/([ABCEGHJKLMNPRSTVXY]\d)([ABCEGHJKLMNPRSTVWXYZ]\d){2}/i);

    if(this.state.streetName.length === 0){
      alert('The street name field cannot be empty');
      return(false)
    }

    if(this.state.addressNumber.length !== 0){
      if(isNaN(this.state.addressNumber)){
        alert('The address number field must contain a number');
        return(false)
      }
    } else{
      alert('The address number field cannot be empty');
      return(false)
    }

    if(this.state.postalCode.length === 0){
      alert('The postal code field cannot be empty');
      return(false)
    }

    if(this.state.currentPrice.length !== 0){
      if(isNaN(this.state.currentPrice)){
        alert('The price field must contain a number');
        return(false)
      }
    } else {
      alert('The price field cannot be empty');
      return(false)
    }

    if(this.state.avgRating.length !== 0){
      if(isNaN(this.state.avgRating)){
        alert('The average rating field must contain a number');
        return(false)
      }
    } else {
      alert('The average rating field cannot be empty');
      return(false)
    }

    return true

  }

  test = () => {
    console.log(this.state)
  };

  //Fetches user data from localStorage, spot data from state and posts to backend upon clicking once all validation checks done
  //Sweet Alert pops up for confirmation
  create = () => {

    var values = [];
    var keys = Object.keys(localStorage);
    var i = keys.length;

    while ( i-- ) {
      values.push( localStorage.getItem(keys[i]) );
    }

    const user = JSON.parse(values[0]);

    console.log(user);
    console.log(String(user.last_Name));

    if(!this.validateForm()){
      return false;
    }

    const data = {
      "addressNumber" : String(this.state.addressNumber),
      "streetName" : String(this.state.streetName),
      "postalCode" : String(this.state.postalCode),
      "avgRating" : String(this.state.avgRating),
      "currentPrice" : String(this.state.currentPrice),
      "user" :
      {
        "firstName" : String(user.first_name),
        "lastName" : String(user.last_Name),
        "id" : String(user.userID),
        "password" : String(user.password),
        "email" : String(user.email),
        "isRenter" : String(user.isRenter),
        "isSeller" : String(user.isSeller),
        "parkingManager" :
        {
          "pkey" : "1"
        }
      },
      "parkingManager" :
      {
        "pkey" : "1"
      }
    };
    let self = this;
    var headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    };

     swal({
              title: "Are you sure?",
              text: "You are about to create a parking spot!",
              icon: "warning",
              buttons: ["Don't create", "Create!"],
              dangerMode: true,
            })
            .then((willCreate) => {
              if (willCreate) {
                 axios.post('https://parking-system-ecse428.herokuapp.com/spot', data, headers )
                      .then((function (response){
                        if(response.status == 200){
                         swal("You have successfully created a parking spot!", {
                              icon: "success",
                         });
                         self.props.history.push("/browse");
                        }
                     })).catch(function (error){
                       swal("Oops something went wrong! You may want to contact the development team.", {
                           icon: "error",
                        });
                       console.log(error.response);
                       console.log('Failed');
                     });

              } else {
                swal("You did not create a parking spot");
              }
            });
  };

    buttonStyle = {
        borderRadius: '10px',
        fontFamily: 'Georgia'
    };

    displayStyle = {
        width: '50%'
    };

    //Renders input fields for spot creation and calls create() function on click
  render() {

    return (

      <div style={this.displayStyle}>
      <FormGroup controlId="streetName" bsSize="small">
      <ControlLabel>Street Name</ControlLabel>
      <FormControl
      autoFocus
      value={this.state.streetName}
      onChange={this.handleChange}
      />
      </FormGroup>

      <FormGroup controlId="addressNumber" bsSize="small">
      <ControlLabel>Address Number</ControlLabel>
      <FormControl
      autoFocus
      value={this.state.addressNumber}
      onChange={this.handleChange}
      />
      </FormGroup>

      <FormGroup controlId="postalCode" bsSize="small">
      <ControlLabel>Postal Code</ControlLabel>
      <FormControl
      autoFocus
      value={this.state.postalCode}
      onChange={this.handleChange}
      />
      </FormGroup>

      <FormGroup controlId="currentPrice" bsSize="small">
      <ControlLabel>Price</ControlLabel>
      <FormControl
      autoFocus
      value={this.state.currentPrice}
      onChange={this.handleChange}
      />
      </FormGroup>

      <FormGroup controlId="avgRating" bsSize="small">
      <ControlLabel>Rating</ControlLabel>
      <FormControl
      autoFocus
      value={this.state.avgRating}
      onChange={this.handleChange}
      />
      </FormGroup>

      <button style={this.buttonStyle} onClick={this.create}>Create Spot</button>
      </div>
    );
  }
}
