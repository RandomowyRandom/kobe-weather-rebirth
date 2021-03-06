class GoogleMaps{
  apiKey: string | undefined;

  constructor(apiKey: string | undefined){
    this.apiKey = apiKey;
  }

  public getIFrameSourceForMap(country: string, region: string, city: string) {
    return `https://www.google.com/maps/embed/v1/search?key=${this.apiKey}=&q=${country}+${region}+${city}`;
  }

  public async getCityInfo(city: string) {
    const endpoint = `https://kgsearch.googleapis.com/v1/entities:search?query=${city}&key=${this.apiKey}&limit=1&indent=True`;
    let res = await fetch(endpoint);
    let data = await res.json();

    return data;
  }
}

export default GoogleMaps;