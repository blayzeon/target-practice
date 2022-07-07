import React from "react";
import Target from "./Target";

export default function TargetSpawner(props) {
  return (
    <div id={props.id} className={props.className}>
      {props.targets.map((id) => {
        const handleClick = () => {
          props.remove(id);
        };

        const moveTarget = () => {
          function move(id) {
            if (props.pause) {
              clearInterval(movement);
            }

            const elm = document.getElementById(id);
            const x = elm.offsetLeft;
            const y = elm.offsetTop;

            elm.style.left = x + 5 + "px";
            console.log(elm);
          }

          let movement = setInterval(move, 1000);
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
    </div>
  );
}
