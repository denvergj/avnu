import React, { Component } from 'react';
import OverlayMenu from 'react-overlay-menu';
 
class MenuArea extends Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: false, subMenuOpen: null };
    this.toggleMenu = this.toggleMenu.bind(this);
  }
 
  toggleMenu() {
    this.setState({ isOpen: !this.state.isOpen });
  }
  
  toggleSubMenu(index, e) {
    this.setState({ subMenuOpen: index });
  }
 
  render() {
    return (
      <div>
        <button type="button" className={(this.state.isOpen ? 'is-active' : 'hidden') + ' hamburger--collapse hamburger'} onClick={this.toggleMenu}>
        	<span className="hamburger-box">
		    	<span className="hamburger-inner"></span>
		    </span>
        	<img src="/images/logo.png" className="App-logo" alt="logo" />
        </button>
        <OverlayMenu 
          open={this.state.isOpen} 
          onClose={this.toggleMenu}
        >
          <div className={"menu-item "+(this.state.subMenuOpen==0 ? 'open': '')} onClick={this.toggleSubMenu.bind(this, 0)}>
          		Our agents <i className="fa fa-chevron-down"></i>
          		<div className="sub-menu">
          			<div className="menu-item">
          				<a href="" className="menu-item">Adrian Bridges</a>
          			</div>
          		</div>
          </div>
          <div className={"menu-item "+(this.state.subMenuOpen==1 ? 'open': '')} onClick={this.toggleSubMenu.bind(this, 1)}>
          		About Avnu <i className="fa fa-chevron-down"></i>
          		<div className="sub-menu">
          			<div className="menu-item">
          				<a href="" className="menu-item">Page #1</a>
          			</div>
          		</div>
          </div>
          <div className="menu-item">
          		<a href="">Our Listings</a>
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