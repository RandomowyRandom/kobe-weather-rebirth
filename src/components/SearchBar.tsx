import { Component, } from 'react'
import AccuWeather from '../backend/weather/AccuWeather'

import '../css/SearchBar.css';

interface IProps {
  onSearchResultChosen(locationKey: string, city: object): void;
  weatherAPI: AccuWeather;
}

interface IState {
  searchInput: string;
  searching: boolean;
  searchResult: Array<any>;
}

class SearchBar extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      searchInput: '',
      searching: false,
      searchResult: []
    };
    this.onSearch = this.onSearch.bind(this);
    this.onCityChosen = this.onCityChosen.bind(this);
  }

  private async onSearch() {
    this.setState({ searching: true })
    this.props.weatherAPI.getCitiesBySearch(this.state.searchInput)
      .then(res => {
        console.log(res);
        this.setState({ searchResult: res })
        this.setState({ searching: false });
      }).catch(err => {
        console.log(err);
        this.setState({ searching: false });
      });
  }

  private onCityChosen(locaitonKey: string, city: any) {
    this.setState({ searchResult: [] })
    this.props.onSearchResultChosen(locaitonKey, city);
  }

  render() {
    return (
      <div className='search-bar'>
        <input onChange={event => this.setState({ searchInput: event.target.value })} type='text' placeholder='Podaj nazwę miasta...' />
        <button onClick={this.onSearch}>Szukaj</button>
        <ul>{this.state.searching ? "Szukanie..." : this.state.searchResult.map(item => <li key={item.Key} onClick={() => { this.onCityChosen(item.Key, item) }}>{`${item.LocalizedName} ${item.AdministrativeArea.LocalizedName} - ${item.Country.LocalizedName}`}</li>)}</ul>
      </div>
    )
  }
}

export default SearchBar;