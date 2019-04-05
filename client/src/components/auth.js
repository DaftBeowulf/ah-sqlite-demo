import React from "react";
import axios from "axios";
import swal from "sweetalert";

axios.interceptors.request.use(config => {
  config.headers.authorization = localStorage.getItem("token");
  return config;
});

axios.interceptors.response.use(
  function(response) {
    // Do something with response data
    return response;
  },
  function(error) {
    // Do something with response error
    if (error.response.status === 401) {
      swal({
        title: "Login session expired",
        text: "You will now be directed to the login page to login again",
        type: "info"
        // ,
        // function() {
        //   history.location.push("/login");
      });
    } else {
      return Promise.reject(error);
    }
  }
);

export default function(Component) {
  return class Auth extends React.Component {
    render() {
      const token = localStorage.getItem("token");
      return token ? <Component {...this.props} /> : <h1>Ya not logged in</h1>;
    }
  };
}
