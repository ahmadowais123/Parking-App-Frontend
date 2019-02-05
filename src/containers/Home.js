import React, { Component } from "react";
import "./Home.css";

//The default homepage; add search stuff here

export default class Home extends Component {
  render() {
    return (
      <div className="Home">
        <div className="lander">
          <h1>Parking App</h1>
          <p>Simple template</p>
        </div>
      </div>
    );
  }
}