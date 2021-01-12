import Chart from "chart.js";
import React, { Component } from "react";
import "./components.scss";

class Barchart extends Component {
    componentDidMount() {
        chartRef = React.createRef();
    }

    render() {
        return(
            <div>
                <canvas>

                </canvas>
            </div>
        )
    }
}

export default Barchart;