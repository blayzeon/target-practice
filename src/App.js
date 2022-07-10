import React, { useState } from "react";
import PauseScreen from "./components/PauseScreen";
import TargetSpawner from "./components/TargetSpawner";
import { v4 as uuid4 } from "uuid";
import "./styling/app.css";

function App() {
  /* <SETTINGS> */
  const MOVEMENT_LAG = 60;
  const [SPAWN_TIMER, setTimer] = useState(700);
  const [score, setScore] = useState(0);
  const [MAX_TARGETS, setMaxTargets] = useState(4);
  const [TARGET_SPEED, setTargetSpeed] = useState(3);
  const [TARGET_WIDTH, setMaxWidth] = useState(5);
  const [streak, setStreak] = useState(0);
  const [pIndex, setIndex] = useState(false);
  const PATTERNS = [
    [
      {
        name: "straight (x-axis)",
        speed: [TARGET_SPEED, 0], // left
        multiplier: [2, 2],
      },
    ],
    [
      {
        name: "straight (y-axis)",
        speed: [0, TARGET_SPEED], // up
        multiplier: [2, 2],
      },
    ],
    [
      {
        name: "diagonal (up)",
        speed: [TARGET_SPEED, TARGET_SPEED], // diagonal
        multiplier: [1, 1],
      },
    ],
    [
      {
        name: "diagonal (down)",
        speed: [TARGET_SPEED, TARGET_SPEED], // diagonal
        multiplier: [-1, -1],
      },
    ],
    [
      {
        name: "L",
        speed: [0, TARGET_SPEED], // down
        multiplier: [-2, -2],
      },
      {
        speed: [0, TARGET_SPEED],
        multiplier: [-2, -2],
      },
      {
        speed: [0, TARGET_SPEED],
        multiplier: [-2, -2],
      },
      {
        speed: [0, TARGET_SPEED],
        multiplier: [-2, -2],
      },
      {
        speed: [0, TARGET_SPEED],
        multiplier: [-2, -2],
      },
      {
        speed: [0, TARGET_SPEED],
        multiplier: [-2, -2],
      },
      {
        speed: [0, 0],
        multiplier: [-1, -1],
      },
      {
        // L-shape
        speed: [0, TARGET_SPEED], // down
        multiplier: [-2, -2],
      },
      {
        speed: [0, TARGET_SPEED],
        multiplier: [-2, -2],
      },
      {
        speed: [0, TARGET_SPEED],
        multiplier: [-2, -2],
      },
      {
        speed: [0, TARGET_SPEED],
        multiplier: [-2, -2],
      },
      {
        speed: [0, TARGET_SPEED],
        multiplier: [-2, -2],
      },
      {
        speed: [0, TARGET_SPEED],
        multiplier: [-2, -2],
      },
      {
        speed: [0, 0],
        multiplier: [-1, -1],
      },
      {
        speed: [TARGET_SPEED, 0], // right
        multiplier: [-2, -2],
      },
      {
        speed: [TARGET_SPEED, 0],
        multiplier: [-2, -2],
      },
      {
        speed: [TARGET_SPEED, 0],
        multiplier: [-2, -2],
      },
      {
        speed: [TARGET_SPEED, 0],
        multiplier: [-2, -2],
      },
      {
        speed: [TARGET_SPEED, 0],
        multiplier: [-2, -2],
      },
      {
        speed: [TARGET_SPEED, 0],
        multiplier: [-2, -2],
      },
      {
        speed: [TARGET_SPEED, 0],
        multiplier: [-2, -2],
      },
    ],
    [
      {
        name: "leap",
        speed: [0, 0], // pause
        multiplier: [5, 5],
      },
      {
        speed: [0, 0],
        multiplier: [5, 5],
      },
      {
        speed: [0, 0],
        multiplier: [5, 5],
      },
      {
        speed: [0, 0],
        multiplier: [5, 5],
      },
      {
        speed: [0, 0],
        multiplier: [5, 5],
      },
      {
        speed: [0, 0],
        multiplier: [5, 5],
      },
      {
        speed: [0, 0],
        multiplier: [5, 5],
      },
      {
        speed: [0, 0],
        multiplier: [5, 5],
      },
      {
        speed: [0, 0],
        multiplier: [5, 5],
      },
      {
        speed: [0, 0],
        multiplier: [5, 5],
      },
      {
        speed: [0, 0],
        multiplier: [5, 5],
      },
      {
        speed: [0, TARGET_SPEED], // up
        multiplier: [5, 5],
      },
      {
        speed: [0, TARGET_SPEED], // up
        multiplier: [5, 5],
      },
    ],
    [
      {
        name: "sling",
        speed: [TARGET_SPEED, 0], // windup
        multiplier: [-4, 0],
      },
      {
        speed: [TARGET_SPEED, 0],
        multiplier: [-3, 0],
      },
      {
        speed: [TARGET_SPEED, 0],
        multiplier: [-2, 0],
      },
      {
        speed: [TARGET_SPEED, 0],
        multiplier: [-1, 0],
      },
      {
        speed: [TARGET_SPEED, 0],
        multiplier: [0, 0],
      },
      {
        speed: [0, 0],
        multiplier: [5, 5],
      },
      {
        speed: [0, 0],
        multiplier: [5, 5],
      },
      {
        speed: [0, 0],
        multiplier: [5, 5],
      },
      {
        speed: [0, 0],
        multiplier: [5, 5],
      },
      {
        speed: [0, 0],
        multiplier: [5, 5],
      },
      {
        speed: [0, 0],
        multiplier: [5, 5],
      },
      {
        speed: [0, 0],
        multiplier: [5, 5],
      },
      {
        speed: [0, 0],
        multiplier: [5, 5],
      },
      {
        speed: [0, 0],
        multiplier: [5, 5],
      },
      {
        speed: [0, 0],
        multiplier: [5, 5],
      },
      {
        speed: [0, 0],
        multiplier: [5, 5],
      },
      {
        speed: [0, 0],
        multiplier: [5, 5],
      },
      {
        speed: [0, 0],
        multiplier: [5, 5],
      },
      {
        speed: [0, 0],
        multiplier: [5, 5],
      },
      {
        speed: [0, 0],
        multiplier: [5, 5],
      },
      {
        speed: [0, 0],
        multiplier: [5, 5],
      },
      {
        speed: [TARGET_SPEED, 0], // left
        multiplier: [32, 32],
      },
      {
        speed: [TARGET_SPEED, 0],
        multiplier: [16, 16],
      },
      {
        speed: [TARGET_SPEED, 0],
        multiplier: [8, 8],
      },
      {
        speed: [TARGET_SPEED, 0],
        multiplier: [4, 4],
      },
      {
        speed: [TARGET_SPEED, 0],
        multiplier: [2, 2],
      },
      {
        speed: [TARGET_SPEED, 0],
        multiplier: [1, 1],
      },
    ],
    [
      {
        name: "spiral",
        speed: [0, TARGET_SPEED], // down
        multiplier: [-1, -1],
      },
      {
        speed: [0, TARGET_SPEED], // down
        multiplier: [-1, -1],
      },
      {
        speed: [TARGET_SPEED, TARGET_SPEED], // diagonal
        multiplier: [-1, -1],
      },
      {
        speed: [TARGET_SPEED, 0], // right
        multiplier: [-1, -1],
      },
      {
        speed: [TARGET_SPEED, 0], // right
        multiplier: [-1, -1],
      },
      {
        speed: [TARGET_SPEED, TARGET_SPEED], // diagonal
        multiplier: [-1, 1],
      },
      {
        speed: [0, TARGET_SPEED], // up
        multiplier: [1, 1],
      },
      {
        speed: [TARGET_SPEED, TARGET_SPEED], // diagonal
        multiplier: [1, 1],
      },
      {
        speed: [TARGET_SPEED, 0], // left
        multiplier: [1, 1],
      },
      {
        speed: [TARGET_SPEED, TARGET_SPEED], // diagonal
        multiplier: [1, -1],
      },
    ],
  ];

  const [pause, setPause] = useState(true);
  const [targets, setTargets] = useState([]);
  const [ticks, setTicks] = useState({ move: null, spawn: null });
  /* </SETTINGS> */

  const togglePatterns = () => {
    const patternsCopy = PATTERNS;

    if (pIndex === false) {
      setIndex(0);
      return patternsCopy[0][0].name;
    }

    const nextIndex = pIndex + 1;
    if (nextIndex >= PATTERNS.length) {
      setIndex(false);
      return "random";
    }

    setIndex((prevIndex) => (prevIndex += 1));
    return patternsCopy[nextIndex][0].name;
  };

  function updateSpawnTimer(newTime) {
    setTimer(newTime);
  }

  const handleMove = () => {
    // move targets
    const allTargets = document.querySelectorAll('[data="target"]');
    const containerElm = document.querySelector("#target-container");

    function calcOffsets(container, elm) {
      const big = container.getBoundingClientRect();
      const small = elm;

      const left = getRandomInt(
        big.right - small.clientWidth * 1.5,
        big.left + small.clientWidth * 1.5
      );

      const top = getRandomInt(
        big.bottom - small.clientHeight * 1.5,
        big.top + small.clientHeight * 1.5
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
      patternObj,
      frame,
      reverse = [1, 1],
      leftOffset,
      topOffset
    ) {
      const left = leftOffset ? leftOffset : target.offsetLeft;
      const top = topOffset ? topOffset : target.offsetTop;
      const obj = patternObj[frame] ? patternObj[frame] : patternObj[0];
      target.style.left =
        left + obj.speed[0] * obj.multiplier[0] * reverse[0] + "px";
      target.style.top =
        top + obj.speed[1] * obj.multiplier[1] * reverse[1] + "px";
    }

    allTargets.forEach((target) => {
      const moveMe = () => {
        const frame = parseInt(target.getAttribute("data-frame"));
        const patternIndex = target.getAttribute("id").split(",");
        const myPattern = PATTERNS[pIndex === false ? patternIndex[1] : pIndex];

        // spawn kill protection
        let reverse = target.getAttribute("data-reverse");

        if (reverse === "true") {
          reverse = [];
          const offsets = calcOffsets(containerElm, target);
          reverse.push(offsets.left > containerElm.clientWidth * 0.3 ? -1 : 1);
          reverse.push(offsets.top > containerElm.clientHeight * 0.3 ? -1 : 1);
          target.setAttribute("data-reverse", `${reverse[0]},${reverse[1]}`);
        } else {
          reverse = reverse.split(",");
        }

        // move the target and increase frame
        moveTarget(target, myPattern, frame, reverse);
        const newIndex = frame + 1 > myPattern.length - 1 ? 0 : frame + 1;
        target.setAttribute("data-frame", newIndex);
      };

      // check for new targets and relocate them to a random spot and assign a direction
      if (target.classList.contains("new-target")) {
        // place randomly
        const offsets = calcOffsets(containerElm, target);
        moveTarget(
          target,
          [
            {
              speed: [0, 0],
              multiplier: [1, 1],
            },
          ],
          0,
          [1, 1],
          offsets.left,
          offsets.top
        );
        target.classList.remove("new-target");
      }

      // move the target
      moveMe();
      if (isCollision(containerElm, target)) {
        updateScore(-1);
        const popup = createPopup();

        // grabs the coordinate from the style string and formats it into an array
        let coords = target
          .getAttribute("style")
          .replace("left: ", "")
          .replace("px; top:", "")
          .replace("px;", "")
          .split(" ");

        popup.style.left = coords[0] + "px";
        popup.style.top = coords[1] + "px";
        popup.innerText = "miss!";

        destroyTarget(target.getAttribute("id"));
      }
    });
  };

  const removeDestroyedTargets = () => {
    const destroyed = document.querySelector("[data-destroyed]");
    if (!destroyed) return targets;

    const newTargets = targets;
    const index = newTargets.indexOf(destroyed.id);
    if (newTargets[index]) {
      newTargets.splice(index, 1);
      setTargets([...newTargets]);
      return newTargets;
    } else {
      console.error(
        "destroyed element is not indexing properly for removeDestroyedTargets()."
      );
    }
  };

  const handleSpawn = () => {
    const currentTargets = removeDestroyedTargets();
    addTarget(currentTargets);
  };

  function toggleTicks(clearCondition = true, startCondition = true) {
    if (clearCondition) {
      clearInterval(ticks.spawn);
      clearInterval(ticks.move);
    }

    if (startCondition) {
      const move = setInterval(handleMove, MOVEMENT_LAG);
      //handleSpawn();
      const spawn = setInterval(handleSpawn, SPAWN_TIMER);
      setTicks({ move: move, spawn: spawn });

      if (score === 0) {
        handleSpawn();
      }
    }
  }

  function updateScore(amount) {
    if (amount > 0) {
      updateStreak(true);
    } else {
      updateStreak(false);
    }

    setScore((prevScore) => (prevScore += amount));
  }

  function updateStreak(bool) {
    if (bool) {
      setStreak((prevStreak) => (prevStreak += 1));
    } else {
      setStreak(0);
    }
  }

  function setTargetWidth(width) {
    if (isNaN(width)) return;

    if (width != TARGET_WIDTH) {
      setMaxWidth(width);
    }
    document
      .querySelector(":root")
      .style.setProperty("--TARGET_WIDTH", width + "rem");
  }

  setTargetWidth(TARGET_WIDTH);

  function getRandomInt(max, min = 0) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
    //The maximum is exclusive and the minimum is inclusive
  }

  const togglePause = () => {
    // manage game loop
    setPause((prevState) => !prevState);
    toggleTicks(!pause, pause);
  };

  function addTarget(currentTargets, amount = MAX_TARGETS) {
    if (currentTargets.length < amount) {
      const newTargets = currentTargets;
      const elmId = uuid4() + "," + getRandomInt(PATTERNS.length, 0);
      newTargets.push(elmId);
      setTargets([...newTargets]);
    }
  }

  function destroyTarget(id) {
    const targetElm = document.getElementById(id);
    targetElm.classList.add("explosion");
    targetElm.setAttribute("data", "animation");

    setTimeout(() => {
      targetElm.classList.remove("explosion");
      targetElm.style.display = "none";
      targetElm.setAttribute("data-destroyed", "true");
    }, 800);
  }

  const createPopup = () => {
    const popup = document.createElement("div");
    popup.classList.add("popup-message");
    document.getElementById("root").appendChild(popup);

    // timeout should match .popup-message animation time
    setTimeout(() => {
      popup.remove();
    }, 3000);
    return popup;
  };

  window.onkeydown = (e) => {
    e.preventDefault();
    if (e.keyCode === 32) {
      togglePause();
    }
  };

  const controls = {
    max: { current: MAX_TARGETS, set: setMaxTargets },
    speed: { current: TARGET_SPEED, set: setTargetSpeed },
    width: { current: TARGET_WIDTH, set: setTargetWidth },
    spawn: { current: SPAWN_TIMER, set: updateSpawnTimer },
    pattern: { current: pIndex, set: togglePatterns },
  };

  return (
    <>
      <PauseScreen
        show={pause}
        controls={controls}
        score={score}
        streak={streak}
      />
      <div id="target-container" className="container border">
        <TargetSpawner
          pause={pause}
          targets={targets}
          width={TARGET_WIDTH}
          removeTarget={destroyTarget}
          containerId="target-container"
          getRandomInt={getRandomInt}
          incrScore={updateScore}
          createPopup={createPopup}
        />
      </div>
    </>
  );
}

export default App;
