import { useState } from "react";
import API from "../services/api";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {

    API.post("/auth/login", {
      username: email,
      password: password
    })
      .then((response) => {

        console.log("Response:", response);
        console.log("Data:", response.data);

        if (response.data && response.data.token) {

          localStorage.setItem(
            "token",
            response.data.token
          );

          localStorage.setItem(
            "userId",
            response.data.userId
          );

          localStorage.setItem(
            "userName",
            response.data.name
          );

          alert("Login Successful ✅");

          window.location.href = "/";

        } else {

          console.log("Token not found in response");
          alert("Login response received but token missing");

        }

      })
      .catch((error) => {

        console.log("Full Error:", error);

        if (error.response) {

          console.log(
            "Status:",
            error.response.status
          );

          console.log(
            "Data:",
            error.response.data
          );

        }

        alert("Invalid Credentials ❌");

      });

  };

  return (

    <div className="auth-container">

      <div className="auth-card">

        <h1>Login</h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button onClick={handleLogin}>
          Login
        </button>

      </div>

    </div>

  );

}

export default Login;