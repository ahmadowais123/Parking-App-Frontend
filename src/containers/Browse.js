import React,{Component} from "react";

export default class Browse extends Component{

    state = {
        loading: true,
        spot: null,
    };

    async componentDidMount(){
       const url = "https://parking-system-ecse428.herokuapp.com/spot/all";
       const response = await fetch(url);
       var data = await response.json();
       data = JSON.parse(JSON.stringify(data));
       console.log(data)
       this.setState({spot: data, loading: false})
       console.log(this.state.spot)
    }
    
    displayAds=() => {
        console.log("WAS CLICKED")
    }
    
    render(){
        if(this.state.loading){
            return (
                <div>loading...</div>
            );
        }else{
            return  this.state.spot.map((todo, index) => (
                <div key={index}>
                    <div onClick={this.displayAds()}>
                        <h1>{todo.street_Number} {todo.steet_Name}</h1> 
                        
                    </div>
                </div>
            ));
        }
        // return <div>
        //     {this.state.loading || !this.state.spot ? (
        //     <div>loading...</div> 
        //     ) : (
        //     <div>
        //         <div>{this.state.spot.street_Number}</div>
        //         <div>{this.state.spot.steet_Name}</div>
        //     </div>
        //     )}
        // </div>;
    }
}