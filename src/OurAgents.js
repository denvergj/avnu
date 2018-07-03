import React, { Component, createElement } from 'react';
import Helmet from 'react-helmet';
import { createClient } from 'contentful';
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

class StandardPage extends Component {
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
	  document.body.classList.add('our-agents-page-content');
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
	      
	      	<div className="quote-area content-container black">
				<div className="the-quote">
					<img src="https://images.ctfassets.net/dkcrc82u6zt9/GCYZPz8aAeo8Uw4miyIIo/06f487a622bb6d2d3681c87d0b3d1bd0/man.png" />
					<p>"Time or brand related quote that relates to the brand."</p>
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
      					
		</div>
    );
  }
}

export default StandardPage;