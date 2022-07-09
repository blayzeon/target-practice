import React, { useState } from "react";
import PauseScreen from "./components/PauseScreen";
import PlayScreen from "./components/PlayScreen";
import TargetSpawner from "./components/TargetSpawner";
import { v4 as uuid4 } from "uuid";
import "./styling/app.css";

function App() {
  /* <SETTINGS> */
  let MAX_TARGETS = 12;
  let TARGET_SPEED = 1;

  /* </SETTINGS> */
  const [pause, setPause] = useState(true);
  const [targets, setTargets] = useState([]);
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
    addTarget(targets);
  };

  function addTarget(currentTargets, amount = MAX_TARGETS) {
    if (currentTargets.length < amount) {
      const newTargets = currentTargets;
      newTargets.push(uuid4());
      setTargets([...newTargets]);

      addTarget(newTargets, amount);
    }
  }

  function removeTarget(id) {
    const newTargets = targets;
    const index = newTargets.indexOf(id);
    newTargets.splice(index, 1);
    setTargets([...newTargets]);

    addTarget(newTargets);
  }

  const toggleTicks = () => {
    if (pause) {
      // unpause the game
      const newTicks = setInterval(onTick, 500);
      setTicks((prevState) => newTicks);
    } else {
      // pause the game
      clearInterval(ticks);
    }
  };

  const onTick = () => {
    // move targets
    const allTargets = document.querySelectorAll('[data="target"]');
    allTargets.forEach((target) => {
      const direction = "left"; //getRandomInt(2) === 0 ? "left" : "top";
      const containerElm = document.querySelector("#target-container");
      const container = containerElm.getBoundingClientRect();
      const elm = target.getBoundingClientRect();

      function moveTarget(object, direction, speed) {
        const offset = direction === "left" ? "offsetLeft" : "offsetTop";

        object.style[direction] = object[offset] + speed + "px";
      }

      let value = TARGET_SPEED; //getRandomInt(2) === 0 ? number : TARGET_SPEED * -1;
      if (container.right <= elm.right) {
        value = TARGET_SPEED * -1;
      }

      //moveTarget(target, direction, TARGET_SPEED);
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
          removeTarget={removeTarget}
          containerId="target-container"
          getRandomInt={getRandomInt}
        />
      </div>
    </>
  );
}

export default App;
