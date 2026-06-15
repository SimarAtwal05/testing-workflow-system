import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem(
        "token",
        res.data.token
      );

      localStorage.setItem(
        "role",
        res.data.role
      );

      localStorage.setItem(
        "name",
        res.data.name
      );

      if (res.data.role === "ADMIN") {
        navigate("/admin");
      } else if (res.data.role === "HEAD") {
        navigate("/head");
      } else if (res.data.role === "ENGINEER") {
        navigate("/requests");
      }

    } catch (error) {
      console.error("Login Error:", error);

      if (error.response) {
        alert(
          error.response.data.message ||
          "Login Failed"
        );
      } else {
        alert(
          "Unable to connect to server"
        );
      }
    }
  };

  return (
    <div
      style={{
        padding: "20px"
      }}
    >
      <h1>
        Testing Workflow System
      </h1>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
      />

      <br />
      <br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) =>
          setPassword(e.target.value)
        }
      />

      <br />
      <br />

      <button onClick={login}>
        Login
      </button>
    </div>
  );
}

export default Login;