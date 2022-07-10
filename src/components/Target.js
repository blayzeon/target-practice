import React from "react";

export default function Target(props) {
  return (
    <div
      id={props.id}
      className="new-target target"
      data="target"
      data-frame="0"
      data-reverse="true"
      onClick={props.handleClick}
    >
      <div>
        <div data="bullseye"></div>
      </div>
    </div>
  );
}
