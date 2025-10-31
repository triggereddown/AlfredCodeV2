import React, { useState, useEffect } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import "./Review.css";
import Editor from "react-simple-code-editor";
import axios from "axios";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import Markdown from "react-markdown";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Review = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState(`function sum() {
  return 1 + 1;
}`);
  const [review, setReview] = useState(``);

  useEffect(() => {
    Prism.highlightAll();
  }, []);

  async function reviewCode() {
    try {
      const response = await axios.post(
        // "https://alfredchatv2backend.onrender.com/ai/get-review",
        "http://localhost:3000/ai/get-review",
        {
          code,
        }
      );
      setReview(response.data);
    } catch (error) {
      console.error("Error fetching review:", error);
    }
  }

  const logoutHandler = async () => {
    try {
      const response = await axios.get(
        "https://alfredchatv2backend.onrender.com/api/v1/user/logout"
      );
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/login");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const goHomeHandler = () => {
    navigate("/home"); // navigate back to home
  };

  return (
    <div className="reviewPage">
      <div className="header">
        <h1>Code Review Tool</h1>
      </div>
      <main>
        <div className="left">
          <div className="codeInput">
            <Editor
              value={code}
              onValueChange={(code) => setCode(code)}
              highlight={(code) =>
                Prism.highlight(code, Prism.languages.js, "javascript")
              }
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

          <div className="buttonGroup">
            <button className="btn-btn-primary" onClick={reviewCode}>
              Submit
            </button>

            <button className="btn-secondary" onClick={goHomeHandler}>
              Back to Home
            </button>

            <button className="btn-btn-primary" onClick={logoutHandler}>
              Logout
            </button>
          </div>
        </div>

        <div className="right">
          <Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown>
        </div>
      </main>
    </div>
  );
};

export default Review;
