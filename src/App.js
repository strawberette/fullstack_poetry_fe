import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Poem from "./components/Poem.js";
import Edit from "./components/Edit.js";
import WriteAPoem from "./components/WriteAPoem.js";

import PoemList from "./components/PoemList";

function App() {
  const [poemList, setPoem] = useState([]);
  const baseURL = "http://localhost/poems";

  useEffect(() => {
    handleFetch();
  }, []);

  const handleFetch = async () => {
    const response = await fetch(baseURL, {
      mode: "cors",
    });

    const poems = await response.json();

    setPoem(poems);
  };

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <PoemList poemList={poemList} />
        </Route>
        <Route exact path="/read/:id" children={<Poem />} />
        <Route exact path="/edit/:id" children={<Edit />} />
        <Route exact path="/post">
          <WriteAPoem />
        </Route>
      </Switch>
      <Link to="/">Home</Link>
    </Router>
  );
}

export default App;
