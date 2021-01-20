import React, { Component, Fragment } from "react";
import "./subpage.scss";
import Cross from "./cross.svg";

class Subpage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            itsActive: false,
        }
        this.derenderSubpagelta = this.renderSubpage.bind(this);
        this.closeSubpage = this.closeSubpage.bind(this);
    }
    renderSubpage = () => {
        this.setState({
            itsActive: true,
        });
    }
    closeSubpage = () => {
      this.setState({
        itsActive: false,
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
            <button onClick={this.closeSubpage} className="btnClose">
            <img className="image" src={Cross} alt="Cross by Aybige from the Noun Project" />
            </button>
        </div>
      </Fragment>
      </div>
    );
  }
}
export default Subpage;
