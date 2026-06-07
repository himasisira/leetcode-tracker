import { useState } from "react";
import axios from "axios";

function Register() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {

    axios
      .post(
        "http://localhost:8080/api/users/register",
        {
          name,
          email,
          password
        }
      )
      .then(() => {

        alert("Registration Successful ✅");

        window.location.href = "/login";

      })
      .catch(() => {

        alert("Registration Failed ❌");

      });

  };

  return (
    <div className="auth-container">

      <div className="auth-card">

        <h1>Create Account</h1>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />

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

        <button onClick={handleRegister}>
          Register
        </button>

      </div>

    </div>
  );
}

export default Register;