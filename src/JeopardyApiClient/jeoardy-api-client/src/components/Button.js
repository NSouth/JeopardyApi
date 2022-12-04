function Button({title, onclick}){
    return <button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" onClick={onclick}>{title}</button>
}

export default Button