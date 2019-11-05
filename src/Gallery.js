import React, { Component } from "react";
import GalleryGrid from "react-grid-gallery";
import "./Gallery.css";

const processImages = images => {
  let result = [];
  images.forEach(element => {
    result.push({
      src: require(element.link),
      thumbnail: require(element.link),
      thumbnailWidth: 320,
      thumbnailHeight: 174
    });
  });
  return result;
};

class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: this.props.images
    };
    console.log(this.state.images);
  }

  render() {
    return (
      <div id="gallery">
        <GalleryGrid images={this.state.images} />
      </div>
    );
  }
}

export default Gallery;
