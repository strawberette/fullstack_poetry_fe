function Login({ user, setUser }) {
  const handleClick = () => {
    setUser(null);
  };
  if (!user) {
    return <></>;
  }

  return (
    <div>
      <p>
        Logged in as <b>{user.username}</b>
      </p>
      <button onClick={handleClick}>Log out</button>
    </div>
  );
}

export default Login;
