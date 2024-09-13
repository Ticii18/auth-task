import { database } from "../db/database.js";
import generarJwt from "../helpers/generar-jwt.js";

export const signInCtrl = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = database.user.find(
      (user) => user.username === username && user.password === password
    );

    if (!user) {
      return res.status(401).json({ message: "Credenciales incorrectas" });
    }

    const token = await generarJwt(user.id);

    req.session.token = token;

    res.cookie("authToken", token, {
      httpOnly: true,
      secure: false,
      maxAge: 3600000,
    });

    return res.json({
      message: "Inicio de sesión exitoso",
      userId: user.id, // Incluye userId en la respuesta
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error Inesperado" });
  }
};

export const signOutCtrl = (req, res) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Error al cerrar sesión" });
      }

      res.clearCookie("authToken");
      return res.json({ message: "Cierre de sesión exitoso" });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error Inesperado" });
  }
};

export const validateSessionCtrl = (req, res) => {
  console.log(req.user);
  return res.json({
    message: "Acceso permitido a área protegida",
    user: req.user,
  });
};
