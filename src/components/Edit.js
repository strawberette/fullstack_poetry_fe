import { useState, useEffect } from "react";
import { useParams, Link, Redirect } from "react-router-dom";

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
    return <Redirect to="/" />;
  }

  return (
    <div className="loginPage">
      <div className="loginForm">
        <img src="/Creative-writing-pana.png" width="300px" />
        <h1>Edit</h1>

        <form onSubmit={handleSubmit}>
          <label htmlFor="title">Title</label>
          <br />
          <input
            type="text"
            name="title"
            value={title}
            onChange={handleTitle}
          />
          <br />
          <br />

          <label htmlFor="content">Content</label>
          <br />
          <textarea
            rows="10"
            cols="50"
            type="text"
            name="content"
            value={content}
            onChange={handleContent}
          ></textarea>
          <br />
          <br />
          <input type="submit" value="Submit" />
        </form>
      </div>
    </div>
  );
};

export default Edit;
