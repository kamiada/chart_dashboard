import Chart from "chart.js";
import React, { Component } from "react";
import "./components.scss";

const popData = {
    datasets: [{
      label: ['Deer Population'],
      data: [{
        x: 100,
        y: 0,
        r: 10
      }, {
        x: 60,
        y: 30,
        r: 20
      }, {
        x: 40,
        y: 60,
        r: 25
      }, {
        x: 80,
        y: 80,
        r: 50
      }, {
        x: 20,
        y: 30,
        r: 25
      }, {
        x: 0,
        y: 100,
        r: 5
      }],
      backgroundColor: "#FF9966"
    }]
  };
class BubbleChart extends Component {
    chartRef = React.createRef();
    componentDidMount() {
        const myChartRef = this.chartRef.current.getContext("2d");
        new Chart(myChartRef, {
            type: "bubble",
            data: popData
        });
    }
    render(){
        return(
            <div className="item">
                <canvas id="BubbleChart" ref={this.chartRef} />
            </div>
        )
    }
}
export default BubbleChart;