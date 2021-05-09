import { Component } from 'react';
import AccuWeather from './backend/weather/AccuWeather';
import SearchBar from './components/SearchBar';
import WeatherPanel from './components/WeatherPanel';
import * as apikey from './apikey.json'

import './css/App.css'
import GoogleMaps from './backend/weather/GoogleMaps';

interface IProps {

}

interface IState {
  locationKey: string;
  weatherText: string;
  temperatureC: number;
  temperatureF: number;
  isCityChosen: boolean;
  currentCityName: string;
  cityObject: any;
}

class App extends Component<IProps, IState> {

  weather: AccuWeather;
  maps: GoogleMaps;

  constructor(props: IProps) {
    super(props);
    this.state = {
      locationKey: "",
      weatherText: "",
      temperatureC: 0,
      temperatureF: 0,
      isCityChosen: false,
      currentCityName: "",
      cityObject: undefined
    }

    this.weather = new AccuWeather(apikey.accuWeatherKey);
    this.maps = new GoogleMaps(apikey.googleMapsKey);

    this.onCityChosen = this.onCityChosen.bind(this);
    this.renderCityWeatherPanel = this.renderCityWeatherPanel.bind(this);
  }

  private async onCityChosen(locationKey: string, city: any) {
    let conditions = await this.weather.getForecast(locationKey);
    console.log(conditions);
    this.setState({ locationKey: locationKey, weatherText: conditions[0].WeatherText, temperatureC: conditions[0].Temperature.Metric.Value, isCityChosen: true, currentCityName: city.LocalizedName, temperatureF: conditions[0].Temperature.Imperial.Value, cityObject: city });
  }

  private renderCityWeatherPanel() {
    return (
      <div>
        <WeatherPanel cityObject={this.state.cityObject} forecast={this.state.weatherText} tempC={this.state.temperatureC} tempF={this.state.temperatureF} city={this.state.currentCityName} />
        <iframe title='location-map' width="400" height="300" loading="lazy" src={ this.maps.getIFrameSourceForMap(this.state.cityObject.Country.LocalizedName, this.state.cityObject.AdministrativeArea.LocalizedName, this.state.cityObject.LocalizedName) }></iframe>
      </div>
    );
  }

  render() {
    return (
      <div>
        <h1>Kobe weather: Rebirth</h1>
        <SearchBar weatherAPI={this.weather} onSearchResultChosen={this.onCityChosen} />
        {this.state.isCityChosen ? this.renderCityWeatherPanel() : <p></p>}
      </div>
    );
  }
}


export default App;
