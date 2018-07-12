import React from 'react';
import Lightbox from 'react-images';
 
export default class Sample extends React.Component {
  
  render() {
    return (
      <Lightbox
        images={[{ src: '/images/hero.jpg' }, { src: '/images/hero.jpg' }]}
        isOpen={this.state.lightboxIsOpen}
        onClickPrev={this.gotoPrevious}
        onClickNext={this.gotoNext}
        onClose={this.closeLightbox}
      />
    );
  }
}