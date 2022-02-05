import { useState } from "react";
import { Redirect } from "react-router-dom";

function Login({ user, setUser }) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const baseURL = `${process.env.REACT_APP_BASE_URL}/user/login`;

  const handleUserName = (e) => setUserName(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = JSON.stringify({
      name: userName,
      password: password,
    });

    const res = await fetch(baseURL, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: payload,
    });
    const data = await res.json();
    const loggedInUser = {
      username: data.user.name,
      id: data.user.id,
      jwt: data.token,
    };
    localStorage.setItem("user", JSON.stringify(loggedInUser));
    setUser(loggedInUser);
  };
  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <div className="loginPage">
      <div className="loginForm">
        <img src="/Typewriter-rafiki.png" width="300px" />
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="user">User</label>
          <br />
          <input
            type="text"
            name="user"
            value={userName}
            onChange={handleUserName}
          />
          <br />
          <br />
          <label htmlFor="password">Password</label>
          <br />
          <input
            type="password"
            name="password"
            value={password}
            onChange={handlePassword}
          />
          <br />
          <br />

          <input type="submit" value="Submit" />
        </form>
      </div>
    </div>
  );
}

export default Login;
