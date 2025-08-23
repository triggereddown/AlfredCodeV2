import { useState, useEffect } from "react";
import Prism from "prismjs"; // ✅ Import Prism
import "prismjs/themes/prism-tomorrow.css";
import "./App.css";
import Editor from "react-simple-code-editor";
import axios from "axios";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css"; // ✅ Import highlight.js styles
import Markdown from "react-markdown";

function App() {
  const [count, setCount] = useState(0);
  const [code, setCode] = useState(`function sum() {
  return 1 + 1;
}`);

  const [review, setReview] = useState(``);

  useEffect(() => {
    Prism.highlightAll();
  }, []);

  const codeSnippet = `function sum() {
  return 1 + 1;
}`;

  // sending the request through post async and then wait until it's done
  async function reviewCode() {
    const response = await axios.post("https://alfred-code-review-backend.onrender.com/ai/get-review ", {
      code,
    });
    // State variable to store the review
    setReview(response.data);
    // console.log(response.data);
  }

  return (
    <>
      <div className="header">
        <h1>Code Review Tool</h1>
      </div>
      <main>
        <div className="left">
          <div className="codeInput">
            <Editor
              value={code}
              onValueChange={(code) => setCode(code)}
              highlight={(code) => Prism.highlight(code, Prism.languages.js)}
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 16,
                backgroundColor: "black",
                color: "white",
                height: "100%",
                width: "100%",
              }}
            />
          </div>
          <div className="submitButton" onClick={reviewCode}>
            <button className="btn-btn-primary" onClick={reviewCode}>
              Submit
            </button>
          </div>
        </div>
        <div className="right">
          <Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown>
        </div>
      </main>
    </>
  );
}

export default App;
