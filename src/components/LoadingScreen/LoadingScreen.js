import React, { Component } from 'react';
import './LoadingScreen.scss';

export default class LoadingScreen extends Component {
    render() {
        return (
            <div className="loading-screen">
                <h1>Give me a second, fetching data...</h1>
            </div>
        )
    }
}

