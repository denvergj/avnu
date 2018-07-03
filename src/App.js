import React, { Component } from 'react';
import { BrowserRouter, Link, Switch, Route } from 'react-router-dom';
import MenuArea from './Header/Menu';
import Footer from './Footer';
import Home from './Home';
import StandardPage from './StandardPage';
import OurListings from './OurListings';
import OurAgents from './OurAgents';
import './App.css';

class App extends Component {
	

  componentDidMount() {
	  console.log('finished loading');
  }	
	
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <header className="avnu-header">
          	<MenuArea />
          	<Link to="/about"></Link>
          	<Link to="/our-listings"></Link>
          	<Link to="/our-agents"></Link>
          </header>
          <main>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/our-listings" component={OurListings} />
              <Route path="/our-agents" component={OurAgents} />
              <Route path="/:id" component={StandardPage} />
            </Switch>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
