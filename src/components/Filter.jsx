//takes in two props and displays them, in App props are supplied to filter, state checks in App picks which one
// was picked by the user

import React, { Component } from 'react';
import './components.scss';
class Filter extends Component {
    render(){
        return (
            <div>
                <h2>{this.props.filter}</h2>

            </div>
        )
    }
}
export default Filter;