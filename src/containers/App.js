import React, { Component } from 'react';
import { connect } from 'react-redux';
import SearchBox from "../components/SearchBox";
import Scroll from "../components/Scroll";
import CardList from "../components/CardList";
import ErrorBoundry from  "../components/ErrorBoundry";
import "./App.css";

import { setSearchfield } from '../action'

const mapStateToProps = state => {
    return {
        searchField: state.searchField
    }
}

const mapDispatchToTProps = (dispatch) => {
    return{
        onSearchChange: (event) => dispatch(setSearchfield(event.target.value))
    }
}

class App extends Component {
    constructor() {
      super()
      this.state = {
        robots: []
      }
    }
  
    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response=> response.json())
            .then(users => {this.setState({ robots: users})});
    }
  
    render() {
      const { robots, searchfield } = this.state;
      const { searchField, onSearchChange } = this.props
      const filteredRobots = robots.filter(robot =>{
        return robot.name.toLowerCase().includes(searchField.toLowerCase());
      })
      return !robots.length ?
        <h1>Loading</h1> :
        (
          <div className='tc'>
            <h1 className='f1'>RoboFriends</h1>
            <SearchBox searchChange={onSearchChange}/>
            <Scroll>
              <CardList robots={filteredRobots} />
            </Scroll>
          </div>
        );
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToTProps)(App);