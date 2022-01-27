// import "./App.css";

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Poem = () => {
  const [singlePoem, setSinglePoem] = useState({});
  const { id } = useParams();
  const baseURL = `http://localhost/poems/${id}`;

  useEffect(() => {
    handleFetch();
  }, []);

  const handleFetch = async () => {
    const response = await fetch(baseURL, {
      mode: "cors",
    });

    const resPoem = await response.json();

    setSinglePoem(resPoem.poem);
  };

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
      <Link to={`/edit/${singlePoem.id}`}>Edit</Link>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default Poem;
