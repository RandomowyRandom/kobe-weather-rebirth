import React from 'react'
import InfoCard from './InfoCard'

import '../css/WeatherPanel.css'

interface IProps {
  forecast: string
  tempC: number
  tempF: number;
  city: string;
}

interface IState {

}

class WeatherPanel extends React.Component<IProps, IState> {
  render() {
    return (
      <div>
        <InfoCard title='Pogoda' informations={[['Obecna pogoda: ', this.props.forecast]]}></InfoCard>
        <InfoCard title='Temperatura' informations={[['System metryczny: ', this.props.tempC.toString() + " °C"], ['System imperialny: ', this.props.tempF.toString() + " °F"]]}></InfoCard>
        <InfoCard title='Miasto' informations={[['Miasto: ', this.props.city]]}></InfoCard>
      </div>
    );
  }
}

export default WeatherPanel;