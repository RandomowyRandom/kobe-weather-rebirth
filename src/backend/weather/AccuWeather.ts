class AcuuWeather {
  private apiKey: string | undefined;

  constructor(apiKey: string | undefined) {
    this.apiKey = apiKey;
    console.log(apiKey);
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

  public async getCityByCoordinates(latitude: number, longitude: number) {
    const endpoint = `http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${this.apiKey}&q=${latitude}%2C${longitude}&language=pl-pl`;
    let res = await fetch(endpoint);
    let data = await res.json();

    return data;
  }

  public async getFoecastToday(locationKey: string, useMetric: boolean) {
    const endpoint = `http://dataservice.accuweather.com/forecasts/v1/daily/1day/${locationKey}?apikey=${this.apiKey}&language=pl-pl&metric=${useMetric}`;
    let res = await fetch(endpoint);
    let data = await res.json();

    console.log('FORT');
    console.log(data);

    return data;
  }
}

export default AcuuWeather;