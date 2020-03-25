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
import api from './api';


const PlotlyComponent = createPlotlyComponent(Plotly);

const _ = String.raw;

class secant extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            data: '',
            x0: [],
            x1: [],
            error: [],
            fx0: [],
            fx1: [],
            movie: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.SC = this.SC.bind(this);
        this.plot = this.plot.bind(this);
        this.x0 = this.x0.bind(this);
        this.x1 = this.x1.bind(this);

    }
    componentDidMount = async () => {
        await api.getMovieById("5e7b6bab599f2d2238d93f90").then(db => {
            this.setState({
                data: db.data.data.name
            });
            this.state.x0[0] = parseFloat(db.data.data.time);
            this.state.x1[0] = parseFloat(db.data.data.rating);
        });
        console.log("this is data api:", this.state.data)
        console.log("this is data x0:", this.state.x0)
        console.log("this is data x1:", this.state.x1)
    };

    handleChange({ target: { value } }) {
        this.setState({ value, data: value });
        console.log(this.state.data);
    }
    x0({ target: { value } }) {
        this.state.x0[0] = parseFloat(value);
        console.log(this.state.x0);
    }

    x1({ target: { value } }) {
        this.state.x1[0] = parseFloat(value);
        console.log(this.state.x1);
    }

    state = {
        isOpen: false
    };
    SC = v => {

        var value = this.state.data;
        var x0 = parseFloat(this.state.x0);
        var x1 = parseFloat(this.state.x1);
        console.log("fx = ", value, "x0 = ", x0, "x1 = ", x1);
        var x_old = 0, error = 0, xi = 0;
        var i, j = 0, fx1 = '', fx0 = '', fxi = '';
        if (value != '') {
            do {
                let scp = {
                    x: x0,
                }
                //console.log(value);
                fx0 = evaluate(value, scp);
                this.state.fx0[j] = fx0;

                let scp1 = {
                    x: x1,
                }
                //console.log(value);
                fx1 = evaluate(value, scp1);
                this.state.fx1[j] = fx1;

                fxi = (fx0 - fx1) / (x0 - x1);

                x1 = x0;
                x0 = x0 - (fx0 / fxi);
                console.log("x0 = ", x0, "x1 = ", x1);

                error = Math.abs((x0 - x1) / x0);

                this.state.error[j] = error;
                j++;
                if (j >= 15) {
                    break;
                }
                if (error >= 0.00001) {
                    this.state.x0[j] = x0;
                    this.state.x1[j] = x1;
                }

            } while (error >= 0.00001);

            console.log("x0 = ", this.state.x0)
            console.log("x1 = ", this.state.x1)
            console.log("fx0 = ", this.state.fx0)
            console.log("fx1 = ", this.state.fx1)
            console.log("error = ", this.state.error)
            this.setState({ data: '' })
            this.plot();
        }
        v.preventDefault();
    }
    SC_API = v => {

        var value = this.state.data;
        var x0 = parseFloat(this.state.x0);
        var x1 = parseFloat(this.state.x1);
        console.log("fx = ", value, "x0 = ", x0, "x1 = ", x1);
        var x_old = 0, error = 0, xi = 0;
        var i, j = 0, fx1 = '', fx0 = '', fxi = '';
        if (value != '') {
            do {
                let scp = {
                    x: x0,
                }
                //console.log(value);
                fx0 = evaluate(value, scp);
                this.state.fx0[j] = fx0;

                let scp1 = {
                    x: x1,
                }
                //console.log(value);
                fx1 = evaluate(value, scp1);
                this.state.fx1[j] = fx1;

                fxi = (fx0 - fx1) / (x0 - x1);

                x1 = x0;
                x0 = x0 - (fx0 / fxi);
                console.log("x0 = ", x0, "x1 = ", x1);

                error = Math.abs((x0 - x1) / x0);

                this.state.error[j] = error;
                j++;
                if (j >= 15) {
                    break;
                }
                if (error >= 0.00001) {
                    this.state.x0[j] = x0;
                    this.state.x1[j] = x1;
                }

            } while (error >= 0.00001);

            console.log("x0 = ", this.state.x0)
            console.log("x1 = ", this.state.x1)
            console.log("fx0 = ", this.state.fx0)
            console.log("fx1 = ", this.state.fx1)
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
        const x0_plot = this.state.x0;
        const y0_plot = this.state.fx0;
        const x1_plot = this.state.x1;
        const y1_plot = this.state.fx1;
        //console.log(x_plot, y_plot)
        var data = [
            {
                type: 'scatter',
                x: x0_plot,
                y: y0_plot,
                marker: {
                    color: '#ff6d00'
                },
                name: 'X0'
            },
            {
                type: 'scatter',
                x: x1_plot,
                y: y1_plot,
                marker: {
                    color: '#ffab00'
                },
                name: 'X1'
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
        var x0 = this.state.x0;
        var x1 = this.state.x1;
        var fx0 = this.state.fx0;
        var fx1 = this.state.fx1;
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
                        <legend><h1>Secant</h1></legend>
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
                            <label for=""><h5>X0</h5></label>
                            <input
                                onChange={this.x0}
                                type="text"
                                class="form-control"
                                id=""
                                placeholder="Input"
                            />
                        </div>
                        <p></p>
                        <div>
                            <label for=""><h5>X1</h5></label>
                            <input
                                onChange={this.x1}
                                type="text"
                                class="form-control"
                                id=""
                                placeholder="Input"
                            />
                        </div>
                        <p></p>
                        <button type="submit" onClick={this.SC}>Submit</button>
                        <button type="submit" onClick={this.SC_API}>
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
                                    <th style={{ border: "solid black" }}>X0</th>
                                    <th style={{ border: "solid black" }}>X1</th>
                                    <th style={{ border: "solid black" }}>f(x0)</th>
                                    <th style={{ border: "solid black" }}>f(x1)</th>
                                    <th style={{ border: "solid black" }}>Error</th>
                                </tr>
                                <tr>
                                    <td style={{ border: "solid black" }}>
                                        {x0.map(
                                            x => (
                                                <div>{++i}</div>
                                            ),
                                            this
                                        )}
                                    </td>
                                    <td style={{ border: "solid black" }}>
                                        {x0.map(
                                            x => (
                                                <div>{x.toFixed(6)}</div>
                                            ),
                                            this
                                        )}
                                    </td>
                                    <td style={{ border: "solid black" }}>
                                        {x1.map(
                                            x => (
                                                <div>{x.toFixed(6)}</div>
                                            ),
                                            this
                                        )}
                                    </td>
                                    <td style={{ border: "solid black" }}>
                                        {fx0.map(
                                            fx => (
                                                <div>{fx.toFixed(6)}</div>
                                            ),
                                            this
                                        )}
                                    </td>
                                    <td style={{ border: "solid black" }}>
                                        {fx1.map(
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
        )
    }
}
export default secant;