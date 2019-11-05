import React, { Component } from "react";
import Slider from "@material-ui/core/Slider";
import SearchField from "react-search-field";
import Typography from "@material-ui/core/Typography";
import StarRatingComponent from "react-star-rating-component";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import "./PublicView.css";
import Axios from "axios";

class PublicView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rent: 0,
      bedrooms: 0,
      bathrooms: 0,
      rating: 0,
      listings: [
        {
          address: "1051 South Adams Street, Bloomington, Indiana 47403",
          price: 942,
          bedroom: 1,
          bathroom: 1,
          rating: 4,
          image: "./images/01/img01.png"
        },
        {
          address: "225 N Washington Street, Bloomington, Indiana 47408",
          price: 980,
          bedroom: 3,
          bathroom: 1,
          rating: 3,
          image: "./images/02/img01.png"
        },
        {
          address: "1001 S. Sugar Maple Circle, Bloomington, Indiana 47403",
          price: 457,
          bedroom: 2,
          bathroom: 1,
          rating: 2,
          image: "./images/03/img01.png"
        },
        {
          address: "418 East 8th Street, Bloomington, IN",
          price: 6600,
          bedroom: 5,
          bathroom: 4,
          rating: 3,
          image: "./images/04/img01.png"
        },
        {
          address: "316 East 10th Street, Bloomington, IN",
          price: 3400,
          bedroom: 4,
          bathroom: 2,
          rating: 4,
          image: "./images/05/img01.png"
        },
        {
          address: "105 E 6th St Bloomington, IN 47408",
          price: 2625,
          bedroom: 3,
          bathroom: 2,
          rating: 5,
          image: "./images/06/img01.png"
        },
        {
          address: "4351 Cypress Ln Bloomington, Indiana 47404",
          price: 2800,
          bedroom: 3,
          bathroom: 3,
          rating: 3,
          image: "./images/07/img01.png"
        },
        {
          address: "345 S College Ave, Bloomington, Indiana 47403",
          price: 1180,
          bedroom: 1,
          bathroom: 1,
          rating: 2,
          image: "./images/08/img01.png"
        },
        {
          address: "541 N Woodlawn Ave, Bloomington, IN 47408",
          price: 1500,
          bedroom: 1,
          bathroom: 1,
          rating: 1,
          image: "./images/09/img01.png"
        },
        {
          address: "420 E 6th St Bloomington, Indiana 47408",
          price: 2397,
          bedroom: 3,
          bathroom: 1,
          rating: 1,
          image: "./images/10/img01.png"
        },
        {
          address: "108 W. 6th St Bloomington, Indiana 47404",
          price: 3800,
          bedroom: 3,
          bathroom: 2,
          rating: 4,
          image: "./images/11/img01.png"
        },
        {
          address: "105 N College Ave Bloomington, Indiana 47401",
          price: 3900,
          bedroom: 4,
          bathroom: 4,
          rating: 5,
          image: "./images/12/img01.png"
        },
        {
          address: "525 South Patterson Drive, Bloomington, Indiana 47403",
          price: 826,
          bedroom: 1,
          bathroom: 1,
          rating: 4,
          image: "./images/13/img01.png"
        },
        {
          address: "521 E. 7th St. Bloomington, Indiana 47408",
          price: 1260,
          bedroom: 2,
          bathroom: 1,
          rating: 3,
          image: "./images/14/img01.png"
        }
      ],
      allListings: [
        {
          address: "7604 Idlebrook Drive",
          price: 500,
          bedroom: 3,
          bathroom: 2,
          rating: 4
        }
      ]
    };

    this.rentSlider = this.rentSlider.bind(this);
    this.bedroomSlider = this.bedroomSlider.bind(this);
    this.bathroomSlider = this.bathroomSlider.bind(this);
    this.filter = this.filter.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    Axios.get("http://localhost:8080/publicView").then(
      response => {
        this.setState({
          listings: response.data.list
        });
      },
      error => {
        console.log(error);
      }
    );
  }

  rentSlider(event, slider) {
    this.setState({ rent: slider });
  }

  bedroomSlider(event, slider) {
    this.setState({ bedrooms: slider });
  }

  bathroomSlider(event, slider) {
    this.setState({ bathrooms: slider });
  }

  starRating(nextValue, preValue, name) {
    this.setState({ rating: nextValue });
  }

  filter() {
    let result = [];
    this.state.allListings.forEach(element => {
      if (element.price <= this.state.rent) {
        result.push(element);
      }
    });
    this.setState({ listings: result });
  }

  handleClick(object) {
    window.location.replace(
      `http://localhost:3000/SpecificPosting?postingID=${object.postingId}`
    );
  }

  render() {
    return (
      <div id="publicview-container">
        <div id="splash-page">
          <img
            id="splash-image"
            src={require("./images/college-students-edited.jpg")}
          />
        </div>
        <div id="content-container">
          <div className="search-filter" id="search">
            <SearchField
              id="search-bar"
              placeholder="search item"
              //onSearchClick={onSearchClick}
            />
            <Typography id="rent-slider" className="searchLabels" gutterBottom>
              Rent
            </Typography>
            <Slider
              defaultValue={500}
              aria-labelledby="rent-slider"
              valueLabelDisplay="auto"
              step={100}
              min={0}
              max={1000}
              className="slider"
              onChange={this.rentSlider}
            />
            <Typography
              id="bedroom-slider"
              className="searchLabels"
              gutterBottom
            >
              Bedrooms
            </Typography>
            <Slider
              defaultValue={4}
              aria-labelledby="rent-slider"
              valueLabelDisplay="auto"
              step={1}
              min={1}
              max={10}
              className="slider"
              onChange={this.bedroomSlider}
            />
            <Typography id="bedroom-slider" className="searchLabels">
              Bathrooms
            </Typography>
            <Slider
              defaultValue={2}
              aria-labelledby="bathroom-slider"
              valueLabelDisplay="auto"
              step={0.5}
              min={1}
              max={5}
              className="slider"
              onChange={this.bathroomSlider}
            />
            <Typography className="searchLabels">Average Rating</Typography>
            <StarRatingComponent
              className="star-filter"
              name="stars"
              editing={true}
              starCount={5}
              onStarClick={this.starRating.bind(this)}
            />
            <Button
              variant="contained"
              className="filter-button"
              color="default"
              onClick={this.filter}
            >
              Filter
            </Button>
          </div>
          <div className="cards">
            {this.state.listings.map((object, listing) => (
              <Card className="listing-cards">
                <CardActionArea onClick={() => this.handleClick(object)}>
                  <CardMedia
                    component="img"
                    image={require(`${object.image}`)}
                    alt="Testing"
                    height="95"
                    title="Testing"
                  />
                  <CardContent>
                    <Typography
                      gutterBottom
                      className="address-line"
                      id="address"
                    >
                      {object.address}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textPrimary"
                      className="price-bed-bath"
                    >
                      <label>${object.price}/mo |</label>
                      <label>{object.bedroom} br |</label>
                      <label>{object.bathroom} ba</label>
                    </Typography>
                    <div className="star-rating">
                      <StarRatingComponent
                        editing={false}
                        starCount={5}
                        value={object.rating}
                      />
                    </div>
                  </CardContent>
                </CardActionArea>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
export default PublicView;
