import React from "react";
import Header from './componwnts/Header';
import Container from "./componwnts/Container";
import Footer from './componwnts/Footer';

import './App.css';

class App extends React.Component{
  render() {
    return (<div id="home">
      <Header></Header>
      <Container></Container>
      <Footer></Footer>
    </div>)
  }
}

export default App;
