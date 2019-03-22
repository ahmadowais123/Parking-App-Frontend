import React,{Component} from "react";
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


    formatDate = (date) => {
        var date2 = date.toISOString().substr(0, 19).replace('T', ' ');
        return date2;
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
        var values = [];
        var keys = Object.keys(localStorage);
        var i = keys.length;
    
        while ( i-- ) {
          values.push( localStorage.getItem(keys[i]) );
        }
        const userR = JSON.parse(values[0]);


        var startDateString = this.formatDate(this.state.startDate);
        console.log(startDateString);
        var endDateString = this.formatDate(this.state.endDate);
        console.log(endDateString);

        var user = {
            "pkey" : "19",
            "plate" : "kkk k8h",
            "startDate" : startDateString, 
            "endDate" : endDateString, 
            "pricePaid" : "2", 
            "startTime" : "5", 
            "endTime" : "10", 
            "user" : {
                "firstName" : localStorage.getItem('first_name'), //retrieve from local storage
                "lastName" : localStorage.getItem('last_name'),
                "id" : "1",
                "password" : "scrum",
                "email" : localStorage.getItem('email'),
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
                "pkey" : "778",
                "addressNumber" : "9988",
                "streetName" : "Final",
                "postalCode" : "H2H 2H2",
                "avgRating" : "5.4",
                "currentPrice" : "99",
                "user" : 
                {
                    "firstName" : "Antoine",
                    "lastName" : "Hamasaki-Belanger",
                    "id" : "430",
                    "password" : "123",
                    "email" : "heybigboy17@gmail.com",
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
                <div key={index}>
                    
                    <div >
                        <div style={this.divStyle}>
                            <h3>Parking  {todo.pkey}   </h3>
                            <hr></hr> 
                            <p>Address: {todo.street_Number} {todo.steet_Name}</p>
                            <p>Postal Code: {todo.postal_Code }</p> 
                            <p>Price: {todo.current_Price}</p>     
                            <p>Rating: {todo.avg_Rating}</p>  
                            <button onClick={this.displayAds}>Reserve</button> 
                        </div>
                    </div>
                </div>
            ))
            

            return (
                
                <div>
                    <div>
                        <h2>Start Date</h2>
                            <Calendar
                            onChange={this.onChange}
                            value={this.state.startDate}
                            />
                    </div>

                    <div>
                    <h2>End Date</h2>
                            <Calendar
                            onChange={this.onChangeEnd}
                            value={this.state.endDate}
                            />
                    </div>

                    {list}

                </div>
                
            )
            
        }
        
       
    }
}