import { ChartData } from 'chart.js';
import { Component } from 'react';
import { Line } from 'react-chartjs-2';
import { LinkedList } from 'typescript-collections';

import * as weatherHistory from '../weather_history.json';

interface IProps{
    locationKey : string;
    useMetric: boolean;
}

interface IState{

}

class WeatherHistory extends Component<IProps, IState>{

    private getHistory(locationKey : string){
        let history : LinkedList<any> = new LinkedList<any>();

        weatherHistory.data.forEach(e =>{
            if(e.locationKey === locationKey){
                history.add(e);
            }
        })

        return history.toArray();
    }

    render(){
        const history = this.getHistory(this.props.locationKey);

        if (history.length === 0) return null;

        const data : ChartData = {
            labels: history.map((e : any) => e.date),
            datasets: [
                {
                    label: this.props.useMetric ? 'Temperatura °C' : 'Temperatura °F',
                    data: this.props.useMetric ? history.map((e : any) => e.metricTemp) : history.map((e : any) => e.imperialTemp),
                    fill : false,
                    backgroundColor: '#465ca4',
                    borderColor: '#465ca4',
                }
            ]
        }

        return(
            <div>
                <h2>Historia pogody</h2>
                <Line type={Line} data={data} width={5} height={1}/>
            </div>
        )
    }
}

export default WeatherHistory;