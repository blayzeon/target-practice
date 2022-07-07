import React from "react";
import Target from "./Target";

export default function TargetSpawner(props) {
  const moveTarget = () => {
    function move() {
      if (props.pause) {
        clearInterval(movement);
      }

      console.log("i moved");
    }

    let movement = setInterval(move, 1000);
  };
  return (
    <>
      {props.targets.map((id) => {
        const handleClick = () => {
          props.remove(id);
        };

        return (
          <Target
            key={id}
            id={id}
            handleClick={handleClick}
            move={moveTarget}
          />
        );
      })}
    </>
  );
}
