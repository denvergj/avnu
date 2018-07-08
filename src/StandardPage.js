import React, { Component, createElement } from 'react';
import Helmet from 'react-helmet';
import { createClient } from 'contentful';
import Hero from './Hero';
import Zoom from 'react-reveal/Zoom';
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
	  document.body.classList.add('standard-page-content');
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
	    <div className="standard-page">
	    	<Helmet title="Avnu - Standard Page" />
			<Hero 
				mainTitle={mainTitle} 
				introText={introText} 
				imgSrc="/images/header.jpg" 
				icon="/images/clock.svg"
				headline={pageHeading}
			/>
			
			{this.state.data && this.state.data.contentBlocks.map((block, i) => {   
				 if(i < 1) {
		       		 let blockBody = getMarkup(block.fields.blockBody);
		             return (
			             <Zoom key={i}>
						 <section key={i} className="content double">
							<div className="content-container flex">
								<div>
									<img src="/images/content-image.jpg" />
								</div>
								<div className="text">
									{blockBody}
								</div>
							</div>
						</section>
						</Zoom>
		            );             
	            }
	        })}
	        <Zoom>
				<div className="quote-area content-container">
					<div className="the-quote">
		      			<img src="https://images.ctfassets.net/dkcrc82u6zt9/GCYZPz8aAeo8Uw4miyIIo/06f487a622bb6d2d3681c87d0b3d1bd0/man.png" />
		      			<p>"Time or brand related quote that relates to the brand."</p>
		      		</div>
	      		</div>
      		</Zoom>
      		
			<section className="content double">
				<div className="content-container full-width">
					<img src="/images/listings.png" />
					<h2>This is a two column page that can be used as a single column.</h2>
				</div>
				<div className="content-container flex">
						<div className="text">
	<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In mauris massa, auctor vitae lorem lacinia, scelerisque lacinia est. Cras sed ipsum non mauris pharetra interdum quis eu turpis. Curabitur volutpat magna est, quis imperdiet mi placerat vitae. Aenean at libero viverra, cursus eros quis, condimentum urna. In non aliquam justo. Nam pulvinar sapien efficitur tortor sagittis venenatis. Cras porta elit eget pulvinar sollicitudin. Cras sollicitudin mattis egestas. Praesent consequat commodo justo, tincidunt imperdiet ex vulputate id. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam lobortis ornare cursus. Ut dignissim eros ac dolor tincidunt bibendum. Proin rhoncus ipsum nec tellus vehicula faucibus. Proin pellentesque purus dolor, in tempus nisi gravida non. Sed interdum sem eget ex ultrices commodo. Proin est urna, tristique a dapibus nec, malesuada sollicitudin sapien.</p>
	
	<p>Nam et purus non nisi vulputate eleifend in sed orci. Nunc porta ac velit id hendrerit. Phasellus vel orci nec eros rutrum volutpat a eu odio. Maecenas gravida urna ut porttitor euismod. Nulla facilisi. Duis neque augue, tincidunt non tincidunt vel, tempus at lorem. Vivamus condimentum convallis justo ut porta. Vivamus dapibus lorem libero, eget volutpat urna fringilla non. Donec iaculis ac tellus ac aliquet. </p>
						</div>
						<div className="text">
							<h2>This is a two column page that can be used as a single column.</h2>
	
	<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In mauris massa, auctor vitae lorem lacinia, scelerisque lacinia est. Cras sed ipsum non mauris pharetra interdum quis eu turpis. Curabitur volutpat magna est, quis imperdiet mi placerat vitae. Aenean at libero viverra, cursus eros quis, condimentum urna. In non aliquam justo. Nam pulvinar sapien efficitur tortor sagittis venenatis. Cras porta elit eget pulvinar sollicitudin. Cras sollicitudin mattis egestas. Praesent consequat commodo justo, tincidunt imperdiet ex vulputate id. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam lobortis ornare cursus. Ut dignissim eros ac dolor tincidunt bibendum. Proin rhoncus ipsum nec tellus vehicula faucibus. Proin pellentesque purus dolor, in tempus nisi gravida non. Sed interdum sem eget ex ultrices commodo. Proin est urna, tristique a dapibus nec, malesuada sollicitudin sapien.</p>
	
	<p>Nam et purus non nisi vulputate eleifend in sed orci. Nunc porta ac velit id hendrerit. Phasellus vel orci nec eros rutrum volutpat a eu odio. Maecenas gravida urna ut porttitor euismod. Nulla facilisi. Duis neque augue, tincidunt non tincidunt vel, tempus at lorem. Vivamus condimentum convallis justo ut porta. Vivamus dapibus lorem libero, eget volutpat urna fringilla non. Donec iaculis ac tellus ac aliquet. </p>
						</div>
				</div>
			</section>
			
			<div className="side-area content-container">
				<img src="/images/standard-image.jpg" />
      		</div>
      		
      		
			<section className="content double">
				<div className="content-container full-width">
					<img src="/images/listings.png" />
					<h2>This is a two column page that can be used as a single column.</h2>
				</div>
				<div className="content-container flex">
						<div className="text">
	<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In mauris massa, auctor vitae lorem lacinia, scelerisque lacinia est. Cras sed ipsum non mauris pharetra interdum quis eu turpis. Curabitur volutpat magna est, quis imperdiet mi placerat vitae. Aenean at libero viverra, cursus eros quis, condimentum urna. In non aliquam justo. Nam pulvinar sapien efficitur tortor sagittis venenatis. Cras porta elit eget pulvinar sollicitudin. Cras sollicitudin mattis egestas. Praesent consequat commodo justo, tincidunt imperdiet ex vulputate id. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam lobortis ornare cursus. Ut dignissim eros ac dolor tincidunt bibendum. Proin rhoncus ipsum nec tellus vehicula faucibus. Proin pellentesque purus dolor, in tempus nisi gravida non. Sed interdum sem eget ex ultrices commodo. Proin est urna, tristique a dapibus nec, malesuada sollicitudin sapien.</p>
	
	<p>Nam et purus non nisi vulputate eleifend in sed orci. Nunc porta ac velit id hendrerit. Phasellus vel orci nec eros rutrum volutpat a eu odio. Maecenas gravida urna ut porttitor euismod. Nulla facilisi. Duis neque augue, tincidunt non tincidunt vel, tempus at lorem. Vivamus condimentum convallis justo ut porta. Vivamus dapibus lorem libero, eget volutpat urna fringilla non. Donec iaculis ac tellus ac aliquet. </p>
						</div>
						<div>
							<img src="/images/content-image.jpg" />
							<div className="caption">Caption goes here</div>
						</div>
				</div>
			</section>

			
		</div>
    );
  }
}

export default StandardPage;