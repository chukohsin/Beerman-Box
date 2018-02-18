import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import store, { fetchRankBeer, fetchStyles } from './store'
import Home from './components/Home.jsx'
import Navbar from './components/Navbar.jsx'


export default class Root extends Component {
  componentDidMount() {
    store.dispatch(fetchRankBeer())
    store.dispatch(fetchStyles())
  }

  render() {
    return (
      <Router>
        <div>
          <Navbar />
          <main className="container">
            <Switch>
              <Route exact path="/" component={Home} />
            </Switch>
          </main>
        </div>
      </Router>
    )
  }
}
