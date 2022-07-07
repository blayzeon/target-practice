import React, { useState } from "react";
import PauseScreen from "./components/PauseScreen";
import PlayScreen from "./components/PlayScreen";
import "./styling/app.css";

function App() {
  const [pause, setPause] = useState();

  const togglePause = () => {
    setPause(!pause);
  };

  window.onkeydown = (e) => {
    e.preventDefault();
    if (e.keyCode === 32) {
      togglePause();
    }
  };

  return (
    <div>
      <PauseScreen show={pause} />
      <PlayScreen hide={pause} />
    </div>
  );
}

export default App;
