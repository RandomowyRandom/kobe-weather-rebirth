import { Component } from 'react';
import SearchBar from './components/SearchBar';
import WeatherPanel from './components/WeatherPanel';
import * as apikey from './apikey.json';
import SettingsSwitch from './components/Switch';

import './css/App.css';
import GoogleMaps from './backend/weather/GoogleMaps';
import AccuWeather from './backend/weather/AccuWeather';
import ForecastChart from './components/ForecastChart';
import WeatherHistory from './components/WeatherHistory';

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
  futureForecastMetric: any;
  futureForecastImperial: any;
  useForecast: boolean;
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
      useForecast: true,
      cityInfo: undefined,
      futureForecastMetric: undefined,
      futureForecastImperial: undefined,
    }

    this.weather = new AccuWeather(apikey.accuWeatherKey);
    this.maps = new GoogleMaps(apikey.googleMapsKey);

    this.onCityChosen = this.onCityChosen.bind(this);
    this.renderCityWeatherPanel = this.renderCityWeatherPanel.bind(this);
  }

  private async onCityChosen(locationKey: string, city: any) {
    let conditions = await this.weather.getForecast(locationKey);
    let todayConditionsMetric = await this.weather.getFoecastToday(locationKey, !this.state.useImperial);
    let todayConditionsImperial = await this.weather.getFoecastToday(locationKey, this.state.useImperial);
    let futureForecastMetric = await this.weather.get5DayForecast(locationKey, !this.state.useImperial);
    let futureForecastImperial = await this.weather.get5DayForecast(locationKey, this.state.useImperial);

    this.setState({
      locationKey: locationKey,
      weatherText: conditions[0].WeatherText,
      temperatureC: conditions[0].Temperature.Metric.Value,
      isCityChosen: true,
      currentCityName: city.LocalizedName,
      temperatureF: conditions[0].Temperature.Imperial.Value,
      cityObject: city,
      conditionsTodayMetric: todayConditionsMetric,
      conditionsTodayImperial: todayConditionsImperial,
      futureForecastImperial: futureForecastImperial,
      futureForecastMetric: futureForecastMetric,
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
        />
        {
          this.state.useMap
            ? <iframe title='location-map' width="400" height="300" loading="lazy" src={this.maps.getIFrameSourceForMap(this.state.cityObject.Country.LocalizedName, this.state.cityObject.AdministrativeArea.LocalizedName, this.state.cityObject.LocalizedName)}></iframe>
            : <p></p>
        }
        {
          this.state.useForecast
            ? <ForecastChart 
        useMetric={!this.state.useImperial} 
        dates={this.state.futureForecastMetric.DailyForecasts.map((x: any) => x.Date.slice(0, 10))} 
        metricTemperaturesMin={this.state.futureForecastMetric.DailyForecasts.map((x: any) => x.Temperature.Minimum.Value)}
        imperialTemperaturesMax={this.state.futureForecastImperial.DailyForecasts.map((x: any) => x.Temperature.Maximum.Value)}
        metricTemperaturesMax={this.state.futureForecastMetric.DailyForecasts.map((x: any) => x.Temperature.Maximum.Value)}
        imperialTemperaturesMin={this.state.futureForecastImperial.DailyForecasts.map((x: any) => x.Temperature.Minimum.Value)}/>
            : <p></p>
        }
        <WeatherHistory locationKey={this.state.locationKey} useMetric={!this.state.useImperial}/>
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
            <SettingsSwitch label='Załącz mapę Google' onChange={e => this.setState({useMap: e})} state={this.state.useMap} />
            <SettingsSwitch label='Prognoza temeperatury' onChange={e => this.setState({useForecast: e})} state={this.state.useForecast} />
          </div>
        {this.state.isCityChosen ? this.renderCityWeatherPanel() : <p></p>}
      </div>
    );
  }
}


export default App;
