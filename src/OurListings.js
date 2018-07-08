import React, { Component, createElement } from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import { createClient } from 'contentful';
import Zoom from 'react-reveal/Zoom'; 
import Hero from './Hero';
import marksy from 'marksy'; 

const getMarkup = field => {
  if (!field) return null;
  const compile = marksy({
    createElement,
    elements: {}
  });
  return compile(field).tree;
};

class OurListings extends Component {
  state = {
	hero: null,
	pageData: null
  };

  componentWillMount() {
    const client = createClient({
      space: process.env.REACT_APP_SPACE_ID,
      accessToken: process.env.REACT_APP_ACCESS_TOKEN
    });

	client
      // use getEntries because it does link resolution
      .getEntries({
	    content_type: 'listingListPage'
      })
      .then(response => {
        // extract the data from the response array
        return response.items[0].fields;
      })
      .then(heroContent => {
        this.setState({
          hero: heroContent
        });
        console.log(heroContent);
      })
      .catch(console.error);

    client
      .getEntries({
	    content_type: 'listing'
      })
      .then(response => {
		this.setState({
			data: response.items
		});
		console.log(response.items);
        // extract the data from the response array
        return response.items;
      })
      .catch(console.error);
  }
  
  componentDidMount() {
	  document.body.classList.add('listing-page');
  }
  
  render() {
    let mainTitle = null,
    	introText = null,
    	pageHeading = null,
    	heroData = null,
    	headline = null,
    	heroImage = null;
    
    let shortMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];
	
	if(this.state.hero) {
	  heroData = this.state.hero;
	  mainTitle = heroData.heroImageBody;
	  introText = heroData.heroImageHeading;
	  heroImage = heroData.heroImage.fields.file.url;
	  headline = heroData.pageHeading;
    }
	
    return (
	    <div className="our-listings">
	      <Helmet title={"Avnu - " + headline} />
			<Hero 
				mainTitle={mainTitle}
				introText={introText} 
				imgSrc={heroImage}
				icon="/images/our-listings.png"
				headline={headline}
			/>
			
			<div className="content-container listings">
				{this.state.data && this.state.data.map((property, i) => { 
					let date = new Date(property.fields.nextOpenDate);
					
					return (
		              <div key={i} className="property">
						<div className="property-image" style={{backgroundImage: `url(${property.fields.allImages[0].fields.file.url})`}}>
							<img src={property.fields.allImages[0].fields.file.url} />
							<div className="overlay-details">
								<div className={"status " + (property.fields.isNew ? '' : 'hide')}>
									<p>NEW</p> 
								</div>
								<div className="date">
									<p>Open {days[date.getDay()]} {date.getMonth()} {shortMonths[date.getMonth()]}</p>
								</div>
							</div>
						</div>
						<div className="property-details">
							<div className="type">
								<img src="/images/home.png" />
								<p>{property.fields.saleMethod}</p>
							</div>
							<p className="address">
								{property.fields.addressLine1} {property.fields.suburbAndPostcode}
							</p>
							<p className="price">
								{property.fields.priceguide}
							</p>
							<p className="description">
								{property.fields.mainCopyIntro}
							</p>
							<div className="bottom">
								<ul className="features">
									<li className="beds">
										<img src="/images/home-icon.svg" />
										<p>{property.fields.numberOfBeds}</p>
									</li>
									<li className="baths">
										<img src="/images/feature-showers.svg" />
										<p>{property.fields.numberOfBaths}</p>
									</li>
									<li className="cars">
										<img src="/images/feature-carspots.svg" />
										<p>{property.fields.numberOfCars}</p>
									</li>
								</ul>
								<Link to={`/our-listings/${property.fields.slug}/`} className="with-arrow">
									View
								</Link>
							</div>
						</div>
					</div>
		            );
				})}
			</div>
		</div>
    );
  }
}

export default OurListings;