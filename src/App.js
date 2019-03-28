import React, { Component,  Fragment } from "react";
import { Link, withRouter  } from "react-router-dom";
import "./App.css";
import Routes from "./Routes";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

/*
* App renders links on the main page according to user log-in status which is persisted in localStorage
*/
//Add tabs to the navigation bar here

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false
    };
  }

  //Used to check if user has successfully logged in -- renders different navbar according to authentication status
  userHasAuthenticated = (authenticated) => {
    console.log("in authenticated func");
    this.setState({ isAuthenticated: authenticated });
  };

  //Logs user out and sets localStorage loginStatus false
  handleLogout = async event => {
    this.userHasAuthenticated(false);
    localStorage.setItem('loginStatus', 'false');
    this.props.history.push("/home");
  };


  /*
  If user is new or logged out then Register and Login are only options available -- If logged in then Browse, Create Spot, Reservations
  and Logout are rendered
   */
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
            {localStorage.getItem('loginStatus') === 'true'
             ?
             <Fragment>
              <NavItem onClick={this.handleLogout}>Logout</NavItem>
               <LinkContainer to="/browse"><NavItem>Browse</NavItem></LinkContainer>
               <LinkContainer to="/create_spot"><NavItem>Create Spot</NavItem></LinkContainer>
               <LinkContainer to="/reservation"><NavItem>My Reservations</NavItem></LinkContainer>
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
