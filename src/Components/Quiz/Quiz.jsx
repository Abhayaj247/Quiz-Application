import React, { useRef, useState, useEffect } from "react";
import "./Quiz.css";
import { useLocation } from "react-router-dom";
import dataA from "../../assets/dataA";
import dataB from "../../assets/dataB";
import dataC from "../../assets/dataC";
import { useNavigate } from "react-router-dom";
import { dataRef } from "../../assets/Firebase";
import { db } from "../../assets/Firebase";
const Quiz = () => {
  const navigate = useNavigate();
  let data = [];
  const location = useLocation();
  const username = location.state.username;
  const usernameLastChar = username.slice(-1);
  let [index, setIndex] = useState(0);
  if (usernameLastChar == "B") {
    data = dataB;
  } else if (usernameLastChar == "C") {
    data = dataC;
  } else if (usernameLastChar == "A") {
    data = dataA;
  }
  let [question, setQuestion] = useState(data[index]);
  let [lock, setLock] = useState(false);
  let [score, setScore] = useState(0);
  let [result, setResult] = useState(false);
  const [nameExists, setNameExists] = useState(false);
  let option1 = useRef(null);
  let option2 = useRef(null);
  let option3 = useRef(null);
  let option4 = useRef(null);

  let option_array = [option1, option2, option3, option4];

  const checkAns = (e, ans) => {
    if (lock === false) {
      if (question.ans === ans) {
        e.target.classList.add("correct");
        setLock(true);
        setScore((prev) => prev + 1);
      } else {
        e.target.classList.add("wrong");
        setLock(true);
        option_array[question.ans - 1].current.classList.add("correct");
      }
    }
  };

  const next = () => {
    if (lock === true) {
      if (index === data.length - 1) {
        setResult(true);
        return 0;
      }
      setIndex(++index);
      setQuestion(data[index]);
      setLock(false);
      option_array.map((option) => {
        option.current.classList.remove("wrong");
        option.current.classList.remove("correct");
        return null;
      });
    }
  };

  useEffect(() => {
    const checkIfNameExists = async () => {
      try {
        const querySnapshot = await db
          .collection("Scores")
          .where("Name", "==", username)
          .get();

        if (!querySnapshot.empty) {
          setNameExists(true);
        } else {
          setNameExists(false);
        }
      } catch (error) {
        console.error("Error checking name:", error);
      }
    };

    checkIfNameExists();
  }, [username]);

  const handleLeaderboard = () => {
    if (nameExists) {
      var washingtonRef = db.collection("Scores").doc("Quiz");
      return washingtonRef
        .update({
          Score: score,
        })
        .then(() => {
          navigate("/Leaderboard", { state: { username, score } });
        })
        .catch((error) => {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
        });
    } else {
      // Add a new document with a generated id.
      db.collection("Scores")
        .add({
          Name: username,
          Score: score,
        })
        .then((docRef) => {
          console.log("Document written with ID: ", docRef.id);
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
      navigate("/Leaderboard", { state: { username, score } });
    }
  };
  const reset = () => {
    setIndex(0);
    setQuestion(data[0]);
    setScore(0);
    setLock(false);
    setResult(false);
    navigate("/");
  };
  return (
    <div className="container">
      <h1>Quiz App</h1>
      <hr />
      {result ? (
        <></>
      ) : (
        <>
          <h2>
            {index + 1}. {question.question}
          </h2>
          <ul>
            <li
              ref={option1}
              onClick={(e) => {
                checkAns(e, 1);
              }}
            >
              {question.option1}
            </li>
            <li
              ref={option2}
              onClick={(e) => {
                checkAns(e, 2);
              }}
            >
              {question.option2}
            </li>
            <li
              ref={option3}
              onClick={(e) => {
                checkAns(e, 3);
              }}
            >
              {question.option3}
            </li>
            <li
              ref={option4}
              onClick={(e) => {
                checkAns(e, 4);
              }}
            >
              {question.option4}
            </li>
          </ul>
          <button onClick={next}>Next</button>
          <div className="index">
            {index + 1} of {data.length} questions
          </div>
        </>
      )}
      {result ? (
        <>
          <h2>
            You Scored {score} out of {data.length}
          </h2>
          <button onClick={reset}>Play Again</button>

          <button onClick={handleLeaderboard}>Leaderboard</button>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Quiz;
