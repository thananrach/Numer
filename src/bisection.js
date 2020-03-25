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

class bisection extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            a: "",
            data: "",
            value: "",
            xl: [],
            xr: [],
            xm: [],
            error: [],
            fxr: [],
            fxl: [],
            fxm: [],
            movie: ""
        };

        this.BS = this.BS.bind(this);
        this.xl = this.xl.bind(this);
        this.xr = this.xr.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.plot = this.plot.bind(this);
    }

    componentDidMount = async () => {
        await api.getMovieById("5e7b5fee599f2d2238d93f8c").then(db => {
            this.setState({
                data: db.data.data.name
            });
            this.state.xl[0] = parseFloat(db.data.data.time);
            this.state.xr[0] = parseFloat(db.data.data.rating);
        });
        console.log("this is data api:", this.state.data)
        console.log("this is data xl:", this.state.xl)
        console.log("this is data xr:", this.state.xr)
    };

    handleChange({ target: { value } }) {
        this.setState({ data: value });
        //console.log(this.state.data);
    }

    xl({ target: { value } }) {
        //thi.setState({x[0]:value})
        this.state.xl[0] = parseFloat(value);
    }
    xr({ target: { value } }) {
        this.state.xr[0] = parseFloat(value);
    }

    BS_API = e => {
        var value = this.state.data;
        var xl = parseFloat(this.state.xl);
        var xr = parseFloat(this.state.xr);
        //console.log(xl, xr);
        //console.log("this is value",value);
        var xm = 0,
            xm_old = 0,
            error = 0,
            fxl = 0,
            fxr = 0,
            fxm = 0;
        var i,
            j = 0,
            //fx = "",
            cal;

        if (value != "" && xl != "" && xr != "") {
            do {
                let scp = {
                    x: xl
                };
                //console.log(value);
                cal = evaluate(value, scp);
                console.log("this is fxl:", cal);
                //fx = "";
                fxl = 0;
                fxl = parseFloat(cal);
                this.state.fxl[j] = fxl;
                //console.log(fxl);
                cal = 0;

                let scp1 = {
                    x: xr
                };
                //console.log(value);
                cal = evaluate(value, scp1);
                //console.log(cal);
                //fx = "";
                fxr = 0;
                fxr = parseFloat(cal);
                this.state.fxr[j] = fxr;
                cal = 0;

                xm = (xr + xl) / 2;

                let scp2 = {
                    x: xm
                };
                //console.log(value);
                cal = evaluate(value, scp2);
                //console.log(cal);
                //fx = "";
                fxm = 0;
                fxm = parseFloat(cal);
                this.state.fxm[j] = fxm;
                cal = 0;

                this.state.xm[j] = xm;
                error = Math.abs((xm - xm_old) / xm);
                this.state.error[j] = error;
                //console.log("error = ", error);
                xm_old = xm;
                //console.log("fxl = ", fxl, "fxm = ", fxm, "fxr = ", fxr);
                //console.log(fxm * fxr);
                j++;

                if (error >= 0.00001) {
                    if (fxm * fxr < 0) {
                        this.state.xl[j] = xm;
                        this.state.xr[j] = xr;
                        xl = xm;
                    } else if (fxm * fxr > 0) {
                        this.state.xr[j] = xm;
                        this.state.xl[j] = xl;
                        xr = xm;
                    }
                }

                console.log(
                    "thi is xl =",
                    this.state.xl[j],
                    "this is xm = ",
                    this.state.xm[j - 1],
                    "this is xr = ",
                    this.state.xr[j]
                );
            } while (error >= 0.00001);
            this.setState({ data: "" });
        }

        e.preventDefault();
    };

    BS = e => {
        var value = this.state.data;
        var xl = parseFloat(this.state.xl);
        var xr = parseFloat(this.state.xr);
        //console.log(xl, xr);
        //console.log("this is value",value);
        var xm = 0,
            xm_old = 0,
            error = 0,
            fxl = 0,
            fxr = 0,
            fxm = 0;
        var i,
            j = 0,
            //fx = "",
            cal;

        if (value != "" && xl != "" && xr != "") {
            do {
                let scp = {
                    x: xl
                };
                //console.log(value);
                cal = evaluate(value, scp);
                // console.log("this is fxl:",cal);
                //fx = "";
                fxl = 0;
                fxl = parseFloat(cal);
                this.state.fxl[j] = fxl;
                console.log(fxl);
                cal = 0;

                let scp1 = {
                    x: xr
                };
                //console.log(value);
                cal = evaluate(value, scp1);
                //console.log(cal);
                //fx = "";
                fxr = 0;
                fxr = parseFloat(cal);
                this.state.fxr[j] = fxr;
                cal = 0;

                xm = (xr + xl) / 2;

                let scp2 = {
                    x: xm
                };
                //console.log(value);
                cal = evaluate(value, scp2);
                //console.log(cal);
                //fx = "";
                fxm = 0;
                fxm = parseFloat(cal);
                this.state.fxm[j] = fxm;
                cal = 0;

                this.state.xm[j] = xm;
                error = Math.abs((xm - xm_old) / xm);
                this.state.error[j] = error;
                //console.log("error = ", error);
                xm_old = xm;
                //console.log("fxl = ", fxl, "fxm = ", fxm, "fxr = ", fxr);
                //console.log(fxm * fxr);
                j++;

                if (error >= 0.00001) {
                    if (fxm * fxr < 0) {
                        this.state.xl[j] = xm;
                        this.state.xr[j] = xr;
                        xl = xm;
                    } else if (fxm * fxr > 0) {
                        this.state.xr[j] = xm;
                        this.state.xl[j] = xl;
                        xr = xm;
                    }
                }

                console.log(
                    "xl =",
                    this.state.xl[j],
                    "xm = ",
                    this.state.xm[j - 1],
                    "xr = ",
                    this.state.xr[j]
                );
            } while (error >= 0.00001);
            this.setState({ data: "" });
        }
        this.plot();

        e.preventDefault();
    };

    plot() {
        const xl_plot = this.state.xl;
        const yl_plot = this.state.fxl;
        const xr_plot = this.state.xr;
        const yr_plot = this.state.fxr;

        var data = [
            {
                type: "scatter",
                x: xl_plot,
                y: yl_plot,
                marker: {
                    color: "#ff6d00"
                },
                name: "XL"
            },
            {
                type: "scatter",
                x: xr_plot,
                y: yr_plot,
                marker: {
                    color: "#ffab00"
                },
                name: "XR"
            }
        ];

        return data;
    }

    render() {
        var i = 0;
        let data = this.plot();
        var xl = this.state.xl;
        var xr = this.state.xr;
        var xm = this.state.xm;
        var fxl = this.state.fxl;
        var fxr = this.state.fxr;
        var fxm = this.state.fxm;
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
                        <legend><h1>Bisection</h1></legend>
                        <p></p>

                        <div>
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
                            <label for=""><h5>Xl </h5></label>
                            <input
                                onChange={this.xl}
                                type="text"
                                class="form-control"
                                id=""
                                placeholder="Input"
                            />
                        </div>
                        <p></p>
                        <div>
                            <label for=""><h5>Xr </h5></label>
                            <input
                                onChange={this.xr}
                                type="text"
                                class="form-control"
                                id=""
                                placeholder="Input"
                            />
                        </div>
                        <p></p>
                        <button type="submit" onClick={this.BS}>
                            Submit
              </button>

                        <button type="submit" onClick={this.BS_API}>
                            API
              </button>
                        <p></p>
                        <div
                            style={{
                                width: "50%",
                                height: "1500px"
                            }}className="container"
                        >
                            <p><h6>this is f(x) : {movie}</h6></p>
                            <table style={{ width: "100%", border: "solid black" }}>
                                <tr style={{ color: "#e65100" }}>
                                    <th style={{ border: "solid black" }}>Iteration</th>
                                    <th style={{ border: "solid black" }}>XL</th>
                                    <th style={{ border: "solid black" }}>XR</th>
                                    <th style={{ border: "solid black" }}>XM</th>
                                    <th style={{ border: "solid black" }}>f(XL)</th>
                                    <th style={{ border: "solid black" }}>f(XR)</th>
                                    <th style={{ border: "solid black" }}>f(XM)</th>
                                    <th style={{ border: "solid black" }}>Error</th>
                                </tr>

                                <tr>
                                    <td style={{ border: "solid black" }}>
                                        {xr.map(
                                            x => (
                                                <div>{++i}</div>
                                            ),
                                            this
                                        )}
                                    </td>
                                    <td style={{ border: "solid black" }}>
                                        {xl.map(xl => (
                                            <div>{xl.toFixed(6)}</div>
                                        ))}
                                    </td>
                                    <td style={{ border: "solid black" }}>
                                        {xr.map(
                                            xr => (
                                                <div>{xr.toFixed(6)}</div>
                                            ),
                                            this
                                        )}
                                    </td>
                                    <td style={{ border: "solid black" }}>
                                        {xm.map(
                                            xm => (
                                                <div>{xm.toFixed(6)}</div>
                                            ),
                                            this
                                        )}
                                    </td>
                                    <td style={{ border: "solid black" }}>
                                        {fxl.map(
                                            fxl => (
                                                <div>{fxl.toFixed(6)}</div>
                                            ),
                                            this
                                        )}
                                    </td>
                                    <td style={{ border: "solid black" }}>
                                        {fxr.map(
                                            fxr => (
                                                <div>{fxr.toFixed(6)}</div>
                                            ),
                                            this
                                        )}
                                    </td>
                                    <td style={{ border: "solid black" }}>
                                        {fxm.map(
                                            fxm => (
                                                <div>{fxm.toFixed(6)}</div>
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
                            <div
                                style={{ width: "100%", height: "550px", float: "middle" }}
                            >
                                <PlotlyComponent className="whatever" data={data} />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }

}


export default bisection;