import React from "react";

export default function Target(props) {
  return (
    <div id={props.id} data="target" onClick={props.handleClick}>
      {props.id}
    </div>
  );
}
