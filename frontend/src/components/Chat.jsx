import React, { useState } from "react";
import StudentNav from "./StudentNav";
import axios from "axios";

const Chat = () => {
  const [userInput, setUserInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChat = async () => {
    if (!userInput.trim()) {
      setError("Please enter a query.");
      return;
    }

    setLoading(true);
    setError("");
    setResponse("");

    try {
      const res = await axios.post("/chatInput", {
        quest: userInput, // ✅ updated key name
      });

      setResponse(res.data.response); // Response will be HTML from backend
    } catch (err) {
      console.error("Error:", err);
      setError("Failed to get response from chatbot.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid">
      <StudentNav />
      <h2 className="text-center">Student Assistant Chatbot 🤖</h2>
      {response && (
        <div
          className="mt-4 p-3"
          dangerouslySetInnerHTML={{ __html: response }} // Render HTML response safely
        />
      )}

      {error && (
        <div className="m-4 text-danger">{error}</div>
      )}
      <br />
      <div className=" d-flex fixed-bottom">
      <input
        className="w-full m-2 p-3 rounded  form-control"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder="Ask something about resume, interview, or placement process..."
      />
      <button
        onClick={handleChat}
        disabled={loading}
      className="btn m-2 p-2 btn-primary"
      >
        {loading ? "Generating..." : "Ask__AI"}
      </button>
      <br/>
      </div>
    </div>
  );
};

export default Chat;
