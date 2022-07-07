import React, { useState } from "react";
import PauseScreen from "./components/PauseScreen";
import PlayScreen from "./components/PlayScreen";
import TargetSpawner from "./components/TargetSpawner";
import { v4 as uuid4 } from "uuid";
import "./styling/app.css";

function App() {
  const [pause, setPause] = useState(true);
  const [ticks, setTicks] = useState(null);
  const [targets, setTargets] = useState([uuid4()]);

  const toggleTicks = () => {
    if (pause) {
      const newTicks = setInterval(onTick, 500);
      setTicks(newTicks);
    } else {
      clearInterval(ticks);
    }
  };

  function onTick() {
    console.log("tick");
  }

  const togglePause = () => {
    // manage game loop
    setPause((prevState) => !prevState);
    toggleTicks();
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
      <TargetSpawner
        pause={pause}
        targets={targets}
        remove={removeTarget}
        className="container border"
        id="target-container"
      />
    </>
  );
}

export default App;
