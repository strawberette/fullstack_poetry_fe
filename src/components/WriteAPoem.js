import { useState } from "react";
import { Redirect } from "react-router-dom";

const WriteAPoem = (props) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isCreated, setIsCreated] = useState(false);

  const baseURL = `${process.env.REACT_APP_BASE_URL}/poems`;
  // const baseURL = `https://noemi-poetry.herokuapp.com/poems/`;

  const handleTitle = (e) => setTitle(e.target.value);
  const handleContent = (e) => setContent(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = JSON.stringify({
      title: title,
      userId: props.user.id,
      content: content,
    });

    await fetch(`${baseURL}?secret_token=${props.user.jwt}`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: payload,
    });
    setIsCreated(true);
  };
  if (!props.user || isCreated) {
    return <Redirect to="/" />;
  }

  return (
    <div className="loginPage">
      <div className="loginForm">
        <img src="/Creative-writing-pana.png" width="300px" />
        <h1>Write a poem</h1>
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
          <br></br>
          <textarea
            rows="10"
            cols="50"
            type="text"
            name="content"
            value={content}
            onChange={handleContent}
          ></textarea>
          <br /> <br />
          <input type="submit" value="Submit" />
        </form>
      </div>
    </div>
  );
};
export default WriteAPoem;
