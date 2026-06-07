import { useState } from "react";
import API from "../services/api";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {

    API
      .post(
        "/users/login",
        {
          email,
          password
        }
      )
      .then((response) => {

        localStorage.setItem(
          "user",
          JSON.stringify(response.data)
        );

        alert("Login Successful ✅");

        window.location.href = "/";

      })
      .catch((error) => {

        console.log(error);
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

        <button
          onClick={handleLogin}
        >
          Login
        </button>

      </div>

    </div>
  );
}

export default Login;