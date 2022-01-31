// import "./App.css";
import { Link } from "react-router-dom";
const PoemList = (props) => {
  console.log("props.user", props.user);
  return (
    <div className="App">
      {props.user ? (
        <Link to="/post"> Post a poem</Link>
      ) : (
        <>
          <Link to="/register">Register</Link>
          <br />
          <Link to="/login">Log in</Link>
          <br />
        </>
      )}

      {props.poemList.map((p, index) => {
        return (
          <div key={index}>
            <div className="poem">
              <h1>{p.title}</h1>
              <div className="content">
                <p>{p.author}</p>
                <p dangerouslySetInnerHTML={{ __html: p.content }} />
              </div>
            </div>
            <Link to={`/read/${p.id}`}> Read more</Link>
          </div>
        );
      })}
    </div>
  );
};

export default PoemList;
