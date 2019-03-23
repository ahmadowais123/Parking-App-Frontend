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
       let url = "https://parking-system-ecse428.herokuapp.com/spot/getFreeSpots";
       var startDate = this.formatDate(this.state.startDate);
       var endDate = this.formatDate(this.state.endDate);
       url += "?startDate=" + startDate + "&endDate=" + endDate; 

       const response = await fetch(url);
       var data = await response.json();
       data = JSON.parse(JSON.stringify(data));
       console.log(data)
       this.setState({spot: data, loading: false})
       console.log(this.state.spot)
    }

    reserve = (todo, event) => {
        var values = [];
        var keys = Object.keys(localStorage);
        var i = keys.length;

        while ( i-- ) {
          values.push( localStorage.getItem(keys[i]) );
        }
        
        const userR = JSON.parse(values[0]);

        //Get owner of parking spot
        var owner;
        var data = {
            "pKey": todo.pKey
        }
        // axios.get("https://parking-system-ecse428.herokuapp.com/reservation")
        // .then((function (response){
        //     if(response.status == 200){
        //         owner = response.data;
        //     }
        // }))


        var startDateString = this.formatDate(this.state.startDate);
        console.log(startDateString);
        var endDateString = this.formatDate(this.state.endDate);
        console.log(endDateString);
        console.log(todo)
        var user = {
            "plate" : "",
            "startDate" : startDateString,
            "endDate" : endDateString,
            "pricePaid" : todo.current_Price,
            "startTime" : "0",
            "endTime" : "24",
            "user" : {
                "firstName" : localStorage.getItem('first_name'), //retrieve from local storage
                "lastName" : localStorage.getItem('last_name'),
                "id" : String(userR.userID),
                "password" : String(userR.password),
                "email" : localStorage.getItem('email'),
                "isRenter" : "true",
                "isSeller" : "true",
                "parkingManager" :
                {
                    "pkey" : "1"
                }
            },
            "parkingManager" : {
                "pkey" : "1"
            },
            "spot" : {
                "pkey" : todo.pkey,
                "addressNumber" : todo.street_Number,
                "streetName" : todo.steet_Name,
                "postalCode" : todo.postal_Code ,
                "avgRating" : todo.avg_Rating,
                "currentPrice" : todo.current_Price,
                "user" :
                {
                    "firstName" : "daddy",
                    "lastName" : "daddy",
                    "password" : "1",
                    "email" : "daddy@gmail.com",
                    "isRenter" : "true",
                    "isSeller" : "true",
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

    calendarStyle = {
        display: 'inline-block',
        margin: '20px'
    }

    rowStyle = {
      textAlign: 'center'
    }

    buttonStyle = {
       // text-align: 
    }

    render(){
        if(this.state.loading){
            return (
                <div>loading...</div>
            );
        }
        else{
            const list =  this.state.spot.map((todo, index) => (
                <div id={index}>
                    <div >
                        <div style={this.divStyle}>
                            <h3>Parking  {todo.pkey}   </h3>
                            <hr></hr>
                            <p>Address: {todo.street_Number} {todo.street_Name}</p>
                            <p>Postal Code: {todo.postal_Code }</p>
                            <p>Price: {todo.current_Price}</p>
                            <p>Rating: {todo.avg_Rating}</p>
                            <button onClick={(event) => this.reserve(todo, event)}>Reserve</button>
                        </div>
                    </div>
                </div>
            ))


            return (

                <div>
                    <div style={this.rowStyle}>
                    <div style={this.calendarStyle}>
                        <h2>Start Date</h2>
                            <Calendar
                            onChange={this.onChange}
                            value={this.state.startDate}
                            />
                    </div>

                    <div style={this.calendarStyle}>
                    <h2>End Date</h2>
                            <Calendar
                            onChange={this.onChangeEnd}
                            value={this.state.endDate}
                            />
                    </div>
                </div>
                    <button style={this.buttonStyle}>Show Ads</button>
                    {list}
                </div>

            )

        }


    }
}
