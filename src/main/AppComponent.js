import React, { Component } from 'react';
import Content from "./content";

class AppComponent extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Content/>
        </header>
      </div>
    );
  }
}

export default AppComponent;
