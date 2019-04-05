import React from "react";
import axios from "axios";

class Login extends React.Component {
  state = {
    username: "",
    password: ""
  };

  changeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  submitHandler = e => {
    e.preventDefault();
    console.log(this.state);
    axios
      .post("http://localhost:5000/api/auth/login", this.state)
      .then(res => {
        console.log(res.data);
        // localStorage.setItem("token", res.data.token);
      })
      .catch(err => {
        console.log("LOGINerror", err);
      });
  };

  render() {
    return (
      <form onSubmit={this.submitHandler}>
        <input
          name="username"
          value={this.state.username}
          type="text"
          placeholder="Username"
          onChange={this.changeHandler}
        />
        <input
          name="password"
          value={this.state.password}
          type="password"
          placeholder="Password"
          onChange={this.changeHandler}
        />
        <button>CLICK ME</button>
      </form>
    );
  }
}

export default Login;
