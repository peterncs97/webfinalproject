module.exports = (sequelize, Sequelize) => {
  const Model = Sequelize.Model;
  
  class Item extends Model { }
  Item.init(
    {
      name: Sequelize.STRING,
      type: Sequelize.STRING,
      price: Sequelize.INTEGER,
      description: Sequelize.STRING,
    },
    { 
      defaultScope: {
        attributes: { exclude: ['createdAt', 'updatedAt'] },
      },
      sequelize, modelName: 'item' },
  );

  return Item;
}