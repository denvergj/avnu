import React, { Component } from 'react';
import OverlayMenu from 'react-overlay-menu';
import { BrowserRouter, Link, Switch, Route } from 'react-router-dom';
import { createClient } from 'contentful';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
 
class MenuArea extends Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: false, subMenuOpen: null, agents: null };
    this.toggleMenu = this.toggleMenu.bind(this);
  }
 
  toggleMenu() {
    this.setState({ isOpen: !this.state.isOpen });
  }
  
  toggleSubMenu(index, e) {
    this.setState({ subMenuOpen: index });
  }
  
  componentWillMount() {
		const client = createClient({
			space: process.env.REACT_APP_SPACE_ID,
			accessToken: process.env.REACT_APP_ACCESS_TOKEN
		});
	  
	  
	  // Agents
	  client
      // use getEntries because it does link resolution
      .getEntries({
	    content_type: 'agent'
      })
      .then(response => {
        // extract the data from the response array
        return response.items;
      })
      .then(fields => {
        this.setState({
          agents: fields
        });
      })
      .catch(console.error);
      
  }
 
  render() {
    return (
      <div className="menuArea">
        <button type="button" className={(this.state.isOpen ? 'is-active' : 'hidden') + ' hamburger--collapse hamburger'} onClick={this.toggleMenu}>
        	<span className="hamburger-box">
		    	<span className="hamburger-inner"></span>
		    </span>
        	<a href="/">
        		<img src="https://images.ctfassets.net/dkcrc82u6zt9/5dmP7ER9zO8wMUs4UkYYwg/e28d44c0ef1cbeed182835a56362719a/avnu-logo.png" className="App-logo" alt="logo" />
        	</a>
        </button>
        <OverlayMenu 
          open={this.state.isOpen} 
          onClose={this.toggleMenu}
        >
          <div className={"menu-item "+(this.state.subMenuOpen==0 ? 'open': '')} onClick={this.toggleSubMenu.bind(this, 0)}>
          		Our agents <i className={"fas "+(this.state.subMenuOpen==0 ? 'fa-chevron-up': 'fa-chevron-down')}></i>
          		<div className="sub-menu">
          		{this.state.agents && this.state.agents.map((agent, i) => { 
				    return (
	          			<div key={i} className="menu-item">
	          					<Link to={"/our-agents/"+agent.fields.slug} className="menu-item">
	          						{agent.fields.firstName} {agent.fields.lastName}
	          					</Link>
	          			</div>
          			);
				})}
          		</div>
          </div>
          <div className={"menu-item "+(this.state.subMenuOpen==1 ? 'open': '')} onClick={this.toggleSubMenu.bind(this, 1)}>
          		About Avnu <i className={"fas "+(this.state.subMenuOpen==1 ? 'fa-chevron-up': 'fa-chevron-down')}></i>
          		<div className="sub-menu">
          			<div className="menu-item">
          				<a href="/about/" className="menu-item">About</a>
          			</div>
          		</div>
          </div>
          <div className="menu-item">
          		<a href="/our-listings/">Our Listings</a>
          </div>
          <div className="menu-item">
          		<a href="">Get in touch</a>
          </div>
        </OverlayMenu>
      </div>
    );
  }
}
 
export default MenuArea;