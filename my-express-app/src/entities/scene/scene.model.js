module.exports = (sequelize, Sequelize) => {
  const Scene = sequelize.define("scene", {
    parentId: {
      type: Sequelize.INTEGER,
    },
    type: {
      type: Sequelize.STRING,
    },
    name: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING
    },
    imageDescription: {
      type: Sequelize.STRING
    },
    imagePath: {
      type: Sequelize.STRING
    }
  });


  return Scene;
};