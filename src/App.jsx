import React from "react";
import Quiz from "./Components/Quiz/Quiz";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import Leaderboard from "./assets/Leaderboard";

const App = () => {
   return (
      <BrowserRouter>
         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Quiz" element={<Quiz />} />
            <Route path="/Leaderboard" element={<Leaderboard />} />
         </Routes>
      </BrowserRouter>
   );
};

export default App;
