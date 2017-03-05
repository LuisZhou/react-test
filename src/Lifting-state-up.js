import React, { Component } from 'react';

function BoilingVerdict(props) {
    if (props.celsius >= 100) {
        return <p>The water would boil.</p>;
    }
    return <p>The water would not boil.</p>;
}

class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {value: ''};
    }

    handleChange(e) {
        this.setState({value: e.target.value});
    }

    render() {
        const value = this.state.value;
        return (
            <fieldset>
                <legend>Enter temperature in Celsius:</legend>
                <input
                    value={value}
                    onChange={this.handleChange} />
                <BoilingVerdict
                    celsius={parseFloat(value)} />
            </fieldset>
        );
    }
}

// Adding a Second Input
// ---------------------

const scaleNames = {
    c: 'Celsius',
    f: 'Fahrenheit'
};

class TemperatureInput extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {value: ''};
    }

    handleChange(e) {
        this.setState({value: e.target.value});
    }

    render() {
        const value = this.state.value;
        const scale = this.props.scale;
        return (
            <fieldset>
                <legend>Enter temperature in {scaleNames[scale]}:</legend>
                <input value={value}
                       onChange={this.handleChange} />
            </fieldset>
        );
    }
}

// We have two inputs now, but when you enter the temperature in one of them, the other doesn't update.
// This contradicts our requirement: we want to keep them in sync.

class Calculator2 extends React.Component {
    render() {
        return (
            <div>
                <TemperatureInput scale="c" />
                <TemperatureInput scale="f" />
            </div>
        );
    }
}

// Writing Conversion Functions
// ----------------

function toCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
    return (celsius * 9 / 5) + 32;
}

function tryConvert(value, convert) {
    const input = parseFloat(value);
    if (Number.isNaN(input)) {
        return '';
    }
    const output = convert(input);
    const rounded = Math.round(output * 1000) / 1000;
    return rounded.toString();
}

// Lifting State Up
// ----------------

// When we update the Celsius input, the Fahrenheit input should reflect the converted temperature, and vice versa.

// In React, sharing state is accomplished by moving it up to the closest common ancestor of the components that need it.
// This is called "lifting state up". We will remove the local state from the TemperatureInput and move it into the
// Calculator instead.

// If the Calcutor owns the shared state, it becomes the "source of truth" for the current temperature in both inputs.

// TemperatureInput accept both value and onChange props from its parent Calculator

class TemperatureInputV2 extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {value: ''};
    }

    handleChange(e) {
        //this.setState({value: e.target.value});
        this.props.onChange(e.target.value);
    }

    render() {
        //const value = this.state.value;
        const value = this.props.value;

        const scale = this.props.scale;
        return (
            <fieldset>
                <legend>Enter temperature in {scaleNames[scale]}:</legend>
                <input value={value}
                       onChange={this.handleChange} />
            </fieldset>
        );
    }
}

// "source of truth"
// It is the minimal representation of all the data we need to know in order to render both inputs.

class Calculator3 extends React.Component {
    constructor(props) {
        super(props);
        this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
        this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
        this.state = {value: '', scale: 'c'};
    }

    handleCelsiusChange(value) {
        this.setState({scale: 'c', value});
    }

    handleFahrenheitChange(value) {
        this.setState({scale: 'f', value});
    }

    render() {
        const scale = this.state.scale;
        const value = this.state.value;
        const celsius = scale === 'f' ? tryConvert(value, toCelsius) : value;
        const fahrenheit = scale === 'c' ? tryConvert(value, toFahrenheit) : value;

        return (
            <div>
                <TemperatureInput
                    scale="c"
                    value={celsius}
                    onChange={this.handleCelsiusChange} />
                <TemperatureInput
                    scale="f"
                    value={fahrenheit}
                    onChange={this.handleFahrenheitChange} />
                <BoilingVerdict
                    celsius={parseFloat(celsius)} />
            </div>
        );
    }
}