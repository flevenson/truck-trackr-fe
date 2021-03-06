import React, { Component } from "react";
import { Route, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { SignUpPage } from "../../components/SignUpPage";
import { BusinessContainer } from "../../components/BusinessContainer";
import "./App.css";
import hamburger from "../../assets/hamburger.svg";
import ProfilePage from "../ProfilePage";
import NavBar from "../NavBar";
import truck from "../../assets/food-truck.png";
import barrel from "../../assets/barrel-icon-new.png";
import { withFirebase } from "../../components/Firebase";
import { loadProfile, addUser, removeUser } from "../../actions";

export class App extends Component {
  constructor() {
    super();
    this.state = {
      navOpen: false
    };
  }

  componentDidMount() {
    if (!Object.keys(this.props.user).length) {
      this.props.history.push("/");
    }
  }

  handleNavBar = e => {
    // document.querySelector(".hamburger-trigger").classList.toggle("active");
    this.setState({ navOpen: !this.state.navOpen });
  };

  handleNavBar = () => {
    this.setState({ navOpen: !this.state.navOpen });
  };

  handleNavBar = () => {
    this.setState({ navOpen: !this.state.navOpen });
  };

  logOutUser = () => {
    this.props.removeUser();
    sessionStorage.setItem('uid', '')
    this.setState({navOpen: false})
    this.props.history.push("/");
  };

  render() {
    const { navOpen } = this.state;
    const { match, user } = this.props;

    return (
      <div className="main">
        <header>
          <h1 className="main-title">
            <span>
              <img src={truck} className="truck-icon" />
            </span>
            TruckTrackr
            <span>
              <img src={barrel} className="barrel-icon" />
            </span>
          </h1>
          <section
            className={Object.keys(user).length ? "hamburger-holder" : "hidden"}
          >
            <a
              onClick={this.handleNavBar}
              className={`hamburger-trigger ${this.state.navOpen}`}
              id="hamburger"
            >
              <span />
              <span />
              <span />
            </a>
          </section>
          <button
            onClick={this.logOutUser}
            className={
              Object.keys(this.props.user).length ? "logout-button" : "hidden"
            }
          >
            Log Out
          </button>
        </header>
        <div className="content-holder">
          <NavBar
            displayStatus={this.state.navOpen}
            history={this.props.history}
          />

          <Route
            exact
            path="/"
            render={props => <SignUpPage history={this.props.history} />}
          />
          <Route exact path="/profile" component={ProfilePage} />
          <Route
            exact
            path="/breweries"
            render={props => (
              <BusinessContainer
                data={this.props.breweries}
                changeCurrentPage={this.props.changeCurrentPage}
                currentPage={this.props.currentPage.page}
                loadProfile={this.props.loadProfile}
                history={this.props.history}
              />
            )}
          />
          <Route
            exact
            path="/food_trucks"
            render={props => (
              <BusinessContainer
                data={this.props.foodTrucks}
                changeCurrentPage={this.props.changeCurrentPage}
                currentPage={this.props.currentPage.page}
                loadProfile={this.props.loadProfile}
                history={this.props.history}
              />
            )}
          />
          <Route path="/business/:businessName" component={ProfilePage} />
        </div>
      </div>
    );
  }
}

export const mapStateToProps = state => ({
  breweries: state.breweries,
  foodTrucks: state.foodTrucks,
  currentPage: state.currentPage,
  user: state.user
});

export const mapDispatchToProps = dispatch => ({
  loadProfile: profile => dispatch(loadProfile(profile)),
  addUser: user => dispatch(addUser(user)),
  removeUser: () => dispatch(removeUser())
});

const { object, func, array } = PropTypes;

App.propTypes = {
  breweries: array,
  foodTrucks: array,
  currentPage: object,
  loadProfile: func
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withFirebase(App)));
