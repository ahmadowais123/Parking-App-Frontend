import React,{Component} from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import Calendar from 'react-calendar';

import axios from 'axios';

export default class Browse extends Component{

    state = {
        loading: true,
        spot: null,
        startDate: new Date(),
        endDate: new Date()
    };


    onChange = startDate => this.setState({startDate})
    onChangeEnd = endDate => this.setState({endDate})
   

    //changes appropriate state variables for whatever is typed into the fields
    handleChange = event => {
        this.setState({
        [event.target.id]: event.target.value
        });
    }

    async componentDidMount(){
       const url = "https://parking-system-ecse428.herokuapp.com/spot/all";
       const response = await fetch(url);
       var data = await response.json();
       data = JSON.parse(JSON.stringify(data));
       console.log(data)
       this.setState({spot: data, loading: false})
       console.log(this.state.spot)
    }
    
    displayAds= event => {
        var user = {
            "pkey" : "4",
            "plate" : "kk6 k8h",
            "startDate" : "2020-08-28 21:00:00", 
            "endDate" : "2020-08-29 11:00:00", 
            "pricePaid" : "2", 
            "startTime" : "5", 
            "endTime" : "10", 
            "user" : {
                "firstName" : "Alex",
                "lastName" : "Doe",
                "id" : "433",
                "password" : "scrum",
                "email" : "john@mail.mcgill.ca",
                "isRenter" : "true",
                "isSeller" : "false", 
                "parkingManager" : 
                {
                    "pkey" : "1"
                }
            },
            "parkingManager" : {
                "pkey" : "1"
            },
            "spot" : {
                "pkey" : "321",
                "addressNumber" : "1234",
                "streetName" : "Kennedy",
                "postalCode" : "H0H 0H0",
                "avgRating" : "0",
                "currentPrice" : "20",
                "user" : 
                {
                    "firstName" : "John",
                    "lastName" : "Doe",
                    "id" : "428",
                    "password" : "scrum",
                    "email" : "john.doe@mail.mcgill.ca",
                    "isRenter" : "true",
                    "isSeller" : "false", 
                    "parkingManager" : 
                    {
                        "pkey" : "1"
                    }
                },
                "parkingManager" : 
                {
                    "pkey" : "1"
                }
            }
        }
        

        
        var headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
      
          axios({
            method: 'post',
            url: 'https://parking-system-ecse428.herokuapp.com/reservation',
            data: user,
            headers: headers
          })
          
          console.log("Reached this place");
      
    }
    
    divStyle = {
        backgroundColor: '#A9A8E8',
        borderStyle: 'solid',
        margin: '10px'
    }

    // calendarStyle = {
    //     display: 'inline-block'
    // }


    render(){
        if(this.state.loading){
            return (
                <div>loading...</div>
            );
        }
        else{
            const list =  this.state.spot.map((todo, index) => (
                <div>
                    
                    
                    <div key={index}>
                        <div style={this.divStyle}>
                            <hr></hr> 
                            <p>Address: {todo.street_Number} {todo.steet_Name}</p>
                            <p>Postal Code: {todo.postal_Code }</p> 
                            <p>Price: {todo.current_Price}</p>     
                            <p>Rating: {todo.avg_Rating}</p>  
                            <button onClick={this.displayAds}>Reserve </button> 
                        </div>
                    </div>
                </div>
            ))
            

            return (
                
                    <div>
                        <div>
                            <Calendar
                            onChange={this.onChange}
                            value={this.state.startDate}
                            />
                        </div>

                       

                        <div>
                            <Calendar
                            onChange={this.onChangeEnd}
                            value={this.state.endDate}
                            />
                        </div>
                    
                    {/* <FormGroup controlId="startDate" bsSize="medium">
                            <ControlLabel>Enter start date here</ControlLabel>
                            <FormControl
                            value={this.state.startDate}
                            onChange={this.handleChange}
                            />
                    </FormGroup>

                    <FormGroup controlId="endDate" bsSize="medium">
                            <ControlLabel>Enter end date here</ControlLabel>
                            <FormControl
                            value={this.state.endDate}
                            onChange={this.handleChange}
                            />

                            
                    </FormGroup> */}
                   
                    {list}

                </div>
                
            )
            
        }
        
       
    }
}