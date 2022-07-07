import React from "react";

export default function Target(props) {
  return (
    <div className="target" id={props.id} onClick={props.handleClick}></div>
  );
}
