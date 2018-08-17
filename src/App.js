import React, { Component } from 'react';
import Drizzle from './images/drizzle.svg';
import Rain from './images/rain.svg';
import Snow from './images/snows.svg';
import Atmosphere from './images/wind.svg';
import Clear from './images/sunny.svg';
import Clouds from './images/cloudy.svg';
import Extreme from './images/storm.svg';
import Haze from './images/haze.svg';
import Thunderstorm from './images/storms.svg';
import Outer from './images/astronaut.svg';
import Satellite from './images/satellite1.png';
import Lake from './images/lake.png';
import NewYork from './images/new-york-city.png';
import Tokyo from './images/tokyo-city.png';
import MarsMountains from './images/mars-mountains.png';
import Meteor1 from './images/meteor1.svg';
import Meteor2 from './images/meteor2.svg';
import Meteor3 from './images/meteor3.svg';
import Sun from './images/sun.svg';

import './App.css';

const icons = {
  Drizzle: Drizzle,
  Rain: Rain,
  Snow: Snow,
  Atmosphere: Atmosphere,
  Clear: Clear,
  Clouds: Clouds,
  Extreme: Extreme,
  Thunderstorm: Thunderstorm,
  Outer: Outer,
  Haze: Haze
}




// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={Drizzle} className="App-logo" alt="logo" />
//           <h1 className="App-title">Welcome to React</h1>
//         </header>
//         <p className="App-intro">
//           To get started, edit <code>src/App.js</code> and save to reload.
//         </p>
//       </div>
//     );
//   }
// }

//==============================================================================================================

