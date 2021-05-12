import { Component } from 'react'
import Switch from 'react-switch';

import '../css/Switch.css';

interface IProps{
  label: string;
  state: boolean;
  onChange(state: boolean): void;
}

interface IState{
  
}

class SettingsSwitch extends Component<IProps, IState>{
  render() {
    return (
      <div>
        <p>{this.props.label}</p>
        <Switch onChange={this.props.onChange} checked={ this.props.state } offColor='#6545a4' onColor='#bf62ea'/>
      </div>
    )
  }
}

export default SettingsSwitch