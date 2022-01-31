// import "./App.css";

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Poem = (props) => {
  console.log(props.user);
  const [singlePoem, setSinglePoem] = useState({});
  const { id } = useParams();
  const baseURL = `${process.env.REACT_APP_BASE_URL}/poems/${id}`;
  // const baseURL = `https://noemi-poetry.herokuapp.com/poems/${id}`;

  useEffect(() => {
    const handleFetch = async () => {
      const response = await fetch(baseURL, {
        mode: "cors",
      });

      const resPoem = await response.json();

      setSinglePoem(resPoem.poem);
    };
    handleFetch();
  }, []);

  const handleDelete = async () => {
    await fetch(baseURL, {
      mode: "cors",
      method: "DELETE",
    });
  };

  return (
    <div className="poem">
      <h1>{singlePoem.title}</h1>
      <div className="content">
        <p>{singlePoem.author}</p>
        <p dangerouslySetInnerHTML={{ __html: singlePoem.content }} />
      </div>
      {!props.user ? (
        <></>
      ) : (
        <>
          <Link to={`/edit/${singlePoem.id}`}>Edit</Link>
          <button onClick={handleDelete}>Delete</button>
        </>
      )}

      <Link to="/">Home</Link>
    </div>
  );
};

export default Poem;
