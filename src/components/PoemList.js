// import "./App.css";
import { Link } from "react-router-dom";
const PoemList = (props) => {
  console.log("props.user", props.user);
  return (
    <>
      <div className="poemList">
        {props.poemList.map((p, index) => {
          return (
            <div key={index} className="poemBox">
              <div className="poem">
                <h1>{p.title}</h1>
                <em>By {p.User.name}</em>
                <div className="content">
                  <p>{p.author}</p>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: `${p.content.substring(0, 350)}...`,
                    }}
                  />
                </div>
              </div>
              <Link to={`/read/${p.id}`}> Read more</Link>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default PoemList;
