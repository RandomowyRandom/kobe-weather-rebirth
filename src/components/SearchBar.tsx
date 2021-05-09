import { Component, } from 'react'
import { isNumericLiteral } from 'typescript';
import AccuWeather from '../backend/weather/AccuWeather'

import '../css/SearchBar.css';

interface IProps {
  onSearchResultChosen(locationKey: string, city: object): void;
  weatherAPI: AccuWeather;
}

interface IState {
  searchInput: string;
  latInput: number;
  lonInput: number;
  searching: boolean;
  useGeoLocation: boolean;
  searchResult: Array<any>;
  cityChosen: boolean;
}

class SearchBar extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      searchInput: '',
      latInput: 0,
      lonInput: 0,
      searching: false,
      searchResult: [],
      useGeoLocation: false,
      cityChosen: true
    };
    this.onSearch = this.onSearch.bind(this);
    this.onCityChosen = this.onCityChosen.bind(this);
  }

  private async onSearch() {
    this.setState({ searching: true, cityChosen: false})

    if (this.state.useGeoLocation) {
      this.props.weatherAPI.getCityByCoordinates(this.state.latInput, this.state.lonInput)
        .then(res => {
          this.setState({ searchResult: [res], searching: false})
        }).catch(err => {
          console.log(err);
          this.setState({ searching: false})
        })
    }
    else {      
      this.props.weatherAPI.getCitiesBySearch(this.state.searchInput)
        .then(res => {
          console.log(res);
          this.setState({ searchResult: res, searching: false})
        }).catch(err => {
          console.log(err);
          this.setState({ searching: false });
        });
    }
  }

  private onCityChosen(locaitonKey: string, city: any) {
    this.setState({ searchResult: [], cityChosen: true})
    this.props.onSearchResultChosen(locaitonKey, city);
  }

  private renderSearchResults() {
    if (this.state.searching) {
      return 'Szukanie...'
    }
    else if ((this.state.searchResult[0] === null || this.state.searchResult === null || this.state.searchResult.length === 0) && !this.state.cityChosen){
      return 'Brak wyników!'
    }
    else {
      return this.state.searchResult.map(item => <li className='search-result' key={item.Key} onClick={() => { this.onCityChosen(item.Key, item) }}>{`${item.LocalizedName} ${item.AdministrativeArea.LocalizedName} - ${item.Country.LocalizedName}`}</li>);
    }
  }

  render() {
    return (
      <div className='search-bar'>
        <input className='city-input' onClick={event => this.setState({useGeoLocation: false})} onChange={event => this.setState({ searchInput: event.target.value })} type='text' placeholder='Podaj nazwę miasta...' />
        <p>lub</p>
        <input className='geo-input' onClick={event => this.setState({ useGeoLocation: true }) } onChange={event => !isNaN(+event.target.value) ? this.setState({ latInput: parseFloat(event.target.value) }) : {} } type='text' placeholder='Szerokość (np. -35.308)' />
        <input className='geo-input' onClick={event => this.setState({ useGeoLocation: true })} onChange={event => !isNaN(+event.target.value) ? this.setState({ lonInput: parseFloat(event.target.value) }) : {} } type='text' placeholder='Długość (np. 149.124)' />
        <button onClick={this.onSearch}>Szukaj</button>
        <ul>{ this.renderSearchResults() }</ul>
      </div>
    )
  }
}

export default SearchBar;