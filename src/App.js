import React, { useState } from "react";
import PauseScreen from "./components/PauseScreen";
import PlayScreen from "./components/PlayScreen";
import TargetSpawner from "./components/TargetSpawner";
import { v4 as uuid4 } from "uuid";
import "./styling/app.css";

function App() {
  /* <SETTINGS> */
  let MAX_TARGETS = 5;
  let TARGET_SPEED = 5;
  let TARGET_WIDTH = 5;
  let TARGET_DELAY = 1000;

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

  setTargetWidth();

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

  function destroyTarget(id) {
    const targetElm = document.getElementById(id);
    targetElm.classList.add("explosion");
    targetElm.setAttribute("data", "animation");

    setTimeout(() => {
      targetElm.classList.remove("explosion");
      targetElm.style.display = "none";
      targetElm.setAttribute("data", "destroyed");
    }, 800);
  }

  const removeDestroyedTargets = () => {
    const destroyed = document.querySelectorAll('[data="destroyed"]');
    if (destroyed.length === 0) return;

    const newTargets = targets;
    destroyed.forEach((elm) => {
      const index = newTargets.indexOf(elm.id);
      if (newTargets[index]) {
        newTargets.splice(index, 1);
      } else {
        console.error(
          "destroyed element is not indexing properly for removeDestroyedTargets()."
        );
      }
    });
    setTargets([...newTargets]);
    addTarget(newTargets);
  };

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
    // clear destroyed
    removeDestroyedTargets();

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

    function isCollision(container, child) {
      const walls = container.getBoundingClientRect();
      const elm = child.getBoundingClientRect();

      if (
        walls.left >= elm.left ||
        walls.right <= elm.right ||
        walls.top >= elm.top ||
        walls.bottom <= elm.bottom
      ) {
        return true;
      }

      return false;
    }

    function moveTarget(
      target,
      left,
      top,
      speed = { left: 0, top: 0 },
      multiplier = 1
    ) {
      target.style.left = left + speed.left * multiplier + "px";
      target.style.top = top + speed.top * multiplier + "px";
    }

    allTargets.forEach((target) => {
      const moveMe = () => {
        const multiplier = target.getAttribute("data-speed");
        const direction = target.getAttribute("data-direction");

        // chooses the direction to move
        const speed = {
          left: direction === "left" ? TARGET_SPEED : 0,
          top: direction === "top" ? TARGET_SPEED : 0,
        };

        const left = target.offsetLeft;
        const top = target.offsetTop;
        moveTarget(target, left, top, speed, multiplier);
      };

      // check for new targets and relocate them to a random spot and assign a direction
      if (target.classList.contains("new-target")) {
        // place randomly
        const offsets = calcOffsets(containerElm, target);
        moveTarget(target, offsets.left, offsets.top);
        target.classList.remove("new-target");

        // assign direction based off of the furthest wall
        const direction = getRandomInt(2) === 0 ? "left" : "top";
        const containerSize =
          direction === "left" ? "clientWidth" : "clientHeight";
        const multiplier =
          offsets[direction] > containerElm[containerSize] / 2 ? -1 : 1;

        target.setAttribute("data-speed", multiplier);
        target.setAttribute("data-direction", direction);
      }

      // move the target

      moveMe();
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
          removeTarget={destroyTarget}
          containerId="target-container"
          getRandomInt={getRandomInt}
        />
      </div>
    </>
  );
}

export default App;
