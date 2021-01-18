import React, { Component, Fragment } from "react";
import "./components.scss";

class Subpage extends Component {
    renderSubpage(){
        return <div className="miniPage">
        Testing
        </div>
    }
    render(){
        return(
            <div>
                <button onClick={this.renderSubpage} className="smallTitle">
                <h2>about.</h2>
                </button>
            </div>
        )
    }
}
export default Subpage;