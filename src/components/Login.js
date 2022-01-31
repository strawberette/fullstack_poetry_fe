import { useState } from "react";
import { Link } from "react-router-dom";

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
    setUser({ username: data.user.name, id: data.user.id, jwt: data.token });
    console.log(data.user.name);
  };
  if (user) {
    return (
      <div className="App">
        <p>You are already logged in!</p>
        <br />
        <Link to="/">Home</Link>
      </div>
    );
  }

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="user">User:</label>
        <input
          type="text"
          name="user"
          value={userName}
          onChange={handleUserName}
        />

        <label htmlFor="password">User:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePassword}
        />

        <input type="submit" value="Submit" />
      </form>

      <Link to="/">Home</Link>
    </>
  );
}

export default Login;
