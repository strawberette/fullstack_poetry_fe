import { useState } from "react";

const WriteAPoem = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");

  const baseURL = "http://localhost/poems";

  const handleTitle = (e) => setTitle(e.target.value);
  const handleAuthor = (e) => setAuthor(e.target.value);
  const handleContent = (e) => setContent(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = JSON.stringify({
      title: title,
      author: author,
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

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input type="text" name="title" value={title} onChange={handleTitle} />
        <label htmlFor="author">Author</label>
        <input
          type="text"
          name="author"
          value={author}
          onChange={handleAuthor}
        />
        <label htmlFor="content"></label>
        <textarea
          type="text"
          name="content"
          value={content}
          onChange={handleContent}
        ></textarea>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};
export default WriteAPoem;
