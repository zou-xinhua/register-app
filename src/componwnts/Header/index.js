import React from "react";
import './index.css';

class Header extends React.Component{
  render() {
    return (
      <header id="header">
        <div className="row">
          <div className="brand">Broccoli & Co.</div>
        </div>
      </header>)
  }
}

export default Header;