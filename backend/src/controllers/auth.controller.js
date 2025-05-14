const fs = require('fs')
const path = require('path')
const bcrypt = require('bcrypt')
const {v4 : uuidv4} = require('uuid')
const { userInfo } = require('os')

const rutaUsuarios = path.join(__dirname, '../database/usuarios.json')

const leerUsuarios = () => {
    if (!fs.existsSync(rutaUsuarios)) return []
    const data = fs.readFileSync(rutaUsuarios, 'utf-8')
    return data ? JSON.parse(data) : []
}


const guardarUsuarios = (usuarios) => {
    fs.writeFileSync(rutaUsuarios, JSON.stringify(usuarios, null, 2))
}

// Registro
const registrarUsuario = async (req, res) => {
    const {nombres, apellidos, email, telefono, password, rol} = req.body

    if (!nombres || !apellidos || !email || !telefono || !password || !rol) {
       return  res.status(400).json({mensaje: 'Todos los campos son obligatorios'})
    }

    const usuarios = leerUsuarios()
    const Existe = usuarios.find(usuario => usuario.email === email)
    if (Existe) {
        return res.status(409).json({mensaje: 'El email ya esta registrado'})
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const nuevoUsuario = {
        id: uuidv4(),
        nombres,
        apellidos,
        email,
        telefono,
        password: hashedPassword,
        rol
    }

    usuarios.push(nuevoUsuario)
    guardarUsuarios(usuarios)

    res.status(201).json({mensaje: 'Usuario registrado',
        usuario: { id: nuevoUsuario.id, nombres, apellidos, email, telefono, rol}
    })

}

// Login
const loginUsuario = async (req, res) => {
    const {email, password} = req.body

    const usuarios = leerUsuarios()
    const usuario = usuarios.find(usuario => usuario.email === email)
    if (!usuario) {
        return res.status(401).json({mensaje:'Usuario no encontrado'})
    }

    const coincide = await bcrypt.compare(password, usuario.password)
    if (!coincide) {
        return res.status(401).json({mensaje:"Contraseña incorrecta"})
    }

    res.json({
        mensaje: "Login exitoso",
        usuario: {
            id: usuario.id,
            nombres: usuario.nombres,
            apellidos: usuario.apellidos,
            email: usuario.email,
            telefono: usuario.telefono,
            rol: usuario.rol
        }
    }
    )
}

const obtenerUsuarios = (req, res) => {
    const usuarios = leerUsuarios()
    res.json(usuarios)
}



module.exports = {
    registrarUsuario,
    loginUsuario,
    obtenerUsuarios,
}


