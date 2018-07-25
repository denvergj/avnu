import React, { Component, createElement } from "react";
import Helmet from "react-helmet";
import { Link } from "react-router-dom";
import { createClient } from "contentful";
import Zoom from "react-reveal/Zoom";
import Hero from "./Hero";
import marksy from "marksy";

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
    pageData: null,
    isLoading: false
  };

  componentWillMount() {
    const client = createClient({
      space: process.env.REACT_APP_SPACE_ID,
      accessToken: process.env.REACT_APP_ACCESS_TOKEN
    });

    client
      // use getEntries because it does link resolution
      .getEntries({
        content_type: "listingListPage"
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
        content_type: "listing"
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
    document.body.classList.add("listing-page");
  }

  render() {
    let imgSrc = null,
      imgTileSrc = null;
    let heroImage, heroImageBody, heroImageHeading, pageHeading;

    if (this.state.hero) {
      ({ heroImageBody, heroImageHeading, pageHeading } = this.state.hero);
      heroImage = this.state.hero.heroImage.fields.file.url;
    }
    console.log("this.state", this.state);

    let shortMonths = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];
    let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

    return (
      <div className="our-listings">
        <Helmet title="Avnu - Our Listings" />
        <Hero
          mainTitle={heroImageBody}
          introText={heroImageHeading}
          imgSrc={heroImage}
          icon="/images/listing-icon.png"
          headline={pageHeading}
        />

        <div className="content-container listings">
          {this.state.data &&
            this.state.data.map((property, i) => {
              let date = new Date(property.fields.nextOpenDate);

              const propertyClass = property.fields.isLive
                ? "property"
                : "property hidden";

              return (
                <div key={i} className={propertyClass}>
                  <div
                    className="property-image"
                    style={{
                      backgroundImage: `url(${property.fields.allImages &&
                        property.fields.allImages[0].fields.file.url})`
                    }}
                  >
                    <Link to={`/our-listings/${property.fields.slug}/`}>
                      <img
                        src={
                          property.fields.allImages &&
                          property.fields.allImages[0].fields.file.url
                        }
                      />
                    </Link>
                    <div className="overlay-details">
                      <div
                        className={
                          "status " + (property.fields.isNew ? "" : "hide")
                        }
                      >
                        <p>NEW</p>
                      </div>
                      <div className="date">
                        <p>
                          Open {days[date.getDay()]} {date.getDate()}{" "}
                          {shortMonths[date.getMonth()]}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="property-details">
                    <div className="type">
                      <img src="/images/listing-icon.png" />
                      <p>{property.fields.saleMethod}</p>
                    </div>
                    <p className="address">
                      {property.fields.addressLine1}{" "}
                      {property.fields.suburbAndPostcode}
                    </p>
                    <p className="price">{property.fields.priceguide}</p>
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
                      <Link
                        to={`/our-listings/${property.fields.slug}/`}
                        className="with-arrow"
                      >
                        View
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>

        <div
          className={`content-container ${
            this.state.isLoading ? "animated bounceOutLeft" : ""
          }`}
        >
          <div className="infinite-scroll">
            <a
              onClick={() => this.setState({ isLoading: true })}
              className="with-arrow"
            >
              Load more listings
            </a>
          </div>
        </div>
        {this.state.isLoading && (
          <React.Fragment>
            <div className="content-container animated bounceInRight">
              <div className="loading-wrapper">
                <div className="clock-loader clock-loader--error">
                  <div className="clock-loader__minutes" />
                  <div className="clock-loader__hours" />
                </div>
              </div>
            </div>
            <div className="content-container error animated fadeIn">
              <div className="error">
                Ooops, we're still ironing out the kinks. Error occurred
                retrieving other listings
              </div>
            </div>
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default OurListings;
