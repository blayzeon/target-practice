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
  let TARGET_WIDTH = 5;

  /* </SETTINGS> */

  const [pause, setPause] = useState(true);
  const [targets, setTargets] = useState([]);
  const [ticks, setTicks] = useState(null);

  const setTargetWidth = () => {
    // Any smaller than 3rem and the targets are too tiny
    if (TARGET_WIDTH < 3) return;

    document
      .querySelector(":root")
      .style.setProperty("--TARGET_WIDTH", TARGET_WIDTH + "rem");
  };

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
    const containerElm = document.querySelector("#target-container");

    function calcOffsets(container, elm) {
      const big = container.getBoundingClientRect();
      const small = elm;

      const left = getRandomInt(
        big.right - small.clientWidth,
        big.left + small.clientWidth
      );

      const top = getRandomInt(
        big.bottom - small.clientHeight,
        big.top + small.clientHeight
      );

      return { top, left };
    }

    allTargets.forEach((target) => {
      const elm = target.getBoundingClientRect();

      function moveTarget(left, top, speed = 0) {
        target.style.left = left + speed + "px";
        target.style.top = top + speed + "px";
      }

      // check for new targets and relocate them to a random spot
      if (target.classList.contains("new-target")) {
        const offsets = calcOffsets(containerElm, target);
        moveTarget(offsets.left, offsets.top);
        target.classList.remove("new-target");
      }
      const direction = "left"; //getRandomInt(2) === 0 ? "left" : "top";

      let value = TARGET_SPEED; //getRandomInt(2) === 0 ? number : TARGET_SPEED * -1;

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
          width={TARGET_WIDTH}
          removeTarget={removeTarget}
          containerId="target-container"
          getRandomInt={getRandomInt}
        />
      </div>
    </>
  );
}

export default App;
