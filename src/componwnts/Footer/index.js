import React from "react";
import './index.css';

class Footer extends React.Component{
  render() {
    return(
      <footer id="footer">
        <div className="f-container">
          <div>Made with <span>❤</span> in Melbourne</div>
          <div>© 2022 Broccoli & Co. All rights reserved.</div>
        </div>
      </footer>)
  }
}

export default Footer;