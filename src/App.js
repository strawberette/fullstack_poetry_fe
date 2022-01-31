import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
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

  useEffect(() => {
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
  }, []);

  return (
    <Router>
      <Logout user={user} setUser={setUser} />
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
    </Router>
  );
}

export default App;
