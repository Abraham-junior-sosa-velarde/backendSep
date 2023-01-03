import User from "../models/User";

export const isActive = async (req, res, next) => {
  try {
    const { correoElectronico } = req.body;
    const user = await User.findOne({ where: { correoElectronico } });
    if (user.estado) return next();
    return res
      .status(403)
      .json({ message: "La cuenta se encuentra desactivada" });
  } catch (error) {
    return res.status(401).json({ message: "Error de verificación" });
  }
};
