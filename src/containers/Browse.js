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
           
        var hour = date.getHours();
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();
        var year = date.getFullYear();
        var month = date.getMonth();
        var day = date.getDay();
        var date2 = (year+"-"+month+"-"+day+" "+hour+":"+minutes+":"+seconds);
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
        var endDateString = this.formatDate(this.state.endDate);

        var user = {
            "pkey" : "13",
            "plate" : "kk6 k8h",
            "startDate" : startDateString, 
            "endDate" : endDateString, 
            "pricePaid" : "2", 
            "startTime" : "5", 
            "endTime" : "10", 
            "user" : {
                "firstName" : String(this.state.userR.first_name),
                "lastName" : String(this.state.userR.last_Name),
                "id" : String(this.state.userR.userID),
                "password" : String(this.state.userR.password),
                "email" : String(this.state.userR.email),
                "isRenter" : String(this.state.userR.isRenter),
                "isSeller" : String(this.state.userR.isSeller),
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
                "addressNumber" : 9988,
                "streetName" : "Final",
                "postalCode" : "H2H 2H2",
                "avgRating" : 5.4,
                "currentPrice" : 99,
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
                <div key={index}>
                    
                    <div >
                        <div style={this.divStyle}>
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

                    {list}

                </div>
                
            )
            
        }
        
       
    }
}