//====================PARENT COMPONENT======================
class CardSet extends Component {
  constructor(props){
    super(props);
    this.state = {
      local: {
        place: 'LOCAL',
        name: '--',
        maxC: '--',
        minC: '--',
        sunset: '--',
        sunrise: '--',
        visibility: '--',
        humidity: '--',
        cardShown: false,
        rootClasses: 'card root',
        headerClasses: 'card header',
        meteorClasses: 'meteor',
        sunClasses: 'sun',
        backgroundHeader: {
          backgroundImage: 'linear-gradient(180deg, rgb(49, 89, 123), rgb(49, 46, 107))',
          backgroundSize: '400% 400%'
        },
        backgroundRoot: {backgroundImage: `url(${Satellite}), linear-gradient(180deg, rgb(49, 89, 123), rgb(49, 46, 107))`},
        foreground: Lake
      },
      newYork: {
        place: 'NEW YORK',
        name: '--',
        maxC: '--',
        minC: '--',
        sunset: '--',
        sunrise: '--',
        visibility: '--',
        humidity: '--',
        cardShown: false,
        rootClasses: 'card root',
        headerClasses: 'card header',
        meteorClasses: 'meteor',
        sunClasses: 'sun',
        backgroundHeader: {
          backgroundImage: 'linear-gradient(rgb(102, 105, 116),rgb(55, 59, 68))',
          backgroundSize: '400% 400%'
        },
        backgroundRoot: {backgroundImage: `url(${Satellite}), linear-gradient(rgb(102, 105, 116),rgb(55, 59, 68))`},
        foreground: NewYork
      },
      tokyo: {
        place: 'TOKYO',
        name: '--',
        maxC: '--',
        minC: '--',
        sunset: '--',
        sunrise: '--',
        visibility: '--',
        humidity: '--',
        cardShown: false,
        rootClasses: 'card root',
        headerClasses: 'card header',
        meteorClasses: 'meteor',
        sunClasses: 'sun',
        backgroundHeader: {
          backgroundImage: 'linear-gradient(rgb(195, 179, 145),rgb(65, 16, 16))',
          backgroundSize: '400% 400%'
        },
        backgroundRoot: {backgroundImage: `url(${Satellite}), linear-gradient(rgb(195, 179, 145),rgb(65, 16, 16))`},
        foreground: Tokyo
      },
      mars: {
        place: 'MARS',
        name: 'Mars',
        sol: '--',
        month: '--',
        maxC: '--',
        minC: '--',
        opacity: '--',
        sunset: '--',
        sunrise: '--',
        cardShown: false,
        rootClasses: 'card root',
        headerClasses: 'card header',
        meteorClasses: 'meteor',
        sunClasses: 'sun',
        backgroundHeader: {
          backgroundImage: 'linear-gradient(rgb(137, 43, 43),rgb(0, 44, 48))',
          backgroundSize: '400% 400%'
        },
        backgroundRoot: {backgroundImage: `url(${Satellite}), linear-gradient(rgb(137, 43, 43),rgb(0, 44, 48))`},
        foreground: MarsMountains
      } 
    }
    this.marsAPICall = this.marsAPICall.bind(this);
    this.weatherCall = this.weatherCall.bind(this);
    this.onLoadAPICalls = this.onLoadAPICalls.bind(this);
  }
//==========Mars API call=============
  marsAPICall(){
    fetch('https://api.maas2.jiinxt.com/')
        .then(function(response) {
          if(response.ok){
            return response.json();
          };
        })
        .then(function(data) {
          let newState = {...this.state};
          newState.mars.sol = String(data.sol);
          newState.mars.month = data.season.split(' ')[1];
          newState.mars.maxC = `${data.max_temp}\xB0`;
          newState.mars.minC = `${data.min_temp}\xB0`;
          newState.mars.opacity = data.atmo_opacity;
          newState.mars.sunset = data.sunset;
          newState.mars.sunrise = data.sunrise;
          this.setState(newState);
        }.bind(this))
  }
  //==========Weather API call=============
  weatherCall(lat,lon,location){
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=04404d9c365d16b696cd5e74c310b080`;
    fetch(url)
      .then(function(response) {
        return response.ok ? response.json() : console.log('No data received');
      })
      .then(function(data) {
        let newState = {...this.state};
        newState[location].humidity = data.main.humidity;
        newState[location].maxC = Math.round((data.main.temp_max-32)*(5/9)) +`\xB0`;
        newState[location].minC = Math.round((data.main.temp_min-32)*(5/9)) + `\xB0`; 
        newState[location].name = data.name;
        newState[location].visibility = data.weather[0].main;
        newState[location].sunrise = this.timeChange(data.sys.sunrise);
        newState[location].sunset = this.timeChange(data.sys.sunset);
        this.setState(newState);
      }.bind(this))
  }
//==========On Load API calls=============
  onLoadAPICalls(){
    this.marsAPICall();
    this.weatherCall('35.658581','139.745438','tokyo');
    this.weatherCall('40.758896','-73.985130','newYork');
    if (navigator.geolocation){
      navigator.geolocation.getCurrentPosition(function(position){
        this.weatherCall(position.coords.latitude, position.coords.longitude, 'local');
      }.bind(this));
    }
  }
//==========Seconds to hh:mm converter=============
  timeChange(sec){
    let hhmm = sec % 86400;
    let hours = Math.floor(hhmm / 3600) <=9 ? '0' + Math.floor(hhmm / 3600) : Math.floor(hhmm / 3600);
    let minutes = Math.floor((hhmm % 3600)/60) <= 9 ? '0' + Math.floor((hhmm % 3600)/60) : Math.floor((hhmm % 3600)/60);
    return hours + ':' + minutes; 
  }


  render(){
    return (
      <div onLoad={this.onLoadAPICalls}>
        <WeatherCard location={this.state.mars} />
        <WeatherCard location={this.state.local} />
        <WeatherCard location={this.state.newYork} />
        <WeatherCard location={this.state.tokyo} />
      </div>
    )
  }

}

//===========================CARDSET COMPONENT============================
class WeatherCard extends Component{
  constructor(props){
    super(props);
    this.toggleCards = this.toggleCards.bind(this);
    this.state = {
      location: this.props.location
    }
  }
//==========Toggle classes to animate cards=============
  toggleCards(){
    let newState = {...this.state};
    if(!newState.location.cardShown){
      newState.location.cardShown = true;
      newState.location.rootClasses = 'card root rootUp';
      newState.location.headerClasses = 'card header headerDown';
      newState.location.meteorClasses = 'meteor';
      newState.location.sunClasses = 'sun';
    }else{
      newState.location.cardShown = false;
      newState.location.rootClasses = 'card root rootDown';
      newState.location.headerClasses = 'card header headerUp';
      newState.location.meteorClasses = 'meteor';
      newState.location.sunClasses = 'sun';
    }
    this.setState(newState);
  }

  render(){
    return (
      <div className='cardSetContainer' onClick={this.toggleCards} key={this.state.location.name}>
        <HeaderCard location={this.state.location} />
        <RootCard location={this.state.location} />
      </div>
    )
  }
}

//===========================HEADER COMPONENT============================
class HeaderCard extends Component{
  constructor(props){
    super(props);
    this.cardAnimation = this.cardAnimation.bind(this);
    this.state = {
      location: this.props.location
    }
  }
  //==========Toggles classes to animate header sunset=============
  cardAnimation(){
    let newState = {...this.state};
    newState.location.meteorClasses = 'meteor meteorShower';
    newState.location.headerClasses = 'card header darkenSky';
    newState.location.sunClasses = 'sun sunset';
    this.setState(newState);
  }
  render(){
    return (
      <div className={this.state.location.headerClasses} style={this.state.location.backgroundHeader} onMouseEnter={this.cardAnimation}>
          <h1>{this.state.location.place} WEATHER</h1>
          <div className='weatherIcon'><img alt={this.state.location.visibility} src={this.state.location.name === 'Mars' ? icons.Outer : icons[this.state.location.visibility]}/></div>
          <img alt='' src={this.state.location.foreground} className='foreground'/>
          <img alt='' src={Meteor1} className={this.state.location.meteorClasses} id="meteor1" />
          <img alt='' src={Meteor2} className={this.state.location.meteorClasses} id="meteor2" />
          <img alt='' src={Meteor3} className={this.state.location.meteorClasses} id="meteor3" /> 
          <img alt='' src={Sun} className={this.state.location.sunClasses}/>
          
      </div>
    )
  }
}



//===========================ROOT COMPONENT============================
class RootCard extends Component{
  constructor(props){
    super(props);
    this.state = {
      location: this.props.location
    }
  }
  render(){
    return (
      <div className={this.state.location.rootClasses} style={this.state.location.backgroundRoot}>
      <div>
        <p>{this.state.location.name === 'Mars' ? 'SOL' : 'LOCATION'}</p>
        <p>{this.state.location.name === 'Mars' ? this.state.location.sol : this.state.location.name}</p>
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
        <p>{this.state.location.name === 'Mars' ? 'MONTH' : 'HUMIDITY'}</p>
        <p>{this.state.location.name === 'Mars' ? this.state.location.month : this.state.location.humidity + '%'}</p>
      </div>
      <div>
        <p>{this.state.location.name === 'Mars' ? 'OPACITY' : 'WEATHER'}</p>
        <p>{this.state.location.name === 'Mars' ? this.state.location.opacity : this.state.location.visibility}</p>
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


export default CardSet;