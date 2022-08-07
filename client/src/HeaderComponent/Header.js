import React, { Component } from "react";

export default class Header extends Component {
  render() {
    return (
      <div className="headerContainer">
        <div className="header">
          <img src="/sgxlogo.png" alt="sgxlogo" className="sgxlogo" />
          <div className="headerName">Welcome to SGX Registration Form</div>
        </div>
      </div>
    );
  }
}
