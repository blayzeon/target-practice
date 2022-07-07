import React, { useState } from "react";
import PauseScreen from "./components/PauseScreen";
import PlayScreen from "./components/PlayScreen";
import { v4 as uuid4 } from "uuid";
import "./styling/app.css";

function App() {
  const [pause, setPause] = useState();
  const [targets, setTargets] = useState([uuid4()]);

  const togglePause = () => {
    setPause(!pause);
  };

  function removeTarget(id) {
    console.log(id);
    const index = targets.indexOf(id);
    const newTargets = targets;
    newTargets.splice(index, 1);
    setTargets([...newTargets]);
  }

  const addTarget = () => {
    setTargets([...targets, uuid4()]);
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
      <PlayScreen
        hide={pause}
        targets={targets}
        remove={removeTarget}
        add={addTarget}
      />
    </div>
  );
}

export default App;
