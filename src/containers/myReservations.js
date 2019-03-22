import React,{Component} from "react";
import axios from 'axios';

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
       const url = "https://parking-system-ecse428.herokuapp.com/reservation/all";
       const response = await fetch(url);
       let data = await response.json();
       data = JSON.parse(JSON.stringify(data));
       console.log(data);
       this.setState({reservation: data, loading: false});
       console.log(this.state.reservation);
    }

    /*async componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if (this.props.userID !== prevProps.userID) {
            this.fetchData(this.props.userID);
            const url = "https://parking-system-ecse428.herokuapp.com/reservation/all";
            const response = await fetch(url);
            let data = await response.json();
            data = JSON.parse(JSON.stringify(data));
            console.log(data);
            this.setState({reservation: data, loading: false});
        }*/



    cancelReservation(pkey) {

        axios.delete(`/reservation/delete/${pkey}`)
            .then((function (response){
                if(response.status == 200){

                    localStorage.setItem('myData', JSON.stringify(response.data));
                    this.render();

                }
            }))
        //this.render();





    }
    divStyle = {
        backgroundColor: '#A9A8E8',
        borderStyle: 'solid',
        margin: '10px'
    }

    getUser(){
        let values = [];
        let keys = Object.keys(localStorage);
        let i = keys.length;
        while ( i-- ) {
            values.push( localStorage.getItem(keys[i]) );
        }
        var user = JSON.parse(values[0]);
        return user;
    }

    reservationList() {
        let user = this.getUser();
        let reservations = user.reservations;
        if (reservations.length > 0) {
            var list = reservations.map((todo, index) => (
                <div key={index}>
                    <div>
                        <div style={this.divStyle}>
                            <h3> Parking {todo.pkey} </h3>
                            <hr></hr>
                            <p> Address: {todo.parkingSpot.street_Number} {todo.parkingSpot.steet_Name} </p>
                            <p> Postal Code: {todo.parkingSpot.postal_Code} </p>
                            <p> Start Date: {todo.start_Date} </p>
                            <p> End Date: {todo.end_Date} </p>
                            <p> Start Time: {todo.start_Time} </p>
                            <p> End Time: {todo.end_Time} </p>
                            <p> Total Cost: {todo.price_Paid} </p>
                            <p> Rating: {todo.parkingSpot.avg_Rating} </p>
                            <button onClick={this.cancelReservation(todo.pkey)}> Cancel </button>
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