import React, { Component, createElement } from "react";
import Helmet from "react-helmet";
import { createClient } from "contentful";
import Hero from "./Hero";
import marksy from "marksy";
import MyMapComponent from "./GoogleMap";
import InViewMonitor from "react-inview-monitor";

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
        content_type: "listing",
        "fields.slug[in]": this.props.match.params.property,
        include: 3
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
    document.body.classList.add("agent-profile-page-content");
    document.body.classList.add("property-detail-outer");
  }

  render() {
    let propertyData = null,
      addressLine1 = null,
      suburbAndPostcode = null,
      catchphrasePrimary = null,
      catchphraseSecondary = null,
      propertyHighlightedInfo = null,
      mainCopyIntro = null,
      mainCopyBody = null,
      indoorFeatures = null,
      outdoorFeatures = null,
      primaryQuote = null,
      secondaryQuote = null,
      allPointsOfInterest = null,
      listingComparableSales = null,
      agents = null,
      location = null,
      heroImage = null,
      price = null,
      numberOfBaths = null,
      numberOfBeds = null,
      numberOfCars = null,
      allImages = null;

    if (this.state.data) {
      propertyData = this.state.data;
      addressLine1 = propertyData.addressLine1;
      suburbAndPostcode = propertyData.suburbAndPostcode;
      catchphrasePrimary = propertyData.catchphrasePrimary;
      catchphraseSecondary = propertyData.catchphraseSecondary;
      propertyHighlightedInfo = propertyData.propertyHighlightedInfo;
      mainCopyIntro = propertyData.mainCopyIntro;
      mainCopyBody = getMarkup(propertyData.mainCopyBody);
      indoorFeatures = propertyData.indoorFeatures;
      outdoorFeatures = propertyData.outdoorFeatures;
      primaryQuote = propertyData.primaryQuote.fields.quoteBody;
      secondaryQuote = propertyData.secondaryQuote.fields.quoteBody;
      allPointsOfInterest = propertyData.allPointsOfInterest;
      listingComparableSales = propertyData.listingComparableSales;
      agents = propertyData.agents;
      location = propertyData.location;
      heroImage = propertyData.allImages[0].fields.file.url;
      price = propertyData.priceguide;
      numberOfBaths = propertyData.numberOfBaths;
      numberOfBeds = propertyData.numberOfBeds;
      numberOfCars = propertyData.numberOfCars;
      allImages = propertyData.allImages;
    }

    return (
      <div className="property-detail-page">
        <Helmet title={"Avnu - " + addressLine1 + " " + suburbAndPostcode} />
        <Hero
          mainTitle={addressLine1 + " " + suburbAndPostcode}
          introText={catchphrasePrimary}
          imgSrc={heroImage}
          icon="/images/listing-profile-icon.png"
          headline={catchphraseSecondary}
          gallery={allImages}
        />

        <div className="intro content-container">
          <div className="imageSide">
            <div className="stats">
              {propertyHighlightedInfo &&
                propertyHighlightedInfo.map((statInfo, i) => {
                  return (
                    <p key={i} className="stat">
                      <span>{statInfo.fields.title}</span>
                      {statInfo.fields.body}
                    </p>
                  );
                })}
            </div>
          </div>

          <div className="text">
            {mainCopyIntro && <p>{mainCopyIntro}</p>}
            {mainCopyBody}
          </div>
        </div>

        <div className="mapHouse">
          <MyMapComponent isMarkerShown theMarker={location} />
          <div className="property">
            <div
              className="property-image"
              style={{ backgroundImage: `url(${heroImage})` }}
            >
              <img src={heroImage} />
            </div>
            <div className="property-details">
              <p className="address">{suburbAndPostcode}</p>
              <p className="addressLine1">{addressLine1}</p>
              <p className="price">{price}</p>
              <div className="bottom">
                <ul className="features">
                  <li className="beds">
                    <img src="/images/feature-home.png" />
                    <p>{numberOfBeds}</p>
                  </li>
                  <li className="baths">
                    <img src="/images/feature-showers.svg" />
                    <p>{numberOfBaths}</p>
                  </li>
                  <li className="cars">
                    <img src="/images/feature-carspots.svg" />
                    <p>{numberOfCars}</p>
                  </li>
                </ul>
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
                {indoorFeatures &&
                  indoorFeatures.map((indoorFeature, i) => {
                    return <li key={i}>{indoorFeature}</li>;
                  })}
              </ul>
              <p className="title">Outdoor Features</p>
              <ul className="outdoor">
                {outdoorFeatures &&
                  outdoorFeatures.map((outdoorFeature, i) => {
                    return <li key={i}>{outdoorFeature}</li>;
                  })}
              </ul>
            </div>
          </div>
        </div>

        <InViewMonitor
          classNameNotInView="vis-hidden"
          intoViewMargin="100px"
          classNameInView="animated slideInRight quote-area content-container"
        >
          <div className="the-quote">
            <img src="/images/man-white.png" />
            <p>{primaryQuote}</p>
          </div>
        </InViewMonitor>

        <div className="local-area">
          <div className="content-container">
            <div className="head">
              <img src="/images/rss.png" />
              <h3>
                Parts of the local area that will. make it time well spent.
              </h3>
            </div>
            <div className="landmarks">
              {allPointsOfInterest &&
                allPointsOfInterest.map((pointOfInterest, i) => {
                  return (
                    <div key={i} className="place">
                      <div className="content">
                        <div className="type">
                          {pointOfInterest.fields.title}
                        </div>
                        <h3>{pointOfInterest.fields.body}</h3>
                        <a href="#">
                          {pointOfInterest.fields.distance}{" "}
                          <img src="/images/review-marker.png" />
                        </a>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>

        <InViewMonitor
          classNameNotInView="vis-hidden"
          intoViewMargin="100px"
          classNameInView="animated slideInLeft quote-area content-container black"
        >
          <div className="the-quote">
            <img src="/images/man-white.png" />
            <p>{secondaryQuote}</p>
          </div>
        </InViewMonitor>

        <div className="recent-listings">
          <div className="content-container">
            <div className="head list">
              <img src="/images/graph.svg" />
              <h3>Comparable sales in the local area.</h3>
            </div>

            {listingComparableSales &&
              listingComparableSales.map((compareableSale, i) => {
                return (
                  <div key={i} className="property">
                    <div
                      className="property-image"
                      style={{
                        backgroundImage: `url(${
                          compareableSale.fields.tileImage.fields.file.url
                        })`
                      }}
                    >
                      <img
                        src={compareableSale.fields.tileImage.fields.file.url}
                      />
                    </div>
                    <div className="property-details">
                      <p className="address">
                        {compareableSale.fields.suburbAndPostcode}
                      </p>
                      <p className="price">
                        {compareableSale.fields.addressLine1}
                      </p>
                      <p className="price">${compareableSale.fields.price}</p>
                      <div className="bottom">
                        <ul className="features">
                          <li className="beds">
                            <img src="/images/home-icon.svg" />
                            <p>{compareableSale.fields.numberOfBeds}</p>
                          </li>
                          <li className="baths">
                            <img src="/images/feature-showers.svg" />
                            <p>{compareableSale.fields.numberOfBaths}</p>
                          </li>
                          <li className="cars">
                            <img src="/images/feature-carspots.svg" />
                            <p>{compareableSale.fields.numberOfCars}</p>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        <div className="property-team">
          <div className="content-container">
            <div className="head">
              <img src="/images/rss.png" />
              <h3>Get in touch with the Avnu property team.</h3>
            </div>
            <div className="team-members">
              {agents &&
                agents.map((agent, i) => {
                  return (
                    <div key={i} className="member">
                      <img
                        src={
                          agent.fields.agentTile.fields.tileImage.fields.file
                            .url
                        }
                      />
                      <div className="content">
                        <h3>{agent.fields.firstName}</h3>
                        <p>{agent.fields.tileBody}</p>
                        <div className="links">
                          <a href={"mailto:" + agent.fields.emailAddress}>
                            Send message <img src="/images/email.svg" />
                          </a>
                          <a
                            href={"/our-agents/" + agent.fields.slug}
                            className="with-arrow"
                          >
                            See {agent.fields.firstName + "'s"} profile
                          </a>
                        </div>
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

export default PropertyDetail;
