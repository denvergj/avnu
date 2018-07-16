import React, { Component, createElement } from "react";
import Helmet from "react-helmet";
import { createClient } from "contentful";
import Hero from "./Hero";
import Zoom from "react-reveal/Zoom";
import marksy from "marksy";

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
    console.log(this.props.match.params.id);
    client
      // use getEntries because it does link resolution
      .getEntries({
        content_type: "standardContentPages",
        "fields.slug[in]": this.props.match.params.id,
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
    document.body.classList.add("standard-page-content");
  }

  render() {
    let mainTitle = null,
      introText = null,
      pageHeading = null,
      heroData = null,
      headline = null,
      heroImage = null,
      pageData = null,
      contentBloks;

    if (this.state.data) {
      heroData = this.state.data;
      pageData = this.state.data;
      mainTitle = heroData.heroImageHeading;
      introText = heroData.heroImageBody;
      heroImage = heroData.heroImage.fields.file.url;
      headline = heroData.pageHeading;
      contentBloks = pageData.contentBloks;
    }

    return (
      <div className="standard-page">
        <Helmet title={"Avnu - " + mainTitle} />
        <Hero
          mainTitle={mainTitle}
          introText={introText}
          imgSrc={heroImage}
          icon="/images/clock.svg"
          headline={headline}
        />

        {contentBloks &&
          contentBloks.map((block, i) => {
            let blockBody = getMarkup(block.fields.blockBody);
            let blockImage = block.fields.blockImage;
            let blockTitle = block.fields.blockTitle;

            let blockIconography = block.fields.iconography;
            console.log("blockIconography", blockIconography);
            if (block.fields.image) {
              return (
                <div className="side-area content-container">
                  <img src={block.fields.image.fields.file.url} />
                </div>
              );
            } else if (block.fields.quoteBody) {
              return (
                <div className="quote-area content-container">
                  <div className="the-quote">
                    <img src="https://images.ctfassets.net/dkcrc82u6zt9/GCYZPz8aAeo8Uw4miyIIo/06f487a622bb6d2d3681c87d0b3d1bd0/man.png" />
                    <p>{block.fields.quoteBody}</p>
                  </div>
                </div>
              );
            } else {
              return (
                <section key={i} className="content double">
                  {blockTitle
                    ? [
                        <div className="content-container full-width">
                          {blockIconography
                            ? [
                                <img
                                  className="iconography"
                                  src={blockIconography.fields.file.url}
                                />
                              ]
                            : null}
                          <h2>{blockTitle}</h2>
                        </div>
                      ]
                    : null}
                  <div className="content-container flex">
                    {blockImage
                      ? [
                          <div>
                            <img src={blockImage.fields.file.url} />
                          </div>
                        ]
                      : null}
                    <div className="text">{blockBody}</div>
                  </div>
                </section>
              );
            }
          })}
      </div>
    );
  }
}

export default StandardPage;
