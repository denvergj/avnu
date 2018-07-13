import React, { Component, createElement } from 'react';
import Helmet from 'react-helmet';
import { createClient } from 'contentful';
import marksy from 'marksy'; 
import $ from 'jquery';


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
    pageData: null,
    lightboxIsOpen:null
  };
  
  componentDidMount() {
	  $(document).on('click','.gallery', function(){
	    $('.lightbox').show();
    });
	$(document).on('click','.lightbox .close', function(){
	    $('.lightbox').hide();
    });
    $(document).on('click','.lightbox .fa-chevron-right', function(){
	    
	    $(this).parent().find('img.active').next().addClass('active');
	    $(this).parent().find('img.active').prev('img').removeClass();
    });
    $(document).on('click','.lightbox .fa-chevron-left', function(){
	   
	    $(this).parent().find('img.active').prev().addClass('active');
	    $(this).parent().find('img.active').next('img').removeClass();
    });
  }
  
  render() {
    return (
	    <div>
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
	      	{this.props.gallery ?
				[
				<div key="gallery" className="gallery">
					<img src="/images/gallery.svg" />
		      		<span>{this.props.gallery.length}</span>
		      	</div>
				] : null
			}
	      </div>
	      <div className="lightbox">
	      	<div className="overlay"></div>
	      	<div className="close">X</div>
	      	{this.props.gallery ?
				[
				<div key="gallery-box" className="gallery-box">
					<i className="fas fa-chevron-left" aria-hidden="true"></i>
					{this.props.gallery && this.props.gallery.map((galleryImage, i) => { 
						if(i == 0) {
							return (
								<img key={i} className="active" src={galleryImage.fields.file.url} />
				      		);
						} else {
							return (
								<img key={i} src={galleryImage.fields.file.url} />
				      		);
						}
			      		
					})}
					<i className="fas fa-chevron-right" aria-hidden="true"></i>
		      	</div>
				] : null
			}
	      </div>
      </div>
    );
  }
}

export default Hero;