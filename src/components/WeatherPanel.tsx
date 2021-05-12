import React from 'react'
import InfoCard from './InfoCard'

import '../css/WeatherPanel.css'

interface IProps {
  forecast: string
  tempC: number
  tempF: number;
  tempMinC: number,
  tempMaxC: number,
  tempMinF: number,
  tempMaxF: number,
  city: string;
  cityObject: any;
  useImperial: boolean;
  cityInfo?: string;
}

interface IState {

}

class WeatherPanel extends React.Component<IProps, IState> {

  private getTemperatureCard(imperial: boolean) {
    if (imperial)
      return <InfoCard title='Temperatura (°F)' informations={[['Obecna temperatura: ', this.props.tempF.toString() + " °F"], ['Najwyższa temperatura: ', this.props.tempMaxF + '°F'], ['Najniższa temperatura: ', this.props.tempMinF + '°F']]}></InfoCard>
    else
      return <InfoCard title='Temperatura (°C)' informations={[['Obecna temperatura: ', this.props.tempC.toString() + " °C"], ['Najwyższa temperatura: ', this.props.tempMaxC + '°C'], ['Najniższa temperatura: ', this.props.tempMinC + '°C']]}></InfoCard>
  }

  render() {
    return (
      <div>
        <InfoCard title='Pogoda' informations={[['Obecna pogoda: ', this.props.forecast]]}></InfoCard>
        { this.getTemperatureCard(this.props.useImperial) }
        <InfoCard title='Miasto' informations={[['Nazwa miasta: ', this.props.city], ['Region: ', this.props.cityObject.AdministrativeArea.LocalizedName], ['Kraj: ', `${this.props.cityObject.Country.LocalizedName} (${this.props.cityObject.Country.ID})`]]}></InfoCard>
        <InfoCard title='Położenie geograficzne' informations={[['Szerokość geograficzna: ', this.props.cityObject.GeoPosition.Latitude], ['Długość geograficzna: ', this.props.cityObject.GeoPosition.Longitude]]}></InfoCard>
      </div>
    );
  }
}

export default WeatherPanel;