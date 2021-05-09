class GoogleMaps{
  apiKey: string;

  constructor(apiKey: string){
    this.apiKey = apiKey;
  }

  public getIFrameSourceForMap(country: string, region: string, city: string) {
    return `https://www.google.com/maps/embed/v1/search?key=${this.apiKey}=&q=${country}+${region}+${city}`;
  }
}

export default GoogleMaps;