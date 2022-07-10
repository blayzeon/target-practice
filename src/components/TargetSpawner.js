import React from "react";
import Target from "./Target";

export default function TargetSpawner(props) {
  return (
    <>
      {props.targets.map((id) => {
        const handleClick = (e) => {
          // update score
          const score = e.target.getAttribute("data") === "bullseye" ? 5 : 1;
          props.incrScore(score);
          props.removeTarget(id);

          // create score popup
          const popup = props.createPopup();
          const x = e.clientX;
          const y = e.clientY;
          popup.style.left = x - 30 + "px";
          popup.style.top = y - 10 + "px";
          popup.innerText = score === 5 ? "bullseye!" : "hit!";
        };

        return <Target key={id} id={id} handleClick={handleClick} />;
      })}
    </>
  );
}
