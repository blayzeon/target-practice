import React, { useState } from "react";
import PauseScreen from "./components/PauseScreen";
import PlayScreen from "./components/PlayScreen";
import TargetSpawner from "./components/TargetSpawner";
import { v4 as uuid4 } from "uuid";
import "./styling/app.css";

function App() {
  const [pause, setPause] = useState();
  const [targets, setTargets] = useState([uuid4()]);

  const togglePause = () => {
    setPause(!pause);
  };

  function removeTarget(id) {
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
    <>
      <PauseScreen show={pause} />
      <PlayScreen hide={pause} />
      <div className="container border">
        <TargetSpawner pause={pause} targets={targets} remove={removeTarget} />
      </div>
    </>
  );
}

export default App;
