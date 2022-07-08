import React from "react";
import Target from "./Target";

export default function TargetSpawner(props) {
  /*
  const container = document.getElementById(props.containerId);
  const border = container.getBoundingClientRect();
  const borders = {
    top: border.top,
    bottom: border.bottom,
    left: border.left,
    right: border.right,
  };
  */

  return (
    <>
      {props.targets.map((id) => {
        const handleClick = () => {
          props.remove(id);
        };

        const x = props.getRandomInt();

        return <Target key={id} id={id} handleClick={handleClick} />;
      })}
    </>
  );
}
