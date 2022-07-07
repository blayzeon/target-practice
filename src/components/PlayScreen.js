import React from "react";
import Target from "./Target";

export default function PlayScreen(props) {
  if (!props.hide) {
    return (
      <div>
        {props.targets.map((id) => {
          const handleClick = () => {
            props.remove(id);
          };

          return <Target key={id} id={id} handleClick={handleClick} />;
        })}
      </div>
    );
  }
}
