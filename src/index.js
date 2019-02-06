import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

export default class App extends React.Component {
  state = {
    beers: []
  };

  constructor() {
    super();
    this.getBeers();
  }

  getBeers() {
    fetch(
      "https://data.police.uk/api/crimes-street/all-crime?lat=52.629729&lng=-1.131592&date=2017-01"
    )
      .then(data => data.json())
      .then(stops => {
        this.setState({ beers: stops });
      })
      .catch(error => console.log("D1", error));
  }

  render() {
    let beersHtml = this.state.beers.map(stop => (
      <p>
        {stop.category} -{" "}
        {stop.outcome_status ? stop.outcome_status.category : ""}
      </p>
    ));
    return <div className="App">{beersHtml}</div>;
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
