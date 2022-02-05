import { useState } from "react";
import { Link } from "react-router-dom";

function Register(props) {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [response, setResponse] = useState({});
  const baseURL = `${process.env.REACT_APP_BASE_URL}/user/registeruser`;

  const handleUserChange = (e) => setUser(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const submitForm = async (e) => {
    e.preventDefault();
    const payload = JSON.stringify({
      name: user,
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

    setResponse(res);

    // const resJson = await res.json();
    // console.log(resJson);
    // setResult(resJson);
  };
  if (props.user) {
    return (
      <div className="App">
        <p>You are already logged in!</p>
        <br />
        <Link to="/">Home</Link>
      </div>
    );
  }

  if (response.status === 401) {
    return (
      <div className="App">
        <p>User {user} is already registered!</p>
        <br />
        <a href="/register">Try again</a>
        <br />
        <Link to="/">Home</Link>
      </div>
    );
  }

  if (response.status === 201) {
    return (
      <div className="App">
        <p>User {user} successfully registered!</p>
        <br />
        <Link to="/">Home</Link>
      </div>
    );
  }

  return (
    <div className="loginPage">
      <div className="loginForm">
        <img src="/Typewriter-rafiki.png" width="300px" />
        <h1>Register</h1>
        <form onSubmit={submitForm}>
          <label htmlFor="user">User</label>
          <br />
          <input
            type="text"
            name="user"
            value={user}
            onChange={handleUserChange}
          />
          <br />
          <br />

          <label htmlFor="password">Password</label>
          <br />
          <input
            type="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
          />
          <br />
          <br />

          <input type="submit" value="Submit" />
        </form>
      </div>
    </div>
  );
}

export default Register;
