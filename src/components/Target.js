import React from "react";

export default function Target(props) {
  return (
    <div
      className="target"
      id={props.id}
      data="target"
      onClick={props.handleClick}
    ></div>
  );
}
