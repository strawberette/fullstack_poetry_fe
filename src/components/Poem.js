// import "./App.css";

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";

const Poem = (props) => {
  const [singlePoem, setSinglePoem] = useState({});
  const [isDeleted, setIsDeleted] = useState(false);
  const { id } = useParams();
  const baseURL = `${process.env.REACT_APP_BASE_URL}/poems/${id}`;
  // const baseURL = `https://noemi-poetry.herokuapp.com/poems/${id}`;

  useEffect(() => {
    const handleFetch = async () => {
      try {
        const response = await fetch(baseURL, {
          mode: "cors",
        });

        const resPoem = await response.json();

        setSinglePoem(resPoem.poem);
      } catch (err) {
        setIsDeleted(true);
      }
    };
    handleFetch();
  }, []);

  const handleDelete = async () => {
    await fetch(`${baseURL}?secret_token=${props.user.jwt}`, {
      mode: "cors",
      method: "DELETE",
    });

    setIsDeleted(true);
  };

  if (isDeleted) {
    return <Redirect to="/" />;
  }

  return (
    <div className="poemBox">
      <h1>{singlePoem.title}</h1>
      <div className="content">
        <em>By {singlePoem.User ? singlePoem.User.name : ""}</em>
        <p dangerouslySetInnerHTML={{ __html: singlePoem.content }} />
      </div>
      {!props.user || props.user.id != singlePoem.UserId ? (
        <></>
      ) : (
        <>
          <Link to={`/edit/${singlePoem.id}`}>
            <button>Edit</button>
          </Link>
          <button onClick={handleDelete}>Delete</button>
        </>
      )}
    </div>
  );
};

export default Poem;
