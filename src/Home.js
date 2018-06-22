import React, { Component, createElement } from 'react';
import Helmet from 'react-helmet';
import { createClient } from 'contentful';
import PostLink from './PostLink';
import Slider from "react-slick";
import marksy from 'marksy'; 

const getMarkup = field => {
  if (!field) return null;
  const compile = marksy({
    createElement,
    elements: {}
  });
  return compile(field).tree;
};

class Home extends Component {
  state = {
    posts: null,
    pageData: null,
    heroItems: null
  };

  componentWillMount() {
    const client = createClient({
      space: process.env.REACT_APP_SPACE_ID,
      accessToken: process.env.REACT_APP_ACCESS_TOKEN
    });
    
    client.getContentTypes().then(response => {
		const homepageContent = response.items.find(item => item.name === 'Homepage');
		return homepageContent.sys.id;
	}).then(id => {
		client.getEntries({
			content_type: id,
			include: 3
		}).then(response => {
			const homepageFieldData = response.items.find(item => item.fields);
			console.log(homepageFieldData);
			this.setState({
			  pageData: homepageFieldData.fields,
              heroItems: homepageFieldData.fields.heroImageScrollerImages
            });
		});
	});
	
  }

  render() {
    let imgSrc = null,
    	imgTileSrc = null;
    let heroImageValuePropGreeting,
    	heroImageValuePropHeading,
    	heroImageValuePropBody,
    	missionStatement,
    	missionStatementLink,
    	missionStatementLinkText,
    	primaryQuote;
    
    // Slider Settings.
    var settings = {
      dots: true, 
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    
	if (this.state.pageData) {
		heroImageValuePropGreeting = getMarkup(this.state.pageData.heroImageValuePropGreeting);
		heroImageValuePropHeading = getMarkup(this.state.pageData.heroImageValuePropHeading);
		heroImageValuePropBody = getMarkup(this.state.pageData.heroImageValuePropBody);
		missionStatement = getMarkup(this.state.pageData.missionStatement);
		missionStatementLink = this.state.pageData.missionStatementLinkTo;
		missionStatementLinkText = this.state.pageData.missionStatementLinkToText;
		primaryQuote = getMarkup(this.state.pageData.primaryQuote.fields.quoteBody);
	}
    
    return (
	    <div>
	      <div className="hero-slider">
	      	<Helmet title="Avnu - Properties" />
		  	<Slider {...settings}>
	       		{this.state.heroItems && this.state.heroItems.map((slide, i) => {     
		       		 imgSrc = slide.fields.file.url;
		             return (
		              <div key={i}>
		              	<div className="slider-bg" style={{backgroundImage: `url(${imgSrc})`}}>
		              	<img src={imgSrc} />
		              		<div className="hero-text">
			              		<div className="content-container">
				              		<div className="welcome">
				              			{heroImageValuePropGreeting}
				              			{heroImageValuePropHeading}
				              			{heroImageValuePropBody}
				              		</div>
				              	</div>
			              	</div>
		              	</div>
				      </div>
		            );             
		        })}
		    </Slider>
	      </div>
	      
	      <div className="mission-statement">
	      		<div className="content">
	      			<img src="/images/clock.svg" className="clock" alt="logo" />
	      			{missionStatement}
			  		<a href={missionStatementLink} className="with-arrow">{missionStatementLinkText}</a>
	      		</div>
	      </div>
	      
	      <div className="secondary-tiles">
	      	<div className="content-container">
	      		{this.state.pageData && this.state.pageData.secondaryValuePropTiles.map((tiles, i) => {     
		       		 imgTileSrc = tiles.fields.tileImage.fields.file.url;
		             return (
		              	<div key={i} className="content last">
			      			<img src={imgTileSrc} />
			      			<div className="info">
			      				<h3>{tiles.fields.tileTitle}</h3>
			      				<p>{tiles.fields.tileBody}</p>
			      				<a href={tiles.fields.tileLinkTo} className="with-arrow">{tiles.fields.tileLinkToText}</a>
			      			</div>
			      		</div>
		            );             
		        })}
	      	</div>
	      </div>
	      
	      <div className="quoting-area">
	      		<div className="grey"></div>
	      		<div className="content-container">
		      		<div className="the-quote">
		      			<img src="/images/man.png" />
		      			{primaryQuote}
		      		</div>
	      		</div>
	      		<div className="white"></div>
	      </div>
	      
	       <div className="three-tiles">
	       		<div className="content-container">
		      	<div className="row">
			      	{this.state.pageData && this.state.pageData.standardContentBlockTiles.map((contentBlocks, i) => {     
			       		 imgTileSrc = contentBlocks.fields.homePageDisplayTile.fields.tileImage.fields.file.url;
			             return (
			              	<div key={i} className="content">
				      			<img src={imgTileSrc} />
				      			<div className="info">
				      				<h3>{contentBlocks.fields.homePageDisplayTile.fields.tileTitle}</h3>
				      				<p>{contentBlocks.fields.homePageDisplayTile.fields.tileBody}</p>
				      				<a href={contentBlocks.fields.homePageDisplayTile.fields.tileLinkTo} className="with-arrow">{contentBlocks.fields.homePageDisplayTile.fields.tileLinkToText}</a>
				      			</div>
				      		</div>
			            );             
			        })}
		      	</div>
		      	</div>
	      </div>
	      
		</div>
    );
  }
}

export default Home;