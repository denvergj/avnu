import React, { Component, createElement } from 'react';
import Helmet from 'react-helmet';
import { createClient } from 'contentful';
import Hero from './Hero';
import marksy from 'marksy';
import MyMapComponent from "./GoogleMap"

const getMarkup = field => {
  if (!field) return null;
  const compile = marksy({
    createElement,
    elements: {}
  });
  return compile(field).tree;
};



class AgentProfileThird extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null
    };
  }

  componentWillMount() {
    const client = createClient({
      space: process.env.REACT_APP_SPACE_ID,
      accessToken: process.env.REACT_APP_ACCESS_TOKEN
    });

    client
      // use getEntries because it does link resolution
      .getEntries({
	    content_type: 'aboutAvnuStandardContentPages',
        'fields.menuItemText[in]': 'Our Story'
      })
      .then(response => {
        // extract the data from the response array
        return response.items[0].fields;
      })
      .then(fields => {
        this.setState({
          data: fields
        });
        console.log(fields);
      })
      .catch(console.error);
  }
  
  componentDidMount() {
	  document.body.classList.add('agent-profile-page-content');
  }

  render() {
    let mainTitle = null,
    	introText = null,
    	pageHeading = null;
		
	 if (this.state.data) {
      mainTitle = this.state.data.heroImageHeading;
      introText = this.state.data.heroImageBody;
      pageHeading = this.state.data.pageHeading;
    }
    
    return (
	    <div className="agent-profile-page">
	    	<Helmet title="Avnu - Standard Page" />
			<Hero 
				mainTitle="3rd party agent, 2088 expert."
				introText="Adrian prides himself on getting to know you, his vendors in detail so every converstaion is a productive one." 
				imgSrc="/images/header.jpg" 
				icon="/images/agent-icon.png"
				headline="Say hello to Adrian, our 2088 expert and golf tragic."
			/>
      		
      		
      	  <div className="intro content-container">
	       	<div className="imageSide">
	       		<img src="/images/agent-profile-content.jpg" />
	       		<div className="stats">
	       			<p className="stat">
	       				<span>Avg, Sale</span>
	       				$3.1m
	       			</p>
	       			<p className="stat">
	       				<span>Avg time in market</span>
	       				3 weeks
	       			</p>
	       			<p className="stat">
	       				<span>Active listings</span>
	       				12
	       			</p>
	       			<p className="stat">
	       				<span>Speciality</span>
	       				2088
	       			</p>
	       		</div>
	       	</div>
	       	
	       	<div className="text">
	       		<p>A proven professional with more than 12 years’ experience in residential real estate, Adrian Bridges is known for his consistently strong sales results and is ranked among the top performers within the Avnu network.</p>
	       		<p>Real Estate Agent who delivers a superb level of service with the aim of building relationships for life and becoming a trusted adviser to his clients.</p>
	       		<p>A team approach when selling property is of utmost importance to Adrian. Leading a group of four professionals allows him to deliver exceptional service to his clients where all bases are covered and nothing is left to chance. He brings a wealth of local knowledge to the lower north shore real estate market, with a strong attention to detail and access to Avnu’s expansive network connections and central database that gives his vendors every advantage.</p>
		   	</div>
		   	
		   	<div className="ctas">
		   		<a href="tel:+61 400 400 600">+61 400 400 600 <img src="/images/message.svg"/></a>
		   		<a href="#">Send message <img src="/images/email.svg"/></a>
		   	</div>
	       	
	      </div>
	      
			
			<div className="three-tiles">
				<div className="content-container">
					<div className="row">
				  	<div className="content">
							<img src="/images/agent-profile.png" />
							<div className="info">
								<h3>Adrian</h3>
								<p>Listings with a 2.2 wks average time in market.</p>
								<a href="" className="with-arrow">See Adrians profile</a>
							</div>
						</div>
						<div className="content">
							<img src="/images/agent-profile.png" />
							<div className="info">
								<h3>Adrian</h3>
								<p>Listings with a 2.2 wks average time in market.</p>
								<a href="" className="with-arrow">See Adrians profile</a>
							</div>
						</div>
						<div className="content">
							<img src="/images/agent-profile.png" />
							<div className="info">
								<h3>Adrian</h3>
								<p>Listings with a 2.2 wks average time in market.</p>
								<a href="" className="with-arrow">See Adrians profile</a>
							</div>
						</div>
					</div>
				</div>
			</div>
				      
			<div className="quote-area content-container">
				<div className="the-quote">
					<img src="https://images.ctfassets.net/dkcrc82u6zt9/GCYZPz8aAeo8Uw4miyIIo/06f487a622bb6d2d3681c87d0b3d1bd0/man.png" />
					<p>"Time or brand related quote that relates to the brand."</p>
				</div>
			</div>
			
			
			<div className="recent-listings">
				<div className="content-container">
					<div className="head">
						<img src="/images/rss.png" />
						<h3>Discover some of Adrians recent listings in the area</h3>
					</div>
				</div>
				
				<MyMapComponent isMarkerShown />
				
				<div className="content-container">
					<div className="head list">
						<img src="/images/graph.png" />
						<h3>Browse all of Adrians past and present listings</h3>
					</div>
					
					
					<div className="property">
					   <div className="property-image" style={{backgroundImage: `url(https://images.ctfassets.net/dkcrc82u6zt9/6aAUwXB1PGgmwiqQkKMOeK/9e3ab5010af7779a838391e91407b004/640x480__2_.jpg)`}}>
					  	 <img src="https://images.ctfassets.net/dkcrc82u6zt9/6aAUwXB1PGgmwiqQkKMOeK/9e3ab5010af7779a838391e91407b004/640x480__2_.jpg" />
					   </div>
					   <div className="property-details">
					      <p className="address">Mossman, 2088</p>
					      <p className="price">100 Speith St</p>
					      <p className="price">$1,500,120</p>
					      <div className="bottom">
					         <ul className="features">
					            <li className="beds">
					               <img src="/images/feature-home.png" />
					               <p>3</p>
					            </li>
					            <li className="baths">
					               <img src="/images/feature-showers.svg" />
					               <p>2</p>
					            </li>
					            <li className="cars">
					               <img src="/images/feature-carspots.svg" />
					               <p>2</p>
					            </li>
					         </ul>
					      </div>
					   </div>
					</div>
					
					<div className="property">
					   <div className="property-image" style={{backgroundImage: `url(https://images.ctfassets.net/dkcrc82u6zt9/6aAUwXB1PGgmwiqQkKMOeK/9e3ab5010af7779a838391e91407b004/640x480__2_.jpg)`}}>
					  	 <img src="https://images.ctfassets.net/dkcrc82u6zt9/6aAUwXB1PGgmwiqQkKMOeK/9e3ab5010af7779a838391e91407b004/640x480__2_.jpg" />
					   </div>
					   <div className="property-details">
					      <p className="address">Mossman, 2088</p>
					      <p className="price">100 Speith St</p>
					      <p className="price">$1,500,120</p>
					      <div className="bottom">
					         <ul className="features">
					            <li className="beds">
					               <img src="/images/feature-home.png" />
					               <p>3</p>
					            </li>
					            <li className="baths">
					               <img src="/images/feature-showers.svg" />
					               <p>2</p>
					            </li>
					            <li className="cars">
					               <img src="/images/feature-carspots.svg" />
					               <p>2</p>
					            </li>
					         </ul>
					      </div>
					   </div>
					</div>
					
					<div className="property">
					   <div className="property-image" style={{backgroundImage: `url(https://images.ctfassets.net/dkcrc82u6zt9/6aAUwXB1PGgmwiqQkKMOeK/9e3ab5010af7779a838391e91407b004/640x480__2_.jpg)`}}>
					  	 <img src="https://images.ctfassets.net/dkcrc82u6zt9/6aAUwXB1PGgmwiqQkKMOeK/9e3ab5010af7779a838391e91407b004/640x480__2_.jpg" />
					   </div>
					   <div className="property-details">
					      <p className="address">Mossman, 2088</p>
					      <p className="price">100 Speith St</p>
					      <p className="price">$1,500,120</p>
					      <div className="bottom">
					         <ul className="features">
					            <li className="beds">
					               <img src="/images/feature-home.png" />
					               <p>3</p>
					            </li>
					            <li className="baths">
					               <img src="/images/feature-showers.svg" />
					               <p>2</p>
					            </li>
					            <li className="cars">
					               <img src="/images/feature-carspots.svg" />
					               <p>2</p>
					            </li>
					         </ul>
					      </div>
					   </div>
					</div>
					
					<div className="property">
					   <div className="property-image" style={{backgroundImage: `url(https://images.ctfassets.net/dkcrc82u6zt9/6aAUwXB1PGgmwiqQkKMOeK/9e3ab5010af7779a838391e91407b004/640x480__2_.jpg)`}}>
					  	 <img src="https://images.ctfassets.net/dkcrc82u6zt9/6aAUwXB1PGgmwiqQkKMOeK/9e3ab5010af7779a838391e91407b004/640x480__2_.jpg" />
					   </div>
					   <div className="property-details">
					      <p className="address">Mossman, 2088</p>
					      <p className="price">100 Speith St</p>
					      <p className="price">$1,500,120</p>
					      <div className="bottom">
					         <ul className="features">
					            <li className="beds">
					               <img src="/images/feature-home.png" />
					               <p>3</p>
					            </li>
					            <li className="baths">
					               <img src="/images/feature-showers.svg" />
					               <p>2</p>
					            </li>
					            <li className="cars">
					               <img src="/images/feature-carspots.svg" />
					               <p>2</p>
					            </li>
					         </ul>
					      </div>
					   </div>
					</div>
					
					
					<div className="property">
					   <div className="property-image" style={{backgroundImage: `url(https://images.ctfassets.net/dkcrc82u6zt9/6aAUwXB1PGgmwiqQkKMOeK/9e3ab5010af7779a838391e91407b004/640x480__2_.jpg)`}}>
					  	 <img src="https://images.ctfassets.net/dkcrc82u6zt9/6aAUwXB1PGgmwiqQkKMOeK/9e3ab5010af7779a838391e91407b004/640x480__2_.jpg" />
					   </div>
					   <div className="property-details">
					      <p className="address">Mossman, 2088</p>
					      <p className="price">100 Speith St</p>
					      <p className="price">$1,500,120</p>
					      <div className="bottom">
					         <ul className="features">
					            <li className="beds">
					               <img src="/images/feature-home.png" />
					               <p>3</p>
					            </li>
					            <li className="baths">
					               <img src="/images/feature-showers.svg" />
					               <p>2</p>
					            </li>
					            <li className="cars">
					               <img src="/images/feature-carspots.svg" />
					               <p>2</p>
					            </li>
					         </ul>
					      </div>
					   </div>
					</div>
					
				</div>
			</div>
			
			
			<div className="quote-area content-container black">
				<div className="the-quote">
					<img src="https://images.ctfassets.net/dkcrc82u6zt9/GCYZPz8aAeo8Uw4miyIIo/06f487a622bb6d2d3681c87d0b3d1bd0/man.png" />
					<p>"Time or brand related quote that relates to the brand."</p>
				</div>
			</div>
      		
      		
      		<div className="vendors">
      			<div className="content-container">
					<div className="head">
						<img src="/images/rss.png" />
						<h3>Discover some of Adrians recent listings in the area</h3>
					</div>
					
					<div className="review">
						<img src="/images/review-home.jpg" className="feature"/>
						<div className="content">
							<div className="star">
								<img src="/images/star.svg" /> 
								<span>5</span>
							</div>
							<h3>Incredible! So seamless</h3>
							<p>My wife and I were happy with the work and effort that Tim and his team put into achieving the purchase of the property for us.</p>
							<a href="#">100 Speith Street Mosman, 2088 <img src="/images/review-marker.png" /></a>
						</div>
					</div>
					
					<div className="review">
						<img src="/images/review-home.jpg" className="feature"/>
						<div className="content">
							<div className="star">
								<img src="/images/star.svg" /> 
								<span>5</span>
							</div>
							<h3>Incredible! So seamless</h3>
							<p>My wife and I were happy with the work and effort that Tim and his team put into achieving the purchase of the property for us.</p>
							<a href="#">100 Speith Street Mosman, 2088 <img src="/images/review-marker.png" /></a>
						</div>
					</div>
					
					<div className="review">
						<img src="/images/review-home.jpg" className="feature"/>
						<div className="content">
							<div className="star">
								<img src="/images/star.svg" /> 
								<span>5</span>
							</div>
							<h3>Incredible! So seamless</h3>
							<p>My wife and I were happy with the work and effort that Tim and his team put into achieving the purchase of the property for us.</p>
							<a href="#">100 Speith Street Mosman, 2088 <img src="/images/review-marker.png" /></a>
						</div>
					</div>
					
					<div className="review">
						<img src="/images/review-home.jpg" className="feature"/>
						<div className="content">
							<div className="star">
								<img src="/images/star.svg" /> 
								<span>5</span>
							</div>
							<h3>Incredible! So seamless</h3>
							<p>My wife and I were happy with the work and effort that Tim and his team put into achieving the purchase of the property for us.</p>
							<a href="#">100 Speith Street Mosman, 2088 <img src="/images/review-marker.png" /></a>
						</div>
					</div>
					
					<div className="review">
						<img src="/images/review-home.jpg" className="feature"/>
						<div className="content">
							<div className="star">
								<img src="/images/star.svg" /> 
								<span>5</span>
							</div>
							<h3>Incredible! So seamless</h3>
							<p>My wife and I were happy with the work and effort that Tim and his team put into achieving the purchase of the property for us.</p>
							<a href="#">100 Speith Street Mosman, 2088 <img src="/images/review-marker.png" /></a>
						</div>
					</div>
				</div>
      		</div>
      		
      					
		</div>
    );
  }
}

export default AgentProfileThird;