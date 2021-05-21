import { Component } from 'react';
import { Line } from 'react-chartjs-2';
import { ChartData } from 'chart.js';


interface IProps{
    metricTemperaturesMin: Array<number>;
    imperialTemperaturesMax: Array<number>;
    metricTemperaturesMax: Array<number>;
    imperialTemperaturesMin: Array<number>;
    dates: Array<string>;
    useMetric: boolean;
}

interface IState{

}

class ForecastChart extends Component<IProps, IState> {

    private round(value : number, precision : number) {
        var multiplier = Math.pow(10, precision || 0);
        return Math.round(value * multiplier) / multiplier;
    }

    private getAverageTemp(firstArray: Array<number>, secondArray: Array<number>){

        const res : Array<number> = new Array<number>(5);

        for (let i = 0; i < firstArray.length; i++) {
            const firstElement = firstArray[i];
            const secondElement = secondArray[i];
            
            res[i] = this.round((firstElement+secondElement) / 2, 1);
        }

        return res;
    }

    render(){

        let data : ChartData = {
            labels: this.props.dates,
            datasets: [
              {
                label: this.props.useMetric ? 'Srednia Temperatura °C' : 'Srednia Temperatura °F',
                data: this.props.useMetric ? this.getAverageTemp(this.props.metricTemperaturesMin, this.props.metricTemperaturesMax) : this.getAverageTemp(this.props.imperialTemperaturesMin, this.props.imperialTemperaturesMax),
                fill: false,
                backgroundColor: '#a862ea',
                borderColor: '#a862ea',
              },
              {
                label: this.props.useMetric ? 'Minimalna Temperatura °C' : 'Minimalna Temperatura °F',
                data: this.props.useMetric ? this.props.metricTemperaturesMin : this.props.imperialTemperaturesMin,
                fill: false,
                backgroundColor: '#6383ea',
                borderColor: '#6383ea',
              },
              {
                label: this.props.useMetric ? 'Maksymalna Temperatura °C' : 'Maksymalna Temperatura °F',
                data: this.props.useMetric ? this.props.metricTemperaturesMax : this.props.imperialTemperaturesMax,
                fill: false,
                backgroundColor: '#6545a4',
                borderColor: '#6545a4',
              },
            ],
          };

        return(
            <div>
                <Line type={Line} data={data} width={5} height={1}/>
            </div>
        )
    }
}

export default ForecastChart;