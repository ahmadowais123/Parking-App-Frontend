import React,{Component} from "react";

export default class Browse extends Component{

    state = {
        loading: true,
        person: null,
    };

    async componentDidMount(){
       const url = "https://parking-system-ecse428.herokuapp.com/user/all";
       const response = await fetch(url);
       const data = await response.json();
       data = JSON.parse(JSON.stringify(data[0]));
       
       this.setState({person: data, loading: false})
    }

    render(){
        return <div>
            {this.state.loading || !this.state.person ? (
            <div>loading...</div> 
            ) : (
            <div>
                <div>{this.state.person.password}</div>
                <div>{this.state.person.email}</div>
            </div>
            )}
        </div>;
    }
}