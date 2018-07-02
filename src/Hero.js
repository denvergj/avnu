import React, { Component, createElement } from 'react';
import Helmet from 'react-helmet';
import { createClient } from 'contentful';
import marksy from 'marksy'; 

const getMarkup = field => {
  if (!field) return null;
  const compile = marksy({
    createElement,
    elements: {}
  });
  return compile(field).tree;
};

class Hero extends Component {
  state = {
    pageData: null
  };
  
  render() {
    return (
      <div className="hero" style={{backgroundImage: `url(${this.props.imgSrc})`}}>
     	<img src={this.props.imgSrc} /> 
  		<div className="hero-text">
      		<div className="content-container">
          		<h1>{this.props.mainTitle}</h1>
          		<p>{this.props.introText}</p>
          	</div>
      	</div>
      	<div className="icon-header content-container">
      		<img src={this.props.icon} /> 
      		<h2>{this.props.headline}</h2>
      	</div>
      	<div className="white-box"></div>
      </div>
    );
  }
}

export default Hero;