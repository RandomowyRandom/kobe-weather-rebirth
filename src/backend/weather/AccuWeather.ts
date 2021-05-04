

class AcuuWeather {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  public async getCitiesBySearch(cityName: string) {
    const endpoint = `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${this.apiKey}&q=${cityName}&language=pl-pl`;
    let res = await fetch(endpoint);
    let data = await res.json();

    return data;
  }

  public async getForecast(locationKey: string) {
    const endpoint = `http://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${this.apiKey}&language=pl-pl`;
    let res = await fetch(endpoint);
    let data = await res.json();

    return data;
  }
}

export default AcuuWeather;