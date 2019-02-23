import React, { Component,  Fragment } from "react";
import { Link, withRouter  } from "react-router-dom";
import "./App.css";
import Routes from "./Routes";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";


//Add tabs to the navigation bar here

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false
    };
  }
  
  userHasAuthenticated = (authenticated) => {
    console.log("in authenticated func");
    this.setState({ isAuthenticated: authenticated });
  }

  handleLogout = async event => {
    this.userHasAuthenticated(false);
    this.props.history.push("/home");
  }
  
  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated
    };
    return (
      <div className="App container">
        <Navbar fluid collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">Parking App</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
            {this.state.isAuthenticated
             ?    
             <Fragment>
              <NavItem onClick={this.handleLogout}>Logout</NavItem>
               <LinkContainer to="/browse"><NavItem>Browse</NavItem></LinkContainer>
              </Fragment>
             :
              <Fragment>
                <LinkContainer to="/register">
                  <NavItem>Register</NavItem>
                </LinkContainer>
                <LinkContainer to="/login">
                 <NavItem>Login</NavItem>
                </LinkContainer>
              </Fragment>
            }   
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Routes childProps={childProps} />
      </div>
    );
  }
}



export default withRouter(App);