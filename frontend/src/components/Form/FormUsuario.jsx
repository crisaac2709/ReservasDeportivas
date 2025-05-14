import { InputField } from "../Input/InputField"
import { Button } from "../Button/Button"
import { Mensaje } from "../Mensaje"
import { useState } from "react"
import axios from "axios"
import "./FormUsuario.css"

export const FormUsuario = () => {
    const [form, setForm] = useState({
        nombres: "",
        apellidos: "",
        email: "",
        telefono: "",
        rol: "",
        password: ""
    })

    const [errores, setErrores] = useState({})

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const validar = () => {
        const errores = {}
        const soloLetras = /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]{3,}$/
        const soloNumeros = /^[0-9]{10}$/
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        const contrasenaFuerte = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/

        if (!soloLetras.test(form.nombres)) {
            errores.nombres = "Solo letras, minimo 3 caracteres"
        }

        if (!soloLetras.test(form.apellidos)) {
            errores.apellidos = "Solo letras, minimo 3 caracteres"
        }

        if (!soloNumeros.test(form.telefono)) {
            errores.telefono = "Solo numeros, deben haber 10 caracteres"
        }

        if (!emailRegex.test(form.email)) {
            errores.email = "Email invalido"
        }

        if (!form.rol) {
            errores.rol = "Selecciona un rol!"
        }

        if (!contrasenaFuerte.test(form.password)) {
            errores.password = "Minimo 8 caracteres, una mayuscula, una minuscula y un numero"
        }

        setErrores(errores)
        return Object.keys(errores).length === 0
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (validar()) {
            console.log("Formulario valido")
            try {
                const respuesta = await axios.post("http://localhost:4000/api/auth/registro", form)
                console.log("Cliente Registrada ✅", respuesta.data)
                window.location.href = "/login";

                // Resetear formulario
                setForm({
                    nombres: "",
                    apellidos: "",
                    telefono: "",
                    email: "",
                    rol: "",
                    password: ""
                });

                // Mensaje opcional de éxito
                alert("Usuario guardado correctamente ✅");
                } catch (error) {
                console.error("Error al guardar el usuario", error);
                alert("Hubo un error al registrar el usuario");
                }
            }
        }
    

    return (
        <form onSubmit={handleSubmit} className="formulario-usuario">
            <InputField
                type="text"
                label="Nombres"
                name="nombres"
                value={form.nombres}
                onChange={handleChange}
                error={errores.nombres}
            />

            <InputField
                type="text"
                label="Apellidos"
                name="apellidos"
                value={form.apellidos}
                onChange={handleChange}
                error={errores.apellidos}
            />

            <InputField
                type="email"
                label="Correo electrónico"
                name="email"
                value={form.email}
                onChange={handleChange}
                error={errores.email}
            />

            <InputField
                type="text"
                label="Teléfono"
                name="telefono"
                value={form.telefono}
                onChange={handleChange}
                error={errores.telefono}
            />

            
            <label>Rol</label><br />
            <select
            name="rol"
            value={form.rol}
            onChange={handleChange}
            style={{
                padding: "8px",
                width: "100%",
                borderRadius: "4px",
                marginBottom: "1.5rem",
                border: errores.rol ? "1px solid red" : "1px solid #ccc"
            }}
            >
            <option value="">Selecciona un rol:</option>     
            <option value="Cliente">Cliente</option>
            <option value="Entrenador">Entrenador</option>
            </select>
            {errores.rol && (
            <p style={{ color: "red", fontSize: "13px" }}>{errores.categoria}</p>
            )}
            

            <InputField
                type="password"
                label="Contraseña"
                name="password"
                value={form.password}
                onChange={handleChange}
                error={errores.password}
            />

            <br />
            <Button type="submit" text="Registrar Usuario" />
        </form>

    )
}