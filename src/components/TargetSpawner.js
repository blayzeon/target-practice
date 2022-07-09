import React from "react";
import Target from "./Target";

export default function TargetSpawner(props) {
  return (
    <>
      {props.targets.map((id) => {
        const handleClick = () => {
          props.removeTarget(id);
        };

        return <Target key={id} id={id} handleClick={handleClick} />;
      })}
    </>
  );
}
