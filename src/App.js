import React, { Component } from 'react';
import { BrowserRouter, Link, Switch, Route } from 'react-router-dom';
import MenuArea from './Header/Menu';
import Footer from './Footer';
import Home from './Home';
import Post from './Post';
import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <header className="avnu-header">
          	<MenuArea />
            {/*<Link to="/">
              <img src={logo} className="App-logo" alt="logo" />
            </Link>*/}
          </header>
          <main>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/:id" component={Post} />
            </Switch>
          </main>
          
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
