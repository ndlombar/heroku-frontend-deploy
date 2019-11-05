import React, { Component } from "react";
import StarRatingComponent from "react-star-rating-component";
import { Map, GoogleApiWrapper, GoogleMapReact } from "google-maps-react";
import Gallery from "./Gallery.js";
import { TextField, Button } from "@material-ui/core";

import "./SpecificPosting.css";
import "./DefaultStyle.css";

const mapStyles = {
  width: "calc(33vw - 40px)",
  height: "calc(33vw - 40px)"
};

class SpecificPosting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: {
        postingID: 1,
        apartmentInfo: {
          address: "1051 South Adams Street, Bloomington, Indiana 47403",
          rent: 942,
          rooms: 1,
          bath: 1,
          electricity: "$70",
          water: "$100"
        },
        contact: {
          name: "John Property",
          phoneNumber: "(812)555-5555",
          email: "johnprops@gmail.com"
        },
        mapLocation: {
          latitude: 39.1537375,
          longitude: -86.5510529
        },
        amenities: ["Pet-Friendly", "Indoor Pool", "Free Money!"],
        ratings: [
          {
            username: "John Smith",
            stars: 2,
            review: "Average Apartment."
          },
          {
            username: "Jack Reacher",
            stars: 3,
            review: "Good Apartment."
          }
        ],
        images: [
          {
            src: require("./images/01/img01.png"),
            thumbnail: require("./images/01/img01.png"),
            thumbnailWidth: 320,
            thumbnailHeight: 174
          },
          {
            src: require("./images/01/img02.png"),
            thumbnail: require("./images/01/img02.png"),
            thumbnailWidth: 320,
            thumbnailHeight: 174
          },
          {
            src: require("./images/01/img03.png"),
            thumbnail: require("./images/01/img03.png"),
            thumbnailWidth: 320,
            thumbnailHeight: 174
          },
          {
            src: require("./images/01/img04.png"),
            thumbnail: require("./images/01/img04.png"),
            thumbnailWidth: 320,
            thumbnailHeight: 174
          }
        ],
        tours: []
      },
      postings: [
        {
          postingID: "3",
          apartmentInfo: {
            address: "2540 S. Alley St. Bloomington, IN 47403",
            rent: "$4,900",
            rooms: "3",
            bath: "3.5",
            electricity: "$70",
            water: "$100"
          },
          contact: {
            name: "John Property",
            phoneNumber: "(812)555-5555",
            email: "johnprops@gmail.com"
          },
          mapLocation: {
            lattitude: "39.1653",
            longitude: "-86.5264"
          },
          amenities: ["Pet-Friendly", "Indoor Pool", "Free Money!"],
          ratings: [
            {
              username: "Past Tenant",
              stars: "3",
              review:
                "This was a pretty cool place to live in when I was here for school.  The environment is pretty loud though, so may be best to avoid if you are not into the party scene."
            },
            {
              username: "Past Tenant",
              stars: "1",
              review: "loud neighborhood.  AVOID IF YOU ARE A GRAD STUDENTS!!!"
            },
            {
              username: "Past Tenant",
              stars: "3",
              review:
                "Good place to live if you like to be close to campus, but also close to downtown.  Rent was a little high, though..."
            }
          ]
        },
        {
          postingID: "12346",
          apartmentInfo: {
            address: "1216 N Woodlawn Avenue",
            rent: "$4,900",
            rooms: "3",
            bath: "3.5",
            electricity: "$70",
            water: "$100"
          },
          contact: {
            name: "John Property",
            phoneNumber: "(812)555-5555",
            email: "johnprops@gmail.com"
          },
          mapLocation: {
            lattitude: "39.1653",
            longitude: "-86.5264"
          },
          amenities: ["Pet-Friendly", "Indoor Pool", "Free Money!"],
          ratings: [
            {
              username: "Past Tenant",
              stars: "3",
              review:
                "This was a pretty cool place to live in when I was here for school.  The environment is pretty loud though, so may be best to avoid if you are not into the party scene."
            },
            {
              username: "Past Tenant",
              stars: "1",
              review: "loud neighborhood.  AVOID IF YOU ARE A GRAD STUDENTS!!!"
            },
            {
              username: "Past Tenant",
              stars: "3",
              review:
                "Good place to live if you like to be close to campus, but also close to downtown.  Rent was a little high, though..."
            }
          ],
          images: [
            {
              src: require("./images/sample1.jpg"),
              thumbnail: require("./images/sample1.jpg"),
              thumbnailWidth: 320,
              thumbnailHeight: 174
            },
            {
              src: require("./images/sample2.jpg"),
              thumbnail: require("./images/sample2.jpg"),
              thumbnailWidth: 320,
              thumbnailHeight: 174
            }
          ]
        },
        {
          postingID: "12347",
          apartmentInfo: {
            address: "7604 Idlebrook Drive",
            rent: "$4,900",
            rooms: "3",
            bath: "3.5",
            electricity: "$70",
            water: "$100"
          },
          contact: {
            name: "John Property",
            phoneNumber: "(812)555-5555",
            email: "johnprops@gmail.com"
          },
          mapLocation: {
            lattitude: "39.1653",
            longitude: "-86.5264"
          },
          amenities: ["Pet-Friendly", "Indoor Pool", "Free Money!"],
          ratings: [
            {
              username: "Past Tenant",
              stars: "3",
              review:
                "This was a pretty cool place to live in when I was here for school.  The environment is pretty loud though, so may be best to avoid if you are not into the party scene."
            },
            {
              username: "Past Tenant",
              stars: "1",
              review: "loud neighborhood.  AVOID IF YOU ARE A GRAD STUDENTS!!!"
            },
            {
              username: "Past Tenant",
              stars: "3",
              review:
                "Good place to live if you like to be close to campus, but also close to downtown.  Rent was a little high, though..."
            }
          ]
        }
      ]
    };

    let vars = {};
    let parts = window.location.href.replace(
      /[?&]+([^=&]+)=([^&]*)/gi,
      function(m, key, value) {
        vars[key] = value;
      }
    );
    console.log(vars);
    var postId = vars.postingID;
    for (var i = 0; i < this.state.postings.length; i++) {
      var obj = this.state.postings[i];
      if (postId == obj.postingID) {
        this.state.post = obj;
        console.log(this.state.post);
      }
    }
  }

  render() {
    return (
      <div class="primary-container">
        <main class="body">
          <div class="specificposting-container">
            <div class="leftside">
              <div class="aptinfo">
                <h3>Room Information</h3>
                <h4>{this.state.post.apartmentInfo.address}</h4>
                <h4>{this.state.post.apartmentInfo.rent}</h4>
                <h4>
                  <u>Rooms</u>: {this.state.post.apartmentInfo.rooms} |{" "}
                  <u>Bath</u>: {this.state.post.apartmentInfo.bath}
                </h4>
                <h4>
                  <u>Utilities</u>
                </h4>
                <ul>
                  <li>Gas: Included!</li>
                  <li>
                    Electric: (est.){this.state.post.apartmentInfo.electricity}
                  </li>
                  <li>Water: (est.) {this.state.post.apartmentInfo.water}</li>
                  <li>Internet: Included!</li>
                </ul>
                <h4>
                  <u>Amenities</u>
                </h4>
                <ul>
                  {this.state.post.amenities.map(amenity => (
                    <li>{amenity} </li>
                  ))}
                </ul>
              </div>
              <div class="contact">
                <h3>Contact</h3>
                <div class="contact-display">
                  <img
                    class="contact-portrait"
                    src={require("./logo.svg")}
                    alt="logo"
                  />
                  <div class="contact-info">
                    <h4>
                      {this.state.post.contact.name}
                      <br />
                    </h4>
                    <i>
                      {this.state.post.contact.phoneNumber}
                      <br />
                      <br />
                    </i>
                    <i>
                      {this.state.post.contact.email}
                      <br />
                    </i>
                  </div>
                </div>
              </div>
              <div class="visitation">
                <h3>Schedule a Visit!</h3>
                <TourSchedule tours={this.state.post.tours} />
              </div>
            </div>
            <div class="rightside">
              <div class="gallery">
                <h3>Gallery</h3>
                <Gallery images={this.state.post.images} />
              </div>
              <div class="bottom">
                <div class="map">
                  <h3>Map</h3>
                  <Map
                    google={this.props.google}
                    zoom={8}
                    style={mapStyles}
                    initialCenter={{ lat: 39.1653, lng: -86.5264 }}
                  />
                </div>
                <div class="review">
                  <h3>Reviews and Ratings</h3>
                  {this.state.post.ratings.map(data => (
                    <div class="review-item">
                      <div class="review-item">
                        <i>{data.username}</i>
                      </div>
                      <StarRatingComponent
                        editing={false}
                        starCount={5}
                        value={data.stars}
                      />
                      <div class="review-item-review">{data.review}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "" /*'AIzaSyBSFD5npoXO1kSQvawK1NuAx197oSFv9pI'*/
})(SpecificPosting);

class TourSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: this.getCurrentDate(),
      startTime: "09:00",
      endTime: "09:30",
      phone: "",
      validPhone: false,
      tours: []
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleInputChangePhone = this.handleInputChangePhone.bind(this);
  }

  render() {
    var tours = this.props.tours.map(function(obj) {
      return {
        uid: obj.uid,
        start_time: obj.start_time,
        end_time: obj.end_time
      };
    });
    this.state.tours = tours;

    return (
      <div class="tour-scheduling">
        <i>
          NOTE: Standard hours are between 9:00am and 5:00pm. Visits last 30
          minutes (1/2 hour). A starting time greater than 4:30pm won't be
          considered.
        </i>
        <br style={{ width: "100%", marginBottom: "20px" }} />
        <form autoComplete="off">
          <TextField
            name="date"
            label="Visitation Date"
            type="date"
            value={this.state.date}
            onChange={this.handleInputChange}
            fullWidth="true"
            defaultValue={this.getCurrentDate()}
            InputLabelProps={{
              shrink: true
            }}
          />
          <TextField
            name="startTime"
            label="Start Time"
            type="time"
            fullWidth="true"
            value={this.state.startTime}
            onChange={this.handleInputChange}
            InputLabelProps={{
              shrink: true
            }}
          />

          <TextField
            name="phone"
            label="Phone"
            type="tel"
            fullWidth="true"
            value={this.state.phone}
            onChange={this.handleInputChangePhone}
            InputLabelProps={{
              shrink: true
            }}
          />
          <div style={{ width: "100%" }}>
            <br />
          </div>
          {/* <button class="secondary-button" onClick={this.handleSubmit}>
            Schedule a Tour
          </button> */}
          <Button
            variant="contained"
            color="primary"
            onClick={this.handleSubmit}
          >
            Schedule a Tour
          </Button>
        </form>
      </div>
    );
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleInputChangePhone(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    const nums = value.replace(/[^0-9]/g, "");
    if (nums.length < 10) {
      this.setState({ [name]: nums });
      this.setState({ ["validPhone"]: false });
    } else if (nums.length === 10) {
      const p = nums.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
      this.setState({ [name]: p });
      this.setState({ ["validPhone"]: true });
    }
  }

  handleSubmit(event) {
    if (
      this.state.date === "" ||
      this.state.startTime === "" ||
      this.state.endTime === "" ||
      !this.state.validPhone
    ) {
      alert(
        "WARNING: Invalid Visit Input\n\nPlease fill out all attributes before submitting."
      );
      return;
    }

    if (this.state.startTime < "09:00" || this.state.startTime > "16:30") {
      alert(
        "WARNING: Requested Time Out of Hours.\n\nPlease fill out a start time after 09:00AM and before 04:30PM."
      );
      return;
    }

    //gets the end time 30 minutes after the start time
    const leadZero = n => (n < 10 ? "0" : "") + n.toString();
    var hour = parseInt(this.state.startTime.substring(0, 2));
    var minute = parseInt(this.state.startTime.substring(3));
    minute += 30;
    this.state.endTime =
      minute >= 60
        ? leadZero(hour + 1) + ":" + leadZero(minute - 60)
        : leadZero(hour) + ":" + leadZero(minute);

    //validates no conflicts with existing tours
    for (let tour in this.state.tours) {
      //if either the start or end times fall within the current tour, there's a conflict
      if (
        (this.state.startTime >=
          this.state.tours[tour].start_time.substring(11) &&
          this.state.startTime <
            this.state.tours[tour].end_time.substring(11)) ||
        (this.state.endTime >=
          this.state.tours[tour].start_time.substring(11) &&
          this.state.endTime < this.state.tours[tour].end_time.substring(11))
      ) {
        alert(
          "WARNING: Scheduling Conflict!\n\nThere's already a tour scheduled during that time.  Please select another."
        );
        return;
      }
    }

    //TODO: Send visitation to backend

    alert(
      "Visit Scheduled!\n\n" +
        "Date: " +
        this.state.date +
        "\nStart Time: " +
        this.state.startTime +
        "\nEnd Time: " +
        this.state.endTime +
        "\nContact #: " +
        this.state.phone
    );
    event.preventDefault();
  }

  getCurrentDate() {
    var today = new Date();
    return (
      today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate()
    );
  }
}
