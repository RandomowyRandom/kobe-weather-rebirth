import { Component } from 'react'

import '../css/InfoCard.css'

interface IProps {
  title: string;
  informations: Array<Array<string>>
}

interface IState {

}

class InfoCard extends Component<IProps, IState> {
  render() {
    return (
      <div className='info-card'>
        <h2 className='info-title'>{this.props.title}</h2>
        <ul className='info-list'>{this.props.informations.map(item => <li className='info-element'>{`${item[0]} ${item[1]}`}</li>)}</ul>
      </div>
    )
  }
}

export default InfoCard