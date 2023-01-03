import Role from "../models/Role";
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
  } catch (error) {
    console.log(error);
  }
};
