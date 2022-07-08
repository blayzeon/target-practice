import React, { useState } from "react";
import PauseScreen from "./components/PauseScreen";
import PlayScreen from "./components/PlayScreen";
import TargetSpawner from "./components/TargetSpawner";
import { v4 as uuid4 } from "uuid";
import "./styling/app.css";

function App() {
  /* <SETTINGS> */
  let MAX_TARGETS = 2;

  /* </SETTINGS> */
  const [pause, setPause] = useState(true);
  const [targets, setTargets] = useState([uuid4()]);
  const [ticks, setTicks] = useState(null);

  function getRandomInt(max, min = 0) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
    //The maximum is exclusive and the minimum is inclusive
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

  const toggleTicks = () => {
    if (pause) {
      const newTicks = setInterval(onTick, 500);
      setTicks((prevState) => newTicks);
    } else {
      clearInterval(ticks);
    }
  };

  const onTick = () => {
    if (targets.length < MAX_TARGETS) {
      addTarget();
    }

    const allTargets = document.querySelectorAll('[data="target"]');
    allTargets.forEach((target) => {
      const direction = getRandomInt(2) === 0 ? "left" : "top";
      const number = getRandomInt(20);
      const value = getRandomInt(2) === 0 ? number : number * -1;

      const x = target.offsetLeft;
      const y = target.offsetTop;

      target.style[direction] = x + value + "px";
    });
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
      <div id="target-container" className="container border">
        <TargetSpawner
          pause={pause}
          targets={targets}
          remove={removeTarget}
          containerId="target-container"
          getRandomInt={getRandomInt}
        />
      </div>
    </>
  );
}

export default App;
