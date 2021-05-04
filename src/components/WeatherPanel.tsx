import React from 'react'

import '../css/WeatherPanel.css'

interface IProps {
  forecast: string
  temp: number
  city: string;
}

interface IState {

}

class WeatherPanel extends React.Component<IProps, IState> {
  render() {
    return (
      <div className='weather-panel'>
        <p>{this.props.forecast}</p>
        <p>Temperatura: {this.props.temp}°C</p>
        <p>Miasto: {this.props.city}</p>
      </div>
    );
  }
}

export default WeatherPanel;