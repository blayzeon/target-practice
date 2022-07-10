import React from "react";
import Target from "./Target";

export default function TargetSpawner(props) {
  return (
    <>
      {props.targets.map((id) => {
        const handleClick = (e) => {
          const score = e.target.getAttribute("data") === "bullseye" ? 5 : 1;
          props.incrScore(score);
          props.removeTarget(id);
        };

        return <Target key={id} id={id} handleClick={handleClick} />;
      })}
    </>
  );
}
