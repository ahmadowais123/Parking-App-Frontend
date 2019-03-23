import React,{Component} from "react";
import Calendar from 'react-calendar';

import axios from 'axios';

export default class Browse extends Component{

    state = {
        loading: false,
        spot: [],
        startDate: null,
        endDate: null
    };


    checkDates() {
        console.log(this.state.startDate);
        console.log(this.state.endDate);
        if(this.state.startDate && this.state.endDate) {
            if(this.state.startDate.getTime() < this.state.endDate.getTime())
            return true;
        } else {
            return false;
        }
    }

    onChange = (startDate) => {
        this.setState({startDate});
    };

    onChangeEnd = (endDate) => {
        this.setState({endDate});
    };


    //changes appropriate state variables for whatever is typed into the fields
    handleChange = event => {
        this.setState({
        [event.target.id]: event.target.value
        });
    };


    formatDate = (date) => {
        var date2 = date.toISOString().substr(0, 19).replace('T', ' ');
        return date2;
    };


    displayAds = (event) => {
           let url = "https://parking-system-ecse428.herokuapp.com/spot/getFreeSpots";
           var startDate = this.formatDate(this.state.startDate);
           var endDate = this.formatDate(this.state.endDate);
           url += "?startDate=" + startDate + "&endDate=" + endDate;

           axios.get(url).then((response) => {
               this.setState({spot: response.data});
               console.log(response);
           });
    };

    reserve = (todo, event) => {
        var self = this;
        var values = [];
        var keys = Object.keys(localStorage);
        var i = keys.length;

        while ( i-- ) {
          values.push( localStorage.getItem(keys[i]) );
        }
        
        const userR = JSON.parse(values[0]);

        axios.get("https://parking-system-ecse428.herokuapp.com/spot/getOwner/" + todo.pkey)
        .then((function (response){
            if(response.status == 200){
                var owner = response.data;

                var startDateString = self.formatDate(self.state.startDate);
                console.log(startDateString);
                var endDateString = self.formatDate(self.state.endDate);
                console.log(endDateString);
                console.log(todo);

                var requestHeaders = {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                };

                var reservation = {
                    plate : "",
                    startDate : startDateString,
                    endDate : endDateString,
                    pricePaid : todo.current_Price,
                    startTime : "0",
                    endTime : "24",
                    user : {
                        firstName : userR.first_name, //retrieve from local storage
                        lastName : userR.last_name,
                        id : userR.userID,
                        password : userR.password,
                        email : userR.email,
                        isRenter : userR.isRenter,
                        isSeller : userR.isSeller,
                        parkingManager :
                            {
                                pkey : "1"
                            }
                    },
                    parkingManager : {
                        pkey : "1"
                    },
                    spot : {
                        pkey : todo.pkey,
                        addressNumber : todo.street_Number,
                        streetName : todo.street_Name,
                        postalCode : todo.postal_Code ,
                        avgRating : todo.avg_Rating,
                        currentPrice : todo.current_Price,
                        user :
                            {
                                firstName : owner.first_name,
                                lastName : owner.last_name,
                                password : owner.password,
                                email : owner.email,
                                isRenter : owner.isRenter,
                                isSeller : owner.isSeller,
                                parkingManager :
                                    {
                                        pkey : "1"
                                    }
                            },
                        parkingManager :
                            {
                                pkey: "1"
                            }
                    },
                    headers: requestHeaders
                };


                var reservationUrl = 'https://parking-system-ecse428.herokuapp.com/reservation';

                axios.post(reservationUrl, reservation)
                    .then((response) => {
                        if(response.status == 200) {
                            self.displayAds();
                            console.log("Reservation created");
                        }
                }).catch((error) => {
                    console.log(error.response);
                    console.log("Failed");
                });

            }
        }));
    };

    divStyle = {
        backgroundColor: '#A9A8E8',
        borderStyle: 'solid',
        margin: '10px'
    };

    calendarStyle = {
        display: 'inline-block',
        margin: '20px'
    };

    rowStyle = {
      textAlign: 'center'
    };

    buttonStyle = {
       // text-align: 
    };

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
            ));


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
                    <button disabled={!this.checkDates()} onClick={(event) => this.displayAds(event)} style={this.buttonStyle} >Show Ads</button>
                    <div>
                        {list}
                    </div>
                </div>

            )

        }


    }
}
