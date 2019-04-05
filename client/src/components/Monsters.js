import React from "react";
import axios from "axios";

import auth from "./auth";

class Monsters extends React.Component {
  state = {
    monsters: []
  };

  componentDidMount = () => {
    axios
      .get("http://localhost:5000/api/monsters")
      .then(res => {
        console.log(res.data);
        this.setState({ monsters: res.data });
      })
      .catch(err => {
        console.log("GETerror", err);
      });
  };

  render() {
    if (this.state.monsters.length) {
      return (
        <ul>
          {this.state.monsters.map(m => (
            <li>{m.name}</li>
          ))}
        </ul>
      );
    } else {
      return <h1>Monsters loading... into your nightmares?</h1>;
    }
  }
}

export default auth(Monsters);
