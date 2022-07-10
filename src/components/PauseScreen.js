import React from "react";

export default function PauseScreen(props) {
  const setTargets = () => {
    const a = prompt(
      "Enter the max number of targets that can appear on screen: "
    );

    const answer = parseInt(a);
    if (!answer) return;
    if (isNaN(answer)) return;
    props.controls.max.set(answer);
  };

  const setSpeed = () => {
    const a = prompt(
      "Enter a number to multiply the speed of the targets by: "
    );

    const answer = parseInt(a);
    if (!answer) return;
    if (isNaN(answer)) return;
    props.controls.speed.set(answer);
  };

  const setWidth = () => {
    const a = prompt("Enter a number to multiply the size of targets by: ");

    const answer = parseInt(a);
    if (!answer) return;
    if (isNaN(answer)) return;

    props.controls.width.set(answer);
  };

  if (props.show) {
    return (
      <div id="pause-menu">
        <div className="control-menu flex-center">
          <h3>Settings</h3>
          <button onClick={setTargets}>
            Max Targets: {props.controls.max.current}
          </button>
          <button onClick={setSpeed}>
            Target Speed: {props.controls.speed.current}
          </button>
          <button onClick={setWidth}>
            Target Width: {props.controls.width.current}
          </button>
        </div>
        <div className="flex-center popup">
          <div>
            <p>The game is paused</p>
            <hr />
            <sup>press space to continue</sup>
          </div>
        </div>
        <div className="control-menu flex-center">
          <h3>Score</h3>
          <p>Current Score: {props.score}</p>
          <p>Current Streak: {props.streak}</p>
        </div>
      </div>
    );
  }
}
