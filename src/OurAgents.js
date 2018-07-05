import React, { Component, createElement } from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import { createClient } from 'contentful';
import Hero from './Hero';
import marksy from 'marksy';  
import Slide from 'react-reveal/Slide';
import VisibilitySensor from 'react-visibility-sensor';
import InViewMonitor from 'react-inview-monitor';

const getMarkup = field => {
  if (!field) return null;
  const compile = marksy({
    createElement,
    elements: {}
  });
  return compile(field).tree;
};

class OurAgents extends Component {
  constructor(props) {
    super(props);

    this.state = {
	  hero: null,
      agents: null,
      quotes: null
    };
  }

  componentWillMount() {
    const client = createClient({
      space: process.env.REACT_APP_SPACE_ID,
      accessToken: process.env.REACT_APP_ACCESS_TOKEN
    });

	
	  // Quotes
      client
      // use getEntries because it does link resolution
      .getEntries({
	    content_type: 'agentListPage'
      })
      .then(response => {
        // extract the data from the response array
        return response.items[0].fields;
      })
      .then(heroContent => {
        this.setState({
          hero: heroContent
        });
      })
      .catch(console.error);
		

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
         console.log(fields);
      })
      .catch(console.error);
      
      // Quotes
      client
      // use getEntries because it does link resolution
      .getEntries({
	    content_type: 'brandQuoteBlock'
      })
      .then(response => {
        // extract the data from the response array
        return response.items;
      })
      .then(fields => {
        this.setState({
          quotes: fields
        });
       // console.log(fields);
      })
      .catch(console.error);
  }
  
  componentDidMount() {
	  document.body.classList.add('our-agents-page-content');
  }

  render() {
    let mainTitle = null,
    	introText = null,
    	pageHeading = null,
    	heroData = null,
    	headline = null,
    	heroImage = null;
    
    if(this.state.hero) {
	  heroData = this.state.hero;
	  mainTitle = heroData.heroImageBody;
	  introText = heroData.heroImageHeading;
	  heroImage = heroData.heroImage.fields.file.url;
	  headline = heroData.pageHeading;
    }
    
    return (
	    <div className="our-agents-page">
	    	<Helmet title="Avnu - Standard Page" />
			<Hero 
				mainTitle="Property experts, not just agents"
				introText="Our agents are experts in the art of selling your properties. Find the right expert for you." 
				imgSrc="/images/our-agents.jpg" 
				icon="/images/agent-icon.png"
				headline="Meet the Avnu Mosman team, a collective of 2088 experts."
			/>
      		
      		
      	  <div className="three-tiles">
	       	<div className="content-container">
		      	<div className="row">
			      	{this.state.agents && this.state.agents.map((agent, i) => { 
			      		return (
					      	<div key={i} className="content">
					      		<img src={(agent.fields.agentTile ? agent.fields.agentTile.fields.tileImage.fields.file.url : '')} />
				      			<div className="info">
				      				<h3>{agent.fields.firstName}</h3>
				      				<p>{agent.fields.tileBody}</p>
				      				<Link to={`our-agents/${agent.fields.slug}/`} className="with-arrow">
										See {agent.fields.firstName + "'s"} profile
									</Link>
				      			</div>
				      		</div>
			      		);
					})}
		      	</div>
		    </div>
	      </div>
	      
	    <InViewMonitor
		  classNameNotInView='vis-hidden'
		  classNameInView='animated slideInRight quote-area content-container'
		>
		  <div>
		    	<div className="the-quote">
					<img src="/images/man-white.png" />
					<p>"Time or brand related quote that relates to the brand."</p>
				</div>
			</div>
		</InViewMonitor>
		
		
	      <div className="three-tiles grey">
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
	      
	      
	      <InViewMonitor
			  classNameNotInView='vis-hidden'
			  intoViewMargin='100px'
			  classNameInView='animated slideInLeft quote-area content-container black'
			>
	      	<div>
				<div className="the-quote">
					<img src="/images/man-white.png" />
					<p>"Time or brand related quote that relates to the brand."</p>
				</div>
			</div>
			</InViewMonitor>
			
			
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
      					
		</div>
    );
  }
}

export default OurAgents;