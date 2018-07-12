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

class AgentProfile extends Component {
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
        content_type: "agent",
        "fields.slug[in]": this.props.match.params.agent
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
  }

  render() {
    let mainTitle = null,
      introText = null,
      pageHeading = null,
      agentData = null,
      firstName = null,
      lastName = null,
      headline = null,
      heroImage = null,
      catchphrasePrimary = null,
      secondaryImage = null,
      agentHighlightedInfo = null,
      mainCopyBody = null,
      phoneNumber = null,
      emailAddress = null,
      primaryQuote = null,
      secondaryQuote = null,
      pastListings = null,
      agentReviews = null,
      divStyle = null;

    if (this.state.data) {
      agentData = this.state.data;
      firstName = agentData.firstName;
      lastName = agentData.lastName;
      mainTitle = agentData.firstName + " " + agentData.lastName;
      introText = agentData.mainCopyInterestingPersonalMessage;
      catchphrasePrimary = agentData.catchphrasePrimary;
      secondaryImage = agentData.secondaryImage
        ? agentData.secondaryImage.fields.file.url
        : "";
      agentHighlightedInfo = agentData.agentHighlightedInfo;
      mainCopyBody = getMarkup(agentData.mainCopyBody);
      phoneNumber = agentData.phoneNumber;
      emailAddress = agentData.emailAddress;
      primaryQuote = agentData.primaryQuote.fields.quoteBody;
      secondaryQuote = agentData.secondaryQuote
        ? agentData.secondaryQuote.fields.quoteBody
        : '"Time or brand related quote that relates to the brand."';
      pastListings = agentData.listingPast;
      agentReviews = agentData.agentReviews;
    }

    return (
      <div className="agent-profile-page">
        <Helmet title={"Avnu - " + firstName + " " + lastName} />
        <Hero
          mainTitle={mainTitle}
          introText={introText}
          imgSrc="/images/header.jpg"
          icon="/images/agent-icon.png"
          headline={catchphrasePrimary}
        />

        <div className="intro content-container">
          <div className="imageSide">
            <img src={secondaryImage} />
            <div className="stats">
              {agentHighlightedInfo &&
                agentHighlightedInfo.map((statInfo, i) => {
                  return (
                    <p key={i} className="stat">
                      <span>{statInfo.fields.title}</span>
                      {statInfo.fields.body}
                    </p>
                  );
                })}
            </div>
          </div>

          <div className="text">{mainCopyBody}</div>

          <div className="ctas">
            <a href={"tel:" + phoneNumber}>
              {phoneNumber} <img src="/images/message.svg" />
            </a>
            <a href={"mailto:" + emailAddress}>
              Send message <img src="/images/email.svg" />
            </a>
          </div>
        </div>

        <InViewMonitor
          classNameNotInView="vis-hidden test"
          intoViewMargin="50px"
          classNameInView="animated slideInRight quote-area content-container test"
        >
          <div className="the-quote">
            <img src="https://images.ctfassets.net/dkcrc82u6zt9/GCYZPz8aAeo8Uw4miyIIo/06f487a622bb6d2d3681c87d0b3d1bd0/man.png" />
            <p>{primaryQuote}</p>
          </div>
        </InViewMonitor>

        <div className="recent-listings">
          <div className="content-container">
            <div className="head">
              <img src="/images/rss.png" />
              <h3>
                Discover some of {firstName + "'s"} recent listings in the area
              </h3>
            </div>
          </div>

          <div className="mapHouse">
            <MyMapComponent isMarkerShown theMarkers={pastListings} />
            {pastListings &&
              pastListings.map((propertyListing, i) => {
                if (i > 0) {
                  divStyle = {
                    display: "none"
                  };
                } else {
                  divStyle = {
                    display: "block"
                  };
                }
                return (
                  <div
                    key={i}
                    className="mapHouseProperty property"
                    id={"property-" + propertyListing.fields.location.lon}
                    style={divStyle}
                  >
                    <div
                      className="property-image"
                      style={{
                        backgroundImage: `url(${
                          propertyListing.fields.tileImage.fields.file.url
                        })`
                      }}
                    >
                      <img
                        src={propertyListing.fields.tileImage.fields.file.url}
                      />
                    </div>
                    <div className="property-details">
                      <p className="address">
                        {propertyListing.fields.suburbAndPostcode}
                      </p>
                      <p className="addressLine1">
                        {propertyListing.fields.addressLine1}
                      </p>
                      <p className="price">${propertyListing.fields.price}</p>
                      <div className="bottom">
                        <ul className="features">
                          <li className="beds">
                            <img src="/images/home-icon.svg" />
                            <p>{propertyListing.fields.numberOfBeds}</p>
                          </li>
                          <li className="baths">
                            <img src="/images/feature-showers.svg" />
                            <p>{propertyListing.fields.numberOfBaths}</p>
                          </li>
                          <li className="cars">
                            <img src="/images/feature-carspots.svg" />
                            <p>{propertyListing.fields.numberOfCars}</p>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>

          {pastListings
            ? [
                <div className="content-container" key="listing">
                  <div className="head list">
                    <img src="/images/graph-icon.png" />
                    <h3>
                      Browse all of {firstName + "'s"} past and present listings
                    </h3>
                  </div>

                  {pastListings &&
                    pastListings.map((propertyListing, i) => {
                      return (
                        <div key={i} className="property">
                          <div
                            className="property-image"
                            style={{
                              backgroundImage: `url(${
                                propertyListing.fields.tileImage.fields.file.url
                              })`
                            }}
                          >
                            <img
                              src={
                                propertyListing.fields.tileImage.fields.file.url
                              }
                            />
                          </div>
                          <div className="property-details">
                            <p className="address">
                              {propertyListing.fields.suburbAndPostcode}
                            </p>
                            <p className="addressLine1">
                              {propertyListing.fields.addressLine1}
                            </p>
                            <p className="price">
                              ${propertyListing.fields.price}
                            </p>
                            <div className="bottom">
                              <ul className="features">
                                <li className="beds">
                                  <img src="/images/home-icon.svg" />
                                  <p>{propertyListing.fields.numberOfBeds}</p>
                                </li>
                                <li className="baths">
                                  <img src="/images/feature-showers.svg" />
                                  <p>{propertyListing.fields.numberOfBaths}</p>
                                </li>
                                <li className="cars">
                                  <img src="/images/feature-carspots.svg" />
                                  <p>{propertyListing.fields.numberOfCars}</p>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              ]
            : null}
        </div>

        <InViewMonitor
          classNameNotInView="vis-hidden thisisit"
          intoViewMargin="100px"
          classNameInView="animated slideInLeft quote-area content-container black"
        >
          <div className="the-quote">
            <img src="/images/graph-grey.png" />
            <p>{secondaryQuote}</p>
          </div>
        </InViewMonitor>

        {agentReviews
          ? [
              <div className="vendors" key="review">
                <div className="content-container">
                  <div className="head">
                    <img src="/images/heart-icon.png" />
                    <h3>
                      A snapshot of some of {firstName + "'s"} recent listings
                      and sales.
                    </h3>
                  </div>
                  {agentReviews &&
                    agentReviews.map((reviews, i) => {
                      return (
                        <div key={i} className="review">
                          <img
                            src="/images/review-home.jpg"
                            className="feature"
                          />
                          <div className="content">
                            <div className="star">
                              <img src="/images/star.svg" />
                              <span>{reviews.fields.stars}</span>
                            </div>
                            <h3>{reviews.fields.tileTitle}</h3>
                            <p>{reviews.fields.tileBody}</p>
                            <a
                              href={
                                "https://www.google.com/maps/search/" +
                                reviews.fields.fullAddress
                              }
                              target="_blank"
                            >
                              {reviews.fields.fullAddress}{" "}
                              <img src="/images/review-marker.png" />
                            </a>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            ]
          : null}
      </div>
    );
  }
}

export default AgentProfile;
