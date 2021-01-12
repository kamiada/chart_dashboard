import Chart from "chart.js";
import React, { Component } from "react";
import "./components.scss";

class BubbleChart extends Component {
    chartRef = React.createRef();

    render(){
        return(
            <div>
                <canvas id="BubbleChart" ref={this.chartRef} />
            </div>
        )
    }
}
export default BubbleChart;