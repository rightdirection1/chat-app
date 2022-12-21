import React from "react";
import { ThemeContext } from "../context/ThemeContext";
import "./ThemeChanger.css";

export default function Child() {
  const { toggle, toggleFunction } = React.useContext(ThemeContext);

  return (
    <div>
      <label>
        <input className="check-box" type="checkbox" onChange={toggleFunction} />
        <div className="toggle-switch"></div>
      </label>
    </div>
  );
}

