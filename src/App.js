import React, { Component } from "react";
import Drizzle from "./images/drizzle.svg";
import Rain from "./images/rain.svg";
import Snow from "./images/snows.svg";
import Atmosphere from "./images/wind.svg";
import Clear from "./images/sunny.svg";
import Clouds from "./images/cloudy.svg";
import Extreme from "./images/storm.svg";
import Haze from "./images/haze.svg";
import Thunderstorm from "./images/storms.svg";
import Outer from "./images/astronaut.svg";
import Satellite from "./images/satellite1.png";
import Lake from "./images/lake.png";
import NewYork from "./images/new-york-city.png";
import Tokyo from "./images/tokyo-city.png";
import MarsMountains from "./images/mars-mountains.png";
import Meteor1 from "./images/meteor1.svg";
import Meteor2 from "./images/meteor2.svg";
import Meteor3 from "./images/meteor3.svg";
import Sun from "./images/sun.svg";

import "./App.css";

//====================PARENT COMPONENT======================
class CardSet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      icons: {
        Drizzle: Drizzle,
        Rain: Rain,
        Snow: Snow,
        Atmosphere: Atmosphere,
        Clear: Clear,
        Clouds: Clouds,
        Extreme: Extreme,
        Thunderstorm: Thunderstorm,
        Outer: Outer,
        Haze: Haze,
        Mist: Haze
      },
      local: {
        place: "LOCAL",
        name: "--",
        maxC: "--",
        minC: "--",
        sunset: "--",
        sunrise: "--",
        visibility: "--",
        humidity: "--",
        cardShown: false,
        rootClasses: "card root",
        headerClasses: "card header",
        meteorClasses: "meteor",
        sunClasses: "sun",
        backgroundHeader: {
          backgroundImage:
            "linear-gradient(180deg, rgb(49, 89, 123), rgb(49, 46, 107))",
          backgroundSize: "400% 400%"
        },
        backgroundRoot: {
          backgroundImage: `url(${Satellite}), linear-gradient(180deg, rgb(49, 89, 123), rgb(49, 46, 107))`
        },
        foreground: Lake
      },
      newYork: {
        place: "NEW YORK",
        name: "--",
        maxC: "--",
        minC: "--",
        sunset: "--",
        sunrise: "--",
        visibility: "--",
        humidity: "--",
        cardShown: false,
        rootClasses: "card root",
        headerClasses: "card header",
        meteorClasses: "meteor",
        sunClasses: "sun",
        backgroundHeader: {
          backgroundImage:
            "linear-gradient(rgb(102, 105, 116),rgb(55, 59, 68))",
          backgroundSize: "400% 400%"
        },
        backgroundRoot: {
          backgroundImage: `url(${Satellite}), linear-gradient(rgb(102, 105, 116),rgb(55, 59, 68))`
        },
        foreground: NewYork
      },
      tokyo: {
        place: "TOKYO",
        name: "--",
        maxC: "--",
        minC: "--",
        sunset: "--",
        sunrise: "--",
        visibility: "--",
        humidity: "--",
        cardShown: false,
        rootClasses: "card root",
        headerClasses: "card header",
        meteorClasses: "meteor",
        sunClasses: "sun",
        backgroundHeader: {
          backgroundImage:
            "linear-gradient(rgb(195, 179, 145),rgb(65, 16, 16))",
          backgroundSize: "400% 400%"
        },
        backgroundRoot: {
          backgroundImage: `url(${Satellite}), linear-gradient(rgb(195, 179, 145),rgb(65, 16, 16))`
        },
        foreground: Tokyo
      },
      mars: {
        place: "MARS",
        name: "Mars",
        sol: "--",
        month: "--",
        maxC: "--",
        minC: "--",
        opacity: "--",
        sunset: "--",
        sunrise: "--",
        cardShown: false,
        rootClasses: "card root",
        headerClasses: "card header",
        meteorClasses: "meteor",
        sunClasses: "sun",
        backgroundHeader: {
          backgroundImage: "linear-gradient(rgb(137, 43, 43),rgb(0, 44, 48))",
          backgroundSize: "400% 400%"
        },
        backgroundRoot: {
          backgroundImage: `url(${Satellite}), linear-gradient(rgb(137, 43, 43),rgb(0, 44, 48))`
        },
        foreground: MarsMountains
      }
    };
    this.marsAPICall = this.marsAPICall.bind(this);
    this.weatherCall = this.weatherCall.bind(this);
    this.onLoadAPICalls = this.onLoadAPICalls.bind(this);
  }
  //==========Mars API call=============
  marsAPICall() {
    fetch("https://api.maas2.jiinxt.com/")
      .then(function(response) {
        if (response.ok) {
          return response.json();
        }
      })
      .then(
        function(data) {
          let newState = { ...this.state };
          newState.mars.sol = String(data.sol);
          newState.mars.month = data.season.split(" ")[1];
          newState.mars.maxC = `${data.max_temp}\xB0`;
          newState.mars.minC = `${data.min_temp}\xB0`;
          newState.mars.opacity = data.atmo_opacity;
          newState.mars.sunset = data.sunset;
          newState.mars.sunrise = data.sunrise;
          this.setState(newState);
        }.bind(this)
      );
  }
  //==========Weather API call=============
  weatherCall(lat, lon, location) {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=04404d9c365d16b696cd5e74c310b080`;
    fetch(url)
      .then(function(response) {
        return response.ok ? response.json() : console.log("No data received");
      })
      .then(
        function(data) {
          let newState = { ...this.state };
          newState[location].humidity = data.main.humidity;
          newState[location].maxC =
            Math.round((data.main.temp_max - 32) * (5 / 9)) + `\xB0`;
          newState[location].minC =
            Math.round((data.main.temp_min - 32) * (5 / 9)) + `\xB0`;
          newState[location].name = data.name;
          newState[location].visibility = data.weather[0].main;
          newState[location].sunrise = this.timeChange(data.sys.sunrise);
          newState[location].sunset = this.timeChange(data.sys.sunset);
          this.setState(newState);
        }.bind(this)
      );
  }
  //==========On Load API calls=============
  onLoadAPICalls() {
    this.marsAPICall();
    this.weatherCall("35.658581", "139.745438", "tokyo");
    this.weatherCall("40.758896", "-73.985130", "newYork");
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function(position) {
          this.weatherCall(
            position.coords.latitude,
            position.coords.longitude,
            "local"
          );
        }.bind(this)
      );
    }
  }
  //==========Seconds to hh:mm converter=============
  timeChange(sec) {
    let hhmm = sec % 86400;
    let hours =
      Math.floor(hhmm / 3600) <= 9
        ? "0" + Math.floor(hhmm / 3600)
        : Math.floor(hhmm / 3600);
    let minutes =
      Math.floor((hhmm % 3600) / 60) <= 9
        ? "0" + Math.floor((hhmm % 3600) / 60)
        : Math.floor((hhmm % 3600) / 60);
    return hours + ":" + minutes;
  }

  render() {
    return (
      <React.Fragment>
        <Intro />
        <div onLoad={this.onLoadAPICalls}>
          <WeatherCard location={this.state.mars} icons={this.state.icons} />
          <WeatherCard location={this.state.local} icons={this.state.icons} />
          <WeatherCard location={this.state.newYork} icons={this.state.icons} />
          <WeatherCard location={this.state.tokyo} icons={this.state.icons} />
        </div>
        <Description />
        <Footer />
      </React.Fragment>
    );
  }
}

//===========================CARDSET COMPONENT============================
class WeatherCard extends Component {
  constructor(props) {
    super(props);
    this.toggleCards = this.toggleCards.bind(this);
    this.state = {
      location: this.props.location,
      icons: this.props.icons
    };
  }
  //==========Toggle classes to animate cards=============
  toggleCards() {
    let newState = { ...this.state };
    if (!newState.location.cardShown) {
      newState.location.cardShown = true;
      newState.location.rootClasses = "card root rootUp";
      newState.location.headerClasses = "card header headerDown";
      newState.location.meteorClasses = "meteor";
      newState.location.sunClasses = "sun";
    } else {
      newState.location.cardShown = false;
      newState.location.rootClasses = "card root rootDown";
      newState.location.headerClasses = "card header headerUp";
      newState.location.meteorClasses = "meteor";
      newState.location.sunClasses = "sun";
    }
    this.setState(newState);
  }

  render() {
    return (
      <div
        className="cardSetContainer"
        onClick={this.toggleCards}
        key={this.state.location.name}
      >
        <HeaderCard location={this.state.location} icons={this.state.icons} />
        <RootCard location={this.state.location} icons={this.state.icons} />
      </div>
    );
  }
}

//===========================HEADER COMPONENT============================
class HeaderCard extends Component {
  constructor(props) {
    super(props);
    this.cardAnimation = this.cardAnimation.bind(this);
    this.state = {
      location: this.props.location,
      icons: this.props.icons
    };
  }
  //==========Toggles classes to animate header sunset=============
  cardAnimation() {
    let newState = { ...this.state };
    newState.location.meteorClasses = "meteor meteorShower";
    newState.location.headerClasses = "card header darkenSky";
    newState.location.sunClasses = "sun sunset";
    this.setState(newState);
  }
  render() {
    return (
      <div
        className={this.state.location.headerClasses}
        style={this.state.location.backgroundHeader}
        onMouseEnter={this.cardAnimation}
      >
        <h1>{this.state.location.place} WEATHER</h1>
        <div className="weatherIcon">
          <img
            alt={this.state.location.visibility}
            src={
              this.state.location.name === "Mars"
                ? this.state.icons.Outer
                : this.state.icons[this.state.location.visibility]
            }
          />
        </div>
        <img
          alt=""
          src={this.state.location.foreground}
          className="foreground"
        />
        <img
          alt=""
          src={Meteor1}
          className={this.state.location.meteorClasses}
          id="meteor1"
        />
        <img
          alt=""
          src={Meteor2}
          className={this.state.location.meteorClasses}
          id="meteor2"
        />
        <img
          alt=""
          src={Meteor3}
          className={this.state.location.meteorClasses}
          id="meteor3"
        />
        <img alt="" src={Sun} className={this.state.location.sunClasses} />
      </div>
    );
  }
}

//===========================ROOT COMPONENT============================
class RootCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: this.props.location
    };
  }
  render() {
    return (
      <div
        className={this.state.location.rootClasses}
        style={this.state.location.backgroundRoot}
      >
        <div>
          <p>{this.state.location.name === "Mars" ? "SOL" : "LOCATION"}</p>
          <p>
            {this.state.location.name === "Mars"
              ? this.state.location.sol
              : this.state.location.name}
          </p>
        </div>
        <div>
          <p>MIN °C</p>
          <p>{this.state.location.minC}</p>
        </div>
        <div>
          <p>MAX °C</p>
          <p>{this.state.location.maxC}</p>
        </div>
        <div>
          <p>{this.state.location.name === "Mars" ? "MONTH" : "HUMIDITY"}</p>
          <p>
            {this.state.location.name === "Mars"
              ? this.state.location.month
              : this.state.location.humidity + "%"}
          </p>
        </div>
        <div>
          <p>{this.state.location.name === "Mars" ? "OPACITY" : "WEATHER"}</p>
          <p>
            {this.state.location.name === "Mars"
              ? this.state.location.opacity
              : this.state.location.visibility}
          </p>
        </div>

        <div>
          <p>SUNRISE</p>
          <p>{this.state.location.sunrise}</p>
        </div>
        <div>
          <p>SUNSET</p>
          <p>{this.state.location.sunset}</p>
        </div>
      </div>
    );
  }
}

function Intro() {
  return (
    <div id="introBox">
      <h1>API WEATHER CARDS</h1>
      <p id="intro">
        This widgets use 2 different API weather tools to fetch information. The
        Mars card reflects the information send back by the Curiosity Rover in
        Mars. The rover has 2 boom sensors on its mast in order to gather
        environmental information. Although the rover is intented to send
        information back daily, extreme weather might make it impossible. This
        widget reflects the latest data published by the Centro the
        Astrobiologia (CAB), Spain.
        <br />
        <br />
        The other three widget cards use longitude and latitude points to access
        the openweathermap.org API.
      </p>
    </div>
  );
}

function Description() {
  return (
    <dl id="description">
      <h1>Reading the Mars Weather</h1>
      <dt>◗ Sol</dt>
      <dd>
        The term sol is used to refer to the duration of a day on Mars. A sol is
        about 24 hours and 40 minutes. For Curiosity, sol 0 corresponds with its
        landing day on Mars.
      </dd>
      <dt>◗ Season</dt>
      <dd>
        A Martian year is divided in 12 months, as Earth's. However, Martian
        months are from 46 to 67 sols (Martian days) long. The longest one is
        the month 3 (67 sols), and the shortest one is the month 9 (46 sols)
        Martian months mark seasonal changes. In the southern hemisphere
        (Curiosity rover location) the autumn starts in month 1; the winter in
        month 4; the spring in month 7; and the summer in month 10.
      </dd>
      <dt>◗ Temperature</dt>
      <dd>
        Mars is farther from the Sun than Earth, it makes that Mars is colder
        than our planet. Moreover, Martian atmosphere, which is extremely
        tenuous, does not retain the heat; hence the difference between day and
        night's temperatures is more pronounced than in our planet.
      </dd>
      <dt>◗ Opacity</dt>
      <dd>
        Weather on Mars is more extreme than Earth's. Mars is cooler and with
        bigger differences between day and night temperatures. Moreover, dust
        storms lash its surface. However, Mars' and Earth's climates have
        important similarities, such as the polar ice caps or seasonal changes.
        As on Earth, on Mars we can have sunny, cloudy or windy days, for
        example.
      </dd>
      <dt>◗ Sunset and Sunrise</dt>
      <dd>
        The duration of a Martian day (sol) is about 24 hours and 40 minutes.
        The duration of daylight varies along the Martian year, as on Earth.
      </dd>
    </dl>
  );
}

function Footer() {
  return (
    <footer>
      <p>
        For more information visit{" "}
        <a
          href="https://mars.nasa.gov/msl/mission/instruments/environsensors/rems/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Nasa Rems
        </a>{" "}
        and{" "}
        <a href="http://www.cab.inta.es/es/inicio" target="_blank"  rel="noopener noreferrer">
          Centro de Astrobiologia
        </a>
      </p>
    </footer>
  );
}

export default CardSet;
