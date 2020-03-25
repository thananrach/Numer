import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import { evaluate, parse } from "mathjs";
import createPlotlyComponent from "react-plotlyjs";
import Plotly from "plotly.js/dist/plotly-cartesian";
import { derivative } from 'mathjs'
import api from './api';


const PlotlyComponent = createPlotlyComponent(Plotly);

const _ = String.raw;

class newtonraphson extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: '',
            data: '',
            x: [],
            error: [],
            fx: [],
            fxd: [],
            movie: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.NT = this.NT.bind(this);
        this.plot = this.plot.bind(this);
        this.x = this.x.bind(this);

    }
    componentDidMount = async () => {
        await api.getMovieById("5e7b6b44599f2d2238d93f8f").then(db => {
            this.setState({
                data: db.data.data.name
            });
            this.state.x[0] = parseFloat(db.data.data.time);

        });
        console.log("this is data api:", this.state.data)
        console.log("this is data x:", this.state.x)

    };

    handleChange({ target: { value } }) {
        this.setState({ value, data: value });
        console.log(this.state.data);
    }
    x({ target: { value } }) {
        this.state.x[0] = parseFloat(value);
        console.log(this.state.x);
    }

    state = {
        isOpen: false
    };
    NT = v => {

        var value = this.state.data;
        var x = parseFloat(this.state.x);
        console.log("fx = ", value);
        var x_old = 0, error = 0, xi = 0;
        var i, j = 0, fx = '', cal, gx = '', k = '', fxd = '';
        if (value != '') {
            do {
                let scp = {
                    x: x,
                }
                console.log(value);
                fx = evaluate(value, scp);
                console.log("fx = ", fx);
                fxd = derivative(value, 'x').evaluate({ x: x });
                console.log("fxd = ", fxd);
                this.state.fx[j] = parseFloat(fx);
                this.state.fxd[j] = parseFloat(fxd);
                x_old = x;
                xi = x - (fx / fxd);
                error = Math.abs((xi - x_old) / xi);
                x = xi;
                this.state.error[j] = error;
                j++;
                if (j >= 15) {
                    break;
                }
                if (error >= 0.00001) {
                    this.state.x[j] = x;
                }

            } while (error >= 0.00001);

            console.log("x = ", this.state.x)
            console.log("fx = ", this.state.fx)
            console.log("fxd = ", this.state.fxd)
            console.log("error = ", this.state.error)
            this.setState({ data: '' })
            this.plot();
        }
        v.preventDefault();
    }
    NT_API = v => {

        var value = this.state.data;
        var x = parseFloat(this.state.x);
        console.log("fx = ", value);
        var x_old = 0, error = 0, xi = 0;
        var i, j = 0, fx = '', cal, gx = '', k = '', fxd = '';
        if (value != '') {
            do {
                let scp = {
                    x: x,
                }
                console.log(value);
                fx = evaluate(value, scp);
                console.log("fx = ", fx);
                fxd = derivative(value, 'x').evaluate({ x: x });
                console.log("fxd = ", fxd);
                this.state.fx[j] = parseFloat(fx);
                this.state.fxd[j] = parseFloat(fxd);
                x_old = x;
                xi = x - (fx / fxd);
                error = Math.abs((xi - x_old) / xi);
                x = xi;
                this.state.error[j] = error;
                j++;
                if (j >= 15) {
                    break;
                }
                if (error >= 0.00001) {
                    this.state.x[j] = x;
                }

            } while (error >= 0.00001);

            console.log("x = ", this.state.x)
            console.log("fx = ", this.state.fx)
            console.log("fxd = ", this.state.fxd)
            console.log("error = ", this.state.error)
            this.setState({ data: '' })
            this.plot();
        }
        v.preventDefault();
    }

    toggleCollapse = () => {
        this.setState({ isOpen: !this.state.isOpen });
    }

    plot() {
        const x_plot = this.state.x;
        const y_plot = this.state.fx;
        console.log(x_plot, y_plot)
        var data = [
            {
                type: 'scatter',  // all "scatter" attributes: https://plot.ly/javascript/reference/#scatter
                x: x_plot,     // more about "x": #scatter-x
                y: y_plot,     // #scatter-y
                marker: {         // marker is an object, valid marker keys: #scatter-marker
                    color: '#f57c00' // more about "marker.color": #scatter-marker-color
                }
            },

        ];
        console.log(data);
        return data
    }

    render() {
        var i = 0;
        let data = this.plot()
        let layout = {                     // all "layout" attributes: #layout
            title: '',  // more about "layout.title": #layout-title
            xaxis: {                  // all "layout.xaxis" attributes: #layout-xaxis
                title: ''         // more about "layout.xaxis.title": #layout-xaxis-title
            },

        };
        let config = {
            showLink: false,
            displayModeBar: true
        };
        var x = this.state.x;
        var fx = this.state.fx;
        var fxd = this.state.fxd;
        var error = this.state.error;
        var movie = this.state.data;
        return (
            <div>
                <Navbar bg="dark" variant="" sticky="top">
                    <h1></h1>
                    <Nav.Link href="/"><h3>NUMERICAL</h3></Nav.Link>
                    <h1></h1>
                    <Nav className="mr-auto">
                        <h1></h1>
                        <NavDropdown title="ROOT OF EQUATION" id="basic-nav-dropdown">
                            <Nav.Link href="/bisection">bisection</Nav.Link>
                            <Nav.Link href="/falseposition">false position</Nav.Link>
                            <Nav.Link href="/onepointiteration">one-point iteration</Nav.Link>
                            <Nav.Link href="/newtonraphson">newton raphson</Nav.Link>
                            <Nav.Link href="/secant">secant</Nav.Link>
                        </NavDropdown>
                    </Nav>
                </Navbar>
                <form>
                    <p></p>
                    <div className="container">
                        <legend><h1>Newton Raphson</h1></legend>
                        <div>
                            <p></p>
                            <label for=""><h5>f(x) </h5></label>
                            <input
                                onChange={this.handleChange}
                                type="text"
                                class="form-control"
                                id=""
                                placeholder="Input"
                            />
                        </div>
                        <p></p>
                        <div>
                            <label for=""><h5>X</h5></label>
                            <input
                                onChange={this.x}
                                type="text"
                                class="form-control"
                                id=""
                                placeholder="Input"
                            />
                        </div>
                        <p></p>
                        <button type="submit" onClick={this.NT}>Submit</button>
                        <button type="submit" onClick={this.NT_API}>
                            API
              </button>
                        <p></p>
                        <div
                            style={{
                                width: "50%",
                                height: "1500px"
                            }} className="container"
                        >
                            <p><h6>this is f(x) : {movie}</h6></p>
                            <table style={{ width: "100%", border: "solid black" }}>
                                <tr style={{ color: "#e65100" }}>
                                    <th style={{ border: "solid black" }}>Iteration</th>
                                    <th style={{ border: "solid black" }}>Xi</th>
                                    <th style={{ border: "solid black" }}>f</th>
                                    <th style={{ border: "solid black" }}>Error</th>
                                </tr>
                                <tr>
                                    <td style={{ border: "solid black" }}>
                                        {x.map(
                                            x => (
                                                <div>{++i}</div>
                                            ),
                                            this
                                        )}
                                    </td>
                                    <td style={{ border: "solid black" }}>
                                        {x.map(
                                            x => (
                                                <div>{x.toFixed(6)}</div>
                                            ),
                                            this
                                        )}
                                    </td>
                                    <td style={{ border: "solid black" }}>
                                        {fx.map(
                                            fx => (
                                                <div>{fx.toFixed(6)}</div>
                                            ),
                                            this
                                        )}
                                    </td>
                                    <td style={{ border: "solid black" }}>
                                        {error.map(
                                            er => (
                                                <div>{er.toFixed(6)}</div>
                                            ),
                                            this
                                        )}
                                    </td>
                                </tr>
                            </table>
                            <div style={{ width: "100%", height: "550px", float: "middle" }}>
                                <PlotlyComponent className="whatever" data={data} />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default newtonraphson;