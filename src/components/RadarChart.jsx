import Chart from "chart.js";
import React, { Component } from "react";
import "./components.scss";

class RadarChart extends Component {
    chartRef = React.createRef();
    render(){
        return(
            <div>
                <canvas id='RadarChart' ref={this.chartRef} />
            </div>
        )
    }
}
export default RadarChart;