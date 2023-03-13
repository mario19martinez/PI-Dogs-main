const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    id: {
      type: DataTypes.UUID, // coloco el UUID para que me genere id aleatorio evitando que se pisen
      defaultValue: DataTypes.UUIDV4,
      allowNull: false, //no permito que este vacio
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
    },
    height: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    weight: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    life_span: {
      type: DataTypes.STRING,
    },
    createInDb: {
      //lo creo por si quiero acceder solo a lo que cree en base de datos
      type: DataTypes.BOOLEAN, //para que sea true en los creados
      allowNull: false,
      defaultValue: true,
    },
  },
  { timestamps : false }
  );
};
