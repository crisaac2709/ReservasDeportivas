import "./Button.css"

export const Button = ({text, type, onClick}) => {
    return (
        <button
        className="boton"
        type = {type}
        onClick = {onClick}
        >
            {text}
        </button>
    )
}