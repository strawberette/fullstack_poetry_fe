import "./App.css";
import { useState, useEffect } from "react";
import { Switch, Route, Link, useLocation } from "react-router-dom";
import Poem from "./components/Poem.js";
import Edit from "./components/Edit.js";
import WriteAPoem from "./components/WriteAPoem.js";
import PoemList from "./components/PoemList";
import Register from "./components/Register";
import Login from "./components/Login";
import Logout from "./components/Logout";

function App() {
  const [poemList, setPoem] = useState([]);
  const [user, setUser] = useState(null);
  let loc = useLocation();

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null;
    setUser(loggedInUser);
    const baseURL = `${process.env.REACT_APP_BASE_URL}/poems`;
    // const baseURL = "https://noemi-poetry.herokuapp.com/poems";
    const handleFetch = async () => {
      const response = await fetch(baseURL, {
        mode: "cors",
      });

      const poems = await response.json();

      setPoem(poems);
    };
    handleFetch();
  }, [loc]);

  return (
    <div className="App">
      <div className="siteContent">
        <div className="brand">
          <h1>The Poetry Dispatch</h1>
          <Link to="/">
            <img className="logo" src="/Typewriter-bro.png" />
          </Link>
          <Logout user={user} setUser={setUser} />
        </div>
        <Switch>
          <Route exact path="/">
            <PoemList poemList={poemList} user={user} />
          </Route>
          <Route exact path="/register">
            <Register user={user} />
          </Route>
          <Route exact path="/login">
            <Login user={user} setUser={setUser} />
          </Route>
          <Route exact path="/read/:id" children={<Poem user={user} />} />
          <Route exact path="/edit/:id" children={<Edit user={user} />} />
          <Route exact path="/post">
            <WriteAPoem user={user} />
          </Route>
        </Switch>
      </div>
      <footer>
        <a href="https://storyset.com/work">Work illustrations by Storyset</a>
      </footer>
    </div>
  );
}

export default App;
