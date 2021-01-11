import Chart from "chart.js";
import React, { Component } from "react";
import "./components.scss";
class Doughnut extends Component {

    chartRef = React.createRef();
    
    componentDidMount() {
        const myChartRef = this.chartRef.current.getContext("2d");
        new Chart(myChartRef, {
            type: 'doughnut',
            data: {
              labels: ["test", "water", "food", "burger"],
              datasets: [{
                  backgroundColor: '#9C8ADE',
                  borderWidth: 0,
                  data: [1, 2, 4, 6],
              }]
            },
            options: { 
              legend: {
                display: false,
              },
              cutoutPercentage: 80,
              aspectRatio: 1,
              maintainAspectRatio: true,
              responsive: false,
        }
        });
    }
    render() {
        return (
            <div>
                <canvas
                    id="myChart"
                    ref={this.chartRef}
                />
            </div>
        )
    }
}
export default Doughnut;
