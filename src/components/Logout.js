import { Link } from "react-router-dom";
function Login({ user, setUser }) {
  const handleClick = () => {
    localStorage.removeItem("user");
    setUser(null);
  };
  if (!user) {
    return (
      <div className="login">
        <Link to="/register">
          <button>Register</button>
        </Link>
        <br />

        <Link to="/login">
          <button>Log in</button>
        </Link>
        <br />
      </div>
    );
  }

  return (
    <div className="logout">
      <Link to="/post">
        <button>Post a poem</button>
      </Link>
      <p>
        Logged in as <b>{user.username}</b>
      </p>
      <button onClick={handleClick}>Log out</button>
    </div>
  );
}

export default Login;
