import React,{Component} from "react";

export default class Browse extends Component{

    state = {
        loading: true,
        person: null,
    };

    async componentDidMount(){
       const url = "https://parking-system-ecse428.herokuapp.com/spot/all";
       const response = await fetch(url);
       var data = await response.json();
       data = JSON.parse(JSON.stringify(data[1]));
       console.log(data)
       this.setState({person: data, loading: false})
       console.log(this.state.person)
    }

    render(){
        return <div>
            {this.state.loading || !this.state.person ? (
            <div>loading...</div> 
            ) : (
            <div>
                <div>{this.state.person.street_Number}</div>
                <div>{this.state.person.steet_Name}</div>
            </div>
            )}
        </div>;
    }
}