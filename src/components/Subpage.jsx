import React, { Component, Fragment } from "react";
import "./subpage.scss";

class Subpage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            itsActive: false,
        }
        this.derenderSubpagelta = this.renderSubpage.bind(this);
    }

    renderSubpage = () => {
        this.setState({
            itsActive: true,
        });
    }
  render() {
    return (
      <div>
        <button onClick={this.renderSubpage} className="smallTitle">
          <h2>about.</h2>
        </button>
        <Fragment>
        <div className={this.state.itsActive ? 'miniPage--active': 'miniPage'} >
            <p>The purpose of this page is to present in graph data regarding COVID-19 in U.K, specifically Scotland</p>
        </div>
      </Fragment>
      </div>
    );
  }
}
export default Subpage;
