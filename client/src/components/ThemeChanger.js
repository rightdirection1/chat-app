import React from "react";
import { ThemeContext } from "../context/ThemeContext";
import "./ThemeChanger.css";

export default function Child() {
  const { toggle, toggleFunction } = React.useContext(ThemeContext);

  return (
    <div>
      <label>
        <input type="checkbox" onChange={toggleFunction} />
        <div class="toggle-switch"></div>
      </label>
    </div>
  );
}
