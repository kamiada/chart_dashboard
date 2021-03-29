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
        labels: this.props.labels,
        datasets: this.props.inputData.length ? this.props.inputData.map(value => 
          [
            {
              barPercentage: 0.5,
              barThickness: 6,
              maxBarThickness: 8,
              minBarLength: 2,
              //string
              label: value.label,
              //data: [{x:'2016-12-25', y:20}, {x:'2016-12-26', y:10}]
              data: value.data,
              backgroundColor: [
                "#3e95cd",
                "#8e5ea2"
              ],
            },
          ]
        )
      : ''},
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
