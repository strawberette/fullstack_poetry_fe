import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const Edit = (props) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { id } = useParams();
  const baseURL = `${process.env.REACT_APP_BASE_URL}/poems/${id}?secret_token=${props.user.jwt}`;
  // const baseURL = `https://noemi-poetry.herokuapp.com/poems/${id}`;

  const handleTitle = (e) => setTitle(e.target.value);
  const handleContent = (e) => setContent(e.target.value);

  useEffect(() => {
    const handleFetch = async () => {
      const response = await fetch(baseURL, {
        mode: "cors",
      });
      const resPoem = await response.json();

      setTitle(resPoem.poem.title);
      setContent(resPoem.poem.content);
    };
    handleFetch();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = JSON.stringify({
      title: title,
      userId: props.user.id,
      content: content,
    });

    await fetch(baseURL, {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: payload,
    });
  };

  if (!props.user) {
    return (
      <div className="App">
        <Link to="/register">Register</Link>
        <br />
        <Link to="/login">Log in</Link>
        <br />
        <Link to="/">Home</Link>
      </div>
    );
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input type="text" name="title" value={title} onChange={handleTitle} />
        <label htmlFor="author">Author</label>
        <label htmlFor="content"></label>
        <textarea
          type="text"
          name="content"
          value={content}
          onChange={handleContent}
        ></textarea>
        <input type="submit" value="Submit" />
      </form>
      <Link to="/">Home</Link>
    </div>
  );
};

export default Edit;
