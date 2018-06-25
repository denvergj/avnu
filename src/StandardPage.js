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
  state = {
    pageData: null
  };

  componentWillMount() {
/*
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
*/
	
  }

  render() {
    let imgSrc = null,
    	imgTileSrc = null;
    
/*
	if (this.state.pageData) {
		heroImageValuePropGreeting = getMarkup(this.state.pageData.heroImageValuePropGreeting);
		heroImageValuePropHeading = getMarkup(this.state.pageData.heroImageValuePropHeading);
		heroImageValuePropBody = getMarkup(this.state.pageData.heroImageValuePropBody);
		missionStatement = getMarkup(this.state.pageData.missionStatement);
		missionStatementLink = this.state.pageData.missionStatementLinkTo;
		missionStatementLinkText = this.state.pageData.missionStatementLinkToText;
		primaryQuote = getMarkup(this.state.pageData.primaryQuote.fields.quoteBody);
	}
*/
    
    return (
	    <div className="standard-page">
	    	<Helmet title="Avnu - Standard Page" />
			<Hero 
				mainTitle="Two line heading for page" 
				introText="Introductory paragraph" 
				imgSrc="/images/header.jpg" 
				icon="/images/clock.svg"
				headline="Headline for page content"
			/>
			<section className="content double">
				<div className="content-container flex">
						<div>
							<img src="/images/content-image.jpg" />
						</div>
						<div>
							<h2>This is a two column page that can be used as a single column.</h2>
	
	<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In mauris massa, auctor vitae lorem lacinia, scelerisque lacinia est. Cras sed ipsum non mauris pharetra interdum quis eu turpis. Curabitur volutpat magna est, quis imperdiet mi placerat vitae. Aenean at libero viverra, cursus eros quis, condimentum urna. In non aliquam justo. Nam pulvinar sapien efficitur tortor sagittis venenatis. Cras porta elit eget pulvinar sollicitudin. Cras sollicitudin mattis egestas. Praesent consequat commodo justo, tincidunt imperdiet ex vulputate id. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam lobortis ornare cursus. Ut dignissim eros ac dolor tincidunt bibendum. Proin rhoncus ipsum nec tellus vehicula faucibus. Proin pellentesque purus dolor, in tempus nisi gravida non. Sed interdum sem eget ex ultrices commodo. Proin est urna, tristique a dapibus nec, malesuada sollicitudin sapien.</p>
	
	<p>Nam et purus non nisi vulputate eleifend in sed orci. Nunc porta ac velit id hendrerit. Phasellus vel orci nec eros rutrum volutpat a eu odio. Maecenas gravida urna ut porttitor euismod. Nulla facilisi. Duis neque augue, tincidunt non tincidunt vel, tempus at lorem. Vivamus condimentum convallis justo ut porta. Vivamus dapibus lorem libero, eget volutpat urna fringilla non. Donec iaculis ac tellus ac aliquet. </p>
						</div>
				</div>
			</section>
			<div className="quote-area content-container">
				<div className="the-quote">
	      			<img src="https://images.ctfassets.net/dkcrc82u6zt9/GCYZPz8aAeo8Uw4miyIIo/06f487a622bb6d2d3681c87d0b3d1bd0/man.png" />
	      			<p>“Time or brand related quote that relates to the brand.”</p>
	      		</div>
      		</div>
			<section className="content double">
				<div className="content-container full-width">
					<img src="/images/listings.png" />
					<h2>This is a two column page that can be used as a single column.</h2>
				</div>
				<div className="content-container flex">
						<div>
	<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In mauris massa, auctor vitae lorem lacinia, scelerisque lacinia est. Cras sed ipsum non mauris pharetra interdum quis eu turpis. Curabitur volutpat magna est, quis imperdiet mi placerat vitae. Aenean at libero viverra, cursus eros quis, condimentum urna. In non aliquam justo. Nam pulvinar sapien efficitur tortor sagittis venenatis. Cras porta elit eget pulvinar sollicitudin. Cras sollicitudin mattis egestas. Praesent consequat commodo justo, tincidunt imperdiet ex vulputate id. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam lobortis ornare cursus. Ut dignissim eros ac dolor tincidunt bibendum. Proin rhoncus ipsum nec tellus vehicula faucibus. Proin pellentesque purus dolor, in tempus nisi gravida non. Sed interdum sem eget ex ultrices commodo. Proin est urna, tristique a dapibus nec, malesuada sollicitudin sapien.</p>
	
	<p>Nam et purus non nisi vulputate eleifend in sed orci. Nunc porta ac velit id hendrerit. Phasellus vel orci nec eros rutrum volutpat a eu odio. Maecenas gravida urna ut porttitor euismod. Nulla facilisi. Duis neque augue, tincidunt non tincidunt vel, tempus at lorem. Vivamus condimentum convallis justo ut porta. Vivamus dapibus lorem libero, eget volutpat urna fringilla non. Donec iaculis ac tellus ac aliquet. </p>
						</div>
						<div>
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
						<div>
	<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In mauris massa, auctor vitae lorem lacinia, scelerisque lacinia est. Cras sed ipsum non mauris pharetra interdum quis eu turpis. Curabitur volutpat magna est, quis imperdiet mi placerat vitae. Aenean at libero viverra, cursus eros quis, condimentum urna. In non aliquam justo. Nam pulvinar sapien efficitur tortor sagittis venenatis. Cras porta elit eget pulvinar sollicitudin. Cras sollicitudin mattis egestas. Praesent consequat commodo justo, tincidunt imperdiet ex vulputate id. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam lobortis ornare cursus. Ut dignissim eros ac dolor tincidunt bibendum. Proin rhoncus ipsum nec tellus vehicula faucibus. Proin pellentesque purus dolor, in tempus nisi gravida non. Sed interdum sem eget ex ultrices commodo. Proin est urna, tristique a dapibus nec, malesuada sollicitudin sapien.</p>
	
	<p>Nam et purus non nisi vulputate eleifend in sed orci. Nunc porta ac velit id hendrerit. Phasellus vel orci nec eros rutrum volutpat a eu odio. Maecenas gravida urna ut porttitor euismod. Nulla facilisi. Duis neque augue, tincidunt non tincidunt vel, tempus at lorem. Vivamus condimentum convallis justo ut porta. Vivamus dapibus lorem libero, eget volutpat urna fringilla non. Donec iaculis ac tellus ac aliquet. </p>
						</div>
						<div>
							<img src="/images/content-image.jpg" />
							<caption>Caption goes here</caption>
						</div>
				</div>
			</section>
			
			<div className="side-area right content-container">
				<img src="/images/video.jpg" />
      		</div>
			
		</div>
    );
  }
}

export default StandardPage;