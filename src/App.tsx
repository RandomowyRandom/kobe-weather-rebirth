import { Component } from 'react';
import AccuWeather from './backend/weather/AccuWeather';
import SearchBar from './components/SearchBar';
import WeatherPanel from './components/WeatherPanel';
//import * as apikey from './apikey.json'
import SettingsSwitch from './components/Switch'

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
  conditionsTodayMetric: any,
  conditionsTodayImperial: any
  useImperial: boolean;
  useMap: boolean;
  cityInfo: any;
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
      cityObject: undefined,
      conditionsTodayMetric: undefined,
      conditionsTodayImperial: undefined,
      useImperial: false,
      useMap: true,
      cityInfo: undefined
    }

    this.weather = new AccuWeather(process.env.ACCUAPI);
    this.maps = new GoogleMaps(process.env.GOOGLEAPI);

    this.onCityChosen = this.onCityChosen.bind(this);
    this.renderCityWeatherPanel = this.renderCityWeatherPanel.bind(this);
  }

  private async onCityChosen(locationKey: string, city: any) {
    let conditions = await this.weather.getForecast(locationKey);
    let todayConditionsMetric = await this.weather.getFoecastToday(locationKey, !this.state.useImperial);
    let todayConditionsImperial = await this.weather.getFoecastToday(locationKey, this.state.useImperial);
    //let cityInfo = await this.maps.getCityInfo(`${city.LocalizedName}`)

    console.log(conditions);
    this.setState({
      locationKey: locationKey,
      weatherText: conditions[0].WeatherText,
      temperatureC: conditions[0].Temperature.Metric.Value,
      isCityChosen: true,
      currentCityName: city.LocalizedName,
      temperatureF: conditions[0].Temperature.Imperial.Value,
      cityObject: city,
      conditionsTodayMetric: todayConditionsMetric,
      conditionsTodayImperial: todayConditionsImperial
      //cityInfo: cityInfo
    });
  }

  private renderCityWeatherPanel() {
    return (
      <div>
        <WeatherPanel
          tempMinC={this.state.conditionsTodayMetric.DailyForecasts[0].Temperature.Minimum.Value}
          tempMaxC={this.state.conditionsTodayMetric.DailyForecasts[0].Temperature.Maximum.Value}
          tempMinF={this.state.conditionsTodayImperial.DailyForecasts[0].Temperature.Minimum.Value}
          tempMaxF={this.state.conditionsTodayImperial.DailyForecasts[0].Temperature.Maximum.Value}
          useImperial={this.state.useImperial}
          cityObject={this.state.cityObject}
          forecast={this.state.weatherText}
          tempC={this.state.temperatureC}
          tempF={this.state.temperatureF}
          city={this.state.currentCityName}
        //cityInfo={this.state.cityInfo.itemListElement[0].result.detailedDescription.articleBody}
        />
        {
          this.state.useMap
            ? <iframe title='location-map' width="400" height="300" loading="lazy" src={this.maps.getIFrameSourceForMap(this.state.cityObject.Country.LocalizedName, this.state.cityObject.AdministrativeArea.LocalizedName, this.state.cityObject.LocalizedName)}></iframe>
            : <p></p>
        }
      </div>
    );
  }

  render() {
    return (
      <div>
        <h1>Kobe weather: Rebirth</h1>
        <SearchBar weatherAPI={this.weather} onSearchResultChosen={this.onCityChosen} />
        <div className='settings'>
            <SettingsSwitch label='Używaj systemu imperialnego' onChange={e => this.setState({ useImperial: e })} state={this.state.useImperial} />
            <SettingsSwitch label='Załącz mapę Google' onChange={e => this.setState({useMap: e})} state={this.state.useMap}/>          
          </div>
        {this.state.isCityChosen ? this.renderCityWeatherPanel() : <p></p>}
      </div>
    );
  }
}


export default App;
