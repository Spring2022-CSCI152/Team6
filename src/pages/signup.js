import React, { Component } from "react";
import '/Users/gurleenkaur/Desktop/Team6/src/App.css';

export default class SignUp extends Component {
    render() {
        return (
            <form>
                <h3>Create a New Account</h3>

                <div className="form-group">
                    <label>Full name</label>
                    <input type="text" className="form-control" placeholder="Full name" />
                </div>

                <div className="form-group">
                    <label>Email</label>
                    <input type="email" className="form-control" placeholder="Enter email" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" />
                </div>

                <button type="submit" className="btn btn-dark btn-lg btn-block">Create Account</button>
                {/* <p className="forgot-password text-right">
                    Already registered <a href="#">log in?</a>
                </p> */}
            </form>
        );
    }
}