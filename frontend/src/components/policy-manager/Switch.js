import React from 'react';
import './Switch.css'

const Switch = ({ id , isOn, handleToggle, onColor }) => {
  return (
    <>
    <div id={id}>
      <input
        checked={isOn}
        onChange={handleToggle}
        className="react-switch-checkbox"
        id={`react-switch-new`+id}
        type="checkbox"
      />
      <label
        style={{ background: isOn && onColor }}
        className="react-switch-label"
        htmlFor={`react-switch-new`+id}
      >
        <span className={`react-switch-button`} />
      </label>
      </div>
    </>
  );
};

export default Switch;