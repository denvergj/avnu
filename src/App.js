import React, { Component } from 'react';
import { BrowserRouter, Link, Switch, Route } from 'react-router-dom';
import MenuArea from './Header/Menu';
import Footer from './Footer';
import Home from './Home';
import StandardPage from './StandardPage';
import OurListings from './OurListings';
import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <header className="avnu-header">
          	<MenuArea />
          	<Link to="/about"></Link>
          	<Link to="/our-listings"></Link>
          </header>
          <main>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/our-listings" component={OurListings} />
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
