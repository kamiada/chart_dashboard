import Chart from "chart.js";
import React, { Component } from "react";
import "./components.scss";

class Barchart extends Component {
  chartRef = React.createRef();

  componentDidMount() {
    const myChartRef = this.chartRef.current.getContext("2d"); 
    new Chart(myChartRef, {
      type: "bar",
      data: {
        labels: ["Italian", "French", "Polish", "Suahili"],
        datasets: [
          {
            barPercentage: 0.5,
            barThickness: 6,
            maxBarThickness: 8,
            minBarLength: 2,
            data: [2, 5, 6, 19, 5],
          },
        ],
      },
      options: {
        scales: {
          xAxes: [
            {
              gridLines: {
                offsetGridLines: true,
              },
            },
          ],
        },
      },
    });
  }

  render() {
    return (
      <div className="item">
        <canvas id="myChart2" ref={this.chartRef}></canvas>
      </div>
    );
  }
}

export default Barchart;
