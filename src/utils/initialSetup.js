import Role from "../models/Role";
import User from "../models/User";
//Crear roles por defecto al iniciar app

export const createRoles = async () => {
  try {
    const count = await Role.findAll();
    if (count.length > 0) return;
    const values = await Promise.all([
      Role.create({ nombre: "Administrador" }),
      Role.create({ nombre: "Operador" }),
      Role.create({ nombre: "Invitado" }),
    ]);
    const usuario = await User.create({
      nombre: "Admin",
      apellido: "Admin",
      correoElectronico: "admin@gmail.com",
      contrasenia: await encryptPassword("Admin123"),
      estado: true,
      rolId: 1,
      sucursalId: 1,
      cargo: "Administrador",
    });
  } catch (error) {
    console.log(error);
  }
};
