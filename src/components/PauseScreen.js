import React from "react";

export default function PauseScreen(props) {
  if (props.show) {
    return (
      <div id="pause-menu" className="flex-center">
        <div className="flex-center">
          <div>
            <p>The game is paused</p>
            <hr />
            <sup>press space to continue</sup>
          </div>
        </div>
      </div>
    );
  }
}
