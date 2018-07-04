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



class PropertyDetail extends Component {
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
	  document.body.classList.add('property-detail-outer');
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
	    <div className="property-detail-page">
	    	<Helmet title="Avnu - Standard Page" />
			<Hero 
				mainTitle="100 Speith Street, Mosman 2088"
				introText="Modest luxury in the heart of Mosman" 
				imgSrc="/images/property-header.jpg" 
				icon="/images/our-listings.png"
				headline="Home on the lower north shore never looked so cosy."
			/>
      		
      		
			<div className="intro content-container">
				<div className="imageSide">
					<div className="stats">
						<p className="stat">
							<span>Type</span>
							House
						</p>
						<p className="stat">
							<span>Material</span>
							Double Brick
						</p>
						<p className="stat">
							<span>Building Size</span>
							1200m
						</p>
						<p className="stat">
							<span>Land Size</span>
							1500m
						</p>
						<p className="stat">
							<span>Air Con</span>
							Ducted
						</p>
						<p className="stat">
							<span>Construction date</span>
							2018
						</p>
					</div>
				</div>
				
				<div className="text">
					<p>Wake up to brilliant morning light that floods into your own furnished, luxury doorman "cottage in the city" loft terrace with separate bike storage. </p>
					<p>Currently configured as a junior 1-bedroom the unit contains a queen bed and tons of closets. With extra-high ceilings and exposed beams, this space was completely renovated with a custom solid wood, floor-to-ceiling built-in library; 16 feet of glass erasable marker whiteboard; and an additional queen sized Murphy bed for guests. </p>
					<p>private terrace bathed with sunlight. The kitchen is complete with a high-end stainless steel dishwasher, gas range, and an extra-large French door refrigerator. Some of the furnishings in the unit include white, extra-wide Hunter Douglas plantation blinds, a West Elm leather lounge chair, a reclaimed wood farmers dining table and benches and crystal chandeliers in the living room, hallway and bedroom.</p>
				</div>
			</div>
			
			
			<div className="mapHouse">
				<MyMapComponent isMarkerShown />
				<div className="property">
				   <div className="property-image" style={{backgroundImage: `url(https://images.ctfassets.net/dkcrc82u6zt9/6aAUwXB1PGgmwiqQkKMOeK/9e3ab5010af7779a838391e91407b004/640x480__2_.jpg)`}}>
				  	 <img src="https://images.ctfassets.net/dkcrc82u6zt9/6aAUwXB1PGgmwiqQkKMOeK/9e3ab5010af7779a838391e91407b004/640x480__2_.jpg" />
				   </div>
				   <div className="property-details">
				  		 <div className="type">
							<img src="/images/home.png" />
							<p>For Sale</p>
						</div>
				      <p className="address">100 Speith St, Mossman, 2088</p>
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
				         <a href="#" className="with-arrow">View</a>
				      </div>
				   </div>
				</div>
			</div>
			
			
			<div className="property-amenities">
				<div className="content-container">
					<div className="head">
						<img src="/images/rss.png" />
						<h3>Property Amenities</h3>
					</div>
					<div className="features">
						<p className="title">Indoor Features</p>
						<ul className="indoor">
							<li>Laundry</li>
							<li>Washer / Dryer in Unit</li>
							<li>Master Ensuite</li>
							<li>Stainless Steel Appliances</li>
							<li>Indoor Terrace</li>
							<li>Formal Dining Room</li>
							<li>Double glazing</li>
							<li>Home Office</li>
							<li>Rumpus room</li>
							<li>Northern Exposure</li>
						</ul>
						<p className="title">Outdoor Features</p>
						<ul className="outdoor">
							<li>Pool</li>
							<li>Gardens</li>
							<li>Lock up garage</li>
						</ul>
					</div>
				</div>
			</div>
			
	      
			<div className="quote-area content-container">
				<div className="the-quote">
					<img src="https://images.ctfassets.net/dkcrc82u6zt9/GCYZPz8aAeo8Uw4miyIIo/06f487a622bb6d2d3681c87d0b3d1bd0/man.png" />
					<p>"17 Mins from the CBD, 10 Mins to the beach."</p>
				</div>
			</div>
			
			
			<div className="local-area">
				<div className="content-container">
					<div className="head">
						<img src="/images/rss.png" />
						<h3>Parts of the local area that will. make it time well spent.</h3>
					</div>
					<div className="landmarks">
						<div className="place">
							<div className="content">
								<div className="type">
									Transport
								</div>
								<h3>Mosman Ferry Terminal</h3>
								<a href="#">8.5km <img src="/images/review-marker.png" /></a>
							</div>
						</div>
						<div className="place">
							<div className="content">
								<div className="type">
									Transport
								</div>
								<h3>Mosman Ferry Terminal</h3>
								<a href="#">8.5km <img src="/images/review-marker.png" /></a>
							</div>
						</div>
						<div className="place">
							<div className="content">
								<div className="type">
									Transport
								</div>
								<h3>Mosman Ferry Terminal</h3>
								<a href="#">8.5km <img src="/images/review-marker.png" /></a>
							</div>
						</div>
					</div>
				</div>
			</div>
			
			
			<div className="quote-area content-container black">
				<div className="the-quote">
					<img src="https://images.ctfassets.net/dkcrc82u6zt9/GCYZPz8aAeo8Uw4miyIIo/06f487a622bb6d2d3681c87d0b3d1bd0/man.png" />
					<p>"17 Mins from the CBD, 10 Mins to the beach."</p>
				</div>
			</div>
			
			
			<div className="recent-listings">
				<div className="content-container">
					<div className="head list">
						<img src="/images/graph.png" />
						<h3>Comparable sales in the local area.</h3>
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
			
      		
      		<div className="property-team">
      			<div className="content-container">
					<div className="head">
						<img src="/images/rss.png" />
						<h3>Get in touch with the Avnu property team.</h3>
					</div>
					<div className="team-members">
						<div className="member">
							<img src="/images/adrian.jpg"/>
							<div className="content">
								<h3>Adrian</h3>
								<p>Listings with a 2.2 wks average time in market.</p>
								<div className="links">
									<a href="#">Send message <img src="/images/email.svg"/></a>
									<a href="#" className="with-arrow">See Adrians profile</a>
								</div>
							</div>
						</div>
						<div className="member">
							<img src="/images/adrian.jpg"/>
							<div className="content">
								<h3>Adrian</h3>
								<p>Listings with a 2.2 wks average time in market.</p>
								<div className="links">
									<a href="#">Send message <img src="/images/email.svg"/></a>
									<a href="#" className="with-arrow">See Adrians profile</a>
								</div>
							</div>
						</div>
					</div>
				</div>
      		</div>
      		
      					
		</div>
    );
  }
}

export default PropertyDetail;