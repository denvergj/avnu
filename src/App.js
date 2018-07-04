import React, { Component } from 'react';
import { BrowserRouter, Link, Switch, Route } from 'react-router-dom';
import MenuArea from './Header/Menu';
import ContactArea from './Header/Contact';
import Footer from './Footer';
import Home from './Home';
import StandardPage from './StandardPage';
import OurListings from './OurListings';
import OurAgents from './OurAgents';
import AgentProfile from './AgentProfile';
import AgentProfileThird from './AgentProfileThird';
import PropertyDetail from './PropertyDetail';
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
          	<ContactArea />
          	<Link to="/about"></Link>
          	<Link to="/our-listings"></Link>
          	<Link to="/our-listings/property-detail"></Link>
          	<Link to="/our-agents"></Link>
          	<Link to="/our-agents/adrian"></Link>
          	<Link to="/our-agents/agent-third"></Link>
          </header>
          <main>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/our-listings/property-detail" component={PropertyDetail} />
              <Route path="/our-listings" component={OurListings} />
              <Route path="/our-agents/agent-third" component={AgentProfileThird} />
              <Route path="/our-agents/:agent" component={AgentProfile} />
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
