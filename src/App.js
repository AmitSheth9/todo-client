import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  NavLink,
  Redirect
} from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import SignUp from './SignUp';
import TodoPage from './TodoPage';
import './App.css';

const TOKEN_KEY = 'TOKEN'
export default class App extends Component {
state = {
  token: localStorage.getItem(TOKEN_KEY) || ''
}
  handleTokenChange = token => {
    localStorage.setItem(TOKEN_KEY, token)
    this.setState({ token: token })
  }

  logout = () => {
    localStorage.clear()
    this.setState({ token: ''})
  }
  render() {
    console.log(this.state)
  return (
    <div>
      <Router>
        <header>
          <NavLink exact activeClassName='active-link' to="/">Home</NavLink>
          <NavLink exact activeClassName='active-link' to="/signup">SignUp</NavLink>
          <NavLink exact activeClassName='active-link' to="/login">Login</NavLink>
          <NavLink exact activeClassName='active-link' to="/todopage">TodoPage</NavLink>
          {this.state.token && <button onClick={this.logout}>Logout</button>}
        </header>
        <Switch>
          <Route
          path="/"
          exact
          render={(routerProps) => <Home {...routerProps}/>}/>
          <Route
          path="/signup"
          exact
          render={(routerProps) => <SignUp 
          handleTokenChange={this.handleTokenChange}
          {...routerProps}/>}/>
          <Route
          path="/login"
          exact
          render={(routerProps) => <Login handleTokenChange={this.handleTokenChange}
          {...routerProps}/>}/>
          <Route
          path="/todopage"
          exact
          render={(routerProps) => this.state.token ? <TodoPage token = {this.state.token}{...routerProps}/> : <Redirect to = "/signup"/> }/>
          
        </Switch>
      </Router>
    </div>
  )
}

}
