import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (username.length > 3) {
      // Pass the username as a parameter to the Quiz component
      navigate("/Quiz", { state: { username } });
    } else {
      alert("Enter a valid name");
    }
  };

  return (
    <div className="Lcontainer">
      <h1>
        <u>Welcome to Quiz Application</u>
      </h1>
      <form onSubmit={handleSubmit} className="Hform">
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your name..."
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Home;
