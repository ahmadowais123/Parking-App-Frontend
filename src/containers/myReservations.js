import React,{Component} from "react";
import axios from 'axios';

export default class myReservations extends Component{

    state = {
        loading: true,
        reservation: null,
    };

    async componentDidMount(){
       const url = "https://parking-system-ecse428.herokuapp.com/reservation/all";
       const response = await fetch(url);
       var data = await response.json();
       data = JSON.parse(JSON.stringify(data));
       console.log(data);
       this.setState({reservation: data, loading: false});
       console.log(this.state.reservation);
    }

    cancelReservation= event => {
      var values = [];
      var keys = Object.keys(localStorage);
      var i = keys.length;
      while ( i-- ) {
          values.push( localStorage.getItem(keys[i]) );
      }
      const user = JSON.parse(values[0]);
        console.log(user);
        console.log(String(user.last_Name));

     /*   var headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }

          axios({
            method: 'post',
            url: 'https://parking-system-ecse428.herokuapp.com/reservation',
            data: user,
            headers: headers
          })*/
    }
    divStyle = {
        backgroundColor: '#A9A8E8',
        borderStyle: 'solid',
        margin: '10px'
    }

    getUser(){
        var values = [];
        var keys = Object.keys(localStorage);
        var i = keys.length;
        while ( i-- ) {
            values.push( localStorage.getItem(keys[i]) );
        }
        var user = JSON.parse(values[0]);
        return user;
    }

    reservationList() {
        var user = this.getUser();
        var reservations = user.reservations;
        if (reservations.length > 0) {
            var list = reservations.map((todo, index) => (
                <div key={index}>
                    <div>
                        <div style={this.divStyle}>
                            <h3> Parking {todo.pkey} </h3>
                            <hr></hr>
                            <p> Address :{todo.parkingSpot.street_Number}{todo.parkingSpot.steet_Name}</p>
                            <p> Postal Code: {todo.parkingSpot.postal_Code}</p>
                            <p> Start Date: {todo.start_Date}</p>
                            <p> End Date: {todo.end_Date}</p>
                            <p> Start Time: {todo.start_Time}</p>
                            <p> End Time: {todo.end_Time}</p>
                            <p> Total Cost: {todo.parkingSpot.current_Price}</p>
                            <p> Rating : {todo.parkingSpot.avg_Rating}</p>
                            <button onClick={this.cancelReservation}> Cancel</button>
                            </div>
                        </div>
                    </div>
                ))
            }
        else{
            list =  <div>You have no reservations</div>
        }
        return list;
    }

    render(){
        if(this.state.loading){
            return (
                <div>loading...</div>
            )
        }
        else{
            return (
                < div >
                    {this.reservationList()}
                </div>
            )
        }
    }
}
