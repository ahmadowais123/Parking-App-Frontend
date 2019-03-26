import React,{Component} from "react";
import axios from 'axios';
import swal from 'sweetalert';


export default class myReservations extends Component{
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            reservation: null,
            pkey: null,
        };
    }

    async componentDidMount(){
        var self = this;
        var values = [];
        var keys = Object.keys(localStorage);
        var i = keys.length;

        while ( i-- ) {
            values.push( localStorage.getItem(keys[i]) );
        }

        const userR = JSON.parse(values[0]);
        let url = "https://parking-system-ecse428.herokuapp.com/reservation/forUser/" + userR.userID;
        const response = await fetch(url);
        let data = await response.json();
        data = JSON.parse(JSON.stringify(data));
        console.log(data);
        this.setState({reservation: data, loading: false});
        console.log(this.state.reservation);
    }

    updateReservations() {
        var self = this;
        var values = [];
        var keys = Object.keys(localStorage);
        var i = keys.length;

        while ( i-- ) {
            values.push( localStorage.getItem(keys[i]) );
        }

        const userR = JSON.parse(values[0]);
        let url = "https://parking-system-ecse428.herokuapp.com/reservation/forUser/" + userR.userID;
        axios.get(url).then((response) => {
            let data = response.data;
            console.log(data);
            this.setState({reservation: data, loading: false});
            console.log(this.state.reservation);
        });
    }


    cancelReservation(todo) {
        var self = this;
        swal({
          title: "Are you sure?",
          text: "You are about to cancel your reservation for the parking spot on " + todo.parkingSpot.street_Number + " " + todo.parkingSpot.street_Name + "!",
          icon: "warning",
          buttons: ["Don't cancel", "Cancel Reservation!"],
          dangerMode: true,
        })
        .then((willDelete) => {
          if (willDelete) {
           axios.post("https://parking-system-ecse428.herokuapp.com/reservation/delete/" + todo.pkey)
                      .then((function (response){
                          if(response.status == 200){
                                swal("Your reservation has been cancelled!", {
                                            icon: "success",
                                          });
                              self.updateReservations();

                          }
                      })).catch(function (error){
                          swal("Oops something went wrong! You may want to contact the development team.", {
                              icon: "error",
                       });
                       console.log(error.response);
                       console.log('Failed');
                      });

          } else {
            swal("You did not cancel your reservation.");
          }
        });
    }

    divStyle = {
        backgroundColor: '#A9C5E8',
        borderStyle: 'solid',
        margin: '10px',
        borderColor: '#A9C5E8',
        padding: '15px',
        width: '50%',
        borderRadius: '25px',
        fontFamily: 'Georgia'
    };

    buttonStyle = {
        borderRadius: '10px',
        fontFamily: 'Georgia'
    };

    reservationList() {
        let reservations = this.state.reservation;
        if (reservations.length > 0) {
            var list = reservations.map((todo, index) => (
                <div id={index}>
                    <div>
                        <div style={this.divStyle}>
                            <h3> Reservation {index+1} </h3>
                            <hr></hr>
                            <p> Address: {todo.parkingSpot.street_Number} {todo.parkingSpot.street_Name} </p>
                            <p> Postal Code: {todo.parkingSpot.postal_Code} </p>
                            <p> Start Date: {todo.start_Date} </p>
                            <p> End Date: {todo.end_Date} </p>
                            <p> Start Time: {todo.start_Time} </p>
                            <p> End Time: {todo.end_Time} </p>
                            <p> Total Cost: {todo.price_Paid} </p>
                            <p> Rating: {todo.parkingSpot.avg_Rating} </p>
                            <button style={this.buttonStyle} onClick={(event) => this.cancelReservation(todo)}> Cancel </button>
                            </div>
                        </div>
                    </div>
                ))
            }
        else{
            list =  <div>You have no reservations.</div>
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