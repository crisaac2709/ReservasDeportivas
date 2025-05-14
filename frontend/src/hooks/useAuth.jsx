export const useAuth = () => {
  const raw = localStorage.getItem("usuario");
  try {
    const usuario = raw ? JSON.parse(raw) : null;
    return {
      usuario,
      isCliente: usuario?.rol?.toLowerCase() === "cliente",
      isEntrenador: usuario?.rol?.toLowerCase() === "entrenador",
      isAutenticado: !!usuario
    };
  } catch (error) {
    return { usuario: null, isCliente: false, isEntrenador: false, isAutenticado: false };
  }
};
