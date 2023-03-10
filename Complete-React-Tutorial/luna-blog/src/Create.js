import { useState } from "react";
import { useHistory } from "react-router-dom";

const Create = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [author, setAuthor] = useState('mario');
  const [isPeding, setIsPeding] = useState(false);
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    const blog = {title, body, author};

    setIsPeding(true);

    fetch('http://localhost:8000/blogs', {
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(blog) 
    }).then(()=>{
      console.log('new post added');
      setIsPeding(false);
      history.push('/');
    })
  }

  return (
    <div className="create">
      <h2>Add a new Blog</h2>
      <form onSubmit={handleSubmit}>
        <label>Blog Title:</label>
        <input 
            type="text" 
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
        />
        <label>Blog Body</label>
        <textarea 
            required
            value={body}
            onChange={(e)=>setBody(e.target.value)}
        ></textarea>
        <label>Blog Author</label>
        <select
          value={author}
          onChange={(e)=>setAuthor(e.target.value)}
        >
            <option value="mario">Mario</option>
            <option value="yoshi">Yoshi</option>
        </select>
        { !isPeding && <button>Add Blog</button>}
        { isPeding && <button disabled>Adding Post...</button>}
        <p>Title: {title}</p>
        <p>Body: {body}</p>
        <p>Author: {author}</p>
      </form>
    </div>
  );
};

export default Create;
