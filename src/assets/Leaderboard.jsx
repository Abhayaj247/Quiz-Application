import React, { useState, useEffect } from "react";
import { db } from "./Firebase";
import "../Components/Quiz/Quiz.css";
import { useNavigate } from "react-router-dom";
const Leaderboard = () => {
  const [scores, setScores] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    db.collection("Scores")
      .get()
      .then((querySnapshot) => {
        const scoresArray = [];
        querySnapshot.forEach((doc) => {
          scoresArray.push(doc.data());
        });

        // Sort the scoresArray based on the "Score" property in descending order
        const sortedScores = scoresArray.sort((a, b) => b.Score - a.Score);

        setScores(sortedScores);
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  }, []);

  console.log("Type of scores:", typeof scores);
  console.log("Content of scores:", scores);

  return (
    <div className="Lcontainer">
      <h1>Leaderboard</h1>
      <table className="Ltable">
        <thead>
          <tr>
            <th className="Lhead">Name</th>
            <th className="Lhead">Score</th>
          </tr>
        </thead>
        <tbody>
          {scores.map((score, index) => (
            <tr key={index}>
              <td className="Lrow">{score.Name}</td>
              <td className="Lrow">{score.Score}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        className="Lbutton"
        onClick={() => {
          navigate("/");
        }}
      >
        Play again
      </button>
    </div>
  );
};

export default Leaderboard;
