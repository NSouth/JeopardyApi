function Button(props){
    return <button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" onClick={props.onclick}>{props.title}</button>
}

export default Button