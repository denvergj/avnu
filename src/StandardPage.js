import React, { Component, createElement } from "react";
import Helmet from "react-helmet";
import { createClient } from "contentful";
import Hero from "./Hero";
import Zoom from "react-reveal/Zoom";
import { withRouter } from "react-router-dom";
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

    client
      // use getEntries because it does link resolution
      .getEntries({
        content_type: "aboutAvnuStandardContentPages",
        "fields.menuItemText[in]": this.props.match.params.id
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

        {this.state.data &&
          this.state.data.contentBlocks.map((block, i) => {
            console.log("block", block);

            if (i < 1) {
              let blockBody = getMarkup(block.fields.blockBody);
              return (
                <Zoom key={i}>
                  <section key={i} className="content double">
                    <div className="content-container flex">
                      <div>
                        <img src="/images/content-image.jpg" />
                      </div>
                      <div className="text">{blockBody}</div>
                    </div>
                  </section>
                </Zoom>
              );
            }
          })}
      </div>
    );
  }
}

export default withRouter(StandardPage);
