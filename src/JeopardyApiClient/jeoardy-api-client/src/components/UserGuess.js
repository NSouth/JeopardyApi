import React from "react";
import Button from "./Button";
import "react-select-search/style.css";

function UserGuess({ value, onValueChange, onSubmit }) {
  function onInputChange(e) {
    onValueChange(e.target.value);
  }

  function onFormSubmit(e) {
    e.preventDefault();
    onSubmit(value);
  }

  return (
    <form onSubmit={onFormSubmit}>
      <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
        <input
          className="mdl-textfield__input"
          type="text"
          id="guessInput"
          value={value}
          onChange={onInputChange}
        ></input>
        <label className="mdl-textfield__label" htmlFor="guessInput">
          Your guess
        </label>
      </div>
      <span className="ml-5">
        <Button title="Submit" />
      </span>
    </form>
  );
}

export default UserGuess;
