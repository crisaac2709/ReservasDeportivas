

export const Mensaje = ({texto, tipo}) => {
    const color = tipo === "error" ? "red" : "green"
    return (
        <p style={{ color }}>{texto}</p>
    )
}