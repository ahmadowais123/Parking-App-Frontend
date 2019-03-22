import React, { Component } from "react";
import "./Home.css";

//The default homepage; add search stuff here

export default class Home extends Component {
  missionStyle = {
    width: '500px',
    height: '500px'
  }
  howStyle = {
    width: '50%',
    height: '50%'
  }
  render() {
    return (
      <div className="Home">
        <div className="lander">
          <img src={require('../assets/Header.png')} />
          <br/> <br/> <br/>
          <img style={this.missionStyle} src={require('../assets/Mission.png')} />
          <br/> <br/> <br/>
          <img style={this.howStyle} src={require('../assets/How.png')} />
        </div>
      </div>
    );
  }
}
