import React from 'react'
import InfoCard from './InfoCard'

import '../css/WeatherPanel.css'

interface IProps {
  forecast: string
  tempC: number
  tempF: number;
  city: string;
  cityObject: any;
}

interface IState {

}

class WeatherPanel extends React.Component<IProps, IState> {
  render() {
    return (
      <div>
        <InfoCard title='Pogoda' informations={[['Obecna pogoda: ', this.props.forecast]]}></InfoCard>
        <InfoCard title='Temperatura' informations={[['System metryczny: ', this.props.tempC.toString() + " °C"], ['System imperialny: ', this.props.tempF.toString() + " °F"]]}></InfoCard>
        <InfoCard title='Miasto' informations={[['Nazwa miasta: ', this.props.city], ['Region: ', this.props.cityObject.AdministrativeArea.LocalizedName], ['Kraj: ', `${this.props.cityObject.Country.LocalizedName} (${this.props.cityObject.Country.ID})`]]}></InfoCard>
        <InfoCard title='Położenie geograficzne' informations={ [['Szerokość geograficzna: ', this.props.cityObject.GeoPosition.Latitude], ['Długość geograficzna: ', this.props.cityObject.GeoPosition.Longitude]] }></InfoCard>
      </div>
    );
  }
}

export default WeatherPanel;