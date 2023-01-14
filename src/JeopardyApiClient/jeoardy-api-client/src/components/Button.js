function Button({ title, ...otherProps }) {
  return (
    <button
      className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent to-blue-600"
      {...otherProps}
    >
      {title}
    </button>
  );
}

export default Button;
