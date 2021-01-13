import Chart from "chart.js";
import React, { Component } from "react";
import "./components.scss";

class RadarChart extends Component {
    chartRef = React.createRef();
    componentDidMount() {
        const myChartRef = this.chartRef.current.getContext("2d");
        new Chart(myChartRef, {
            type: "radar",
            data: {
                labels: ['Running', 'Swimming', 'Eating', 'Cycling'],
                datasets: [{
                    data: [20, 10, 4, 2]
                }]
            },
            options: {
                scale: {
                    angleLines: {
                        display: false
                    },
                    ticks: {
                        suggestedMin: 50,
                        suggestedMax: 100
                    }
                }
            }
        });
    }
    render(){
        return(
            <div className="item">
                <canvas id='RadarChart' ref={this.chartRef} />
            </div>
        )
    }
}
export default RadarChart;