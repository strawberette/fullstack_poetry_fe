import { useState } from "react";
import { Link } from "react-router-dom";

const WriteAPoem = (props) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const baseURL = `${process.env.REACT_APP_BASE_URL}/poems`;
  // const baseURL = `https://noemi-poetry.herokuapp.com/poems/`;

  const handleTitle = (e) => setTitle(e.target.value);
  const handleContent = (e) => setContent(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = JSON.stringify({
      title: title,
      author: props.user.username,
      content: content,
    });

    await fetch(baseURL, {
      method: "POST",
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
export default WriteAPoem;
