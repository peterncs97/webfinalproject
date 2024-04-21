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
    { sequelize, modelName: 'item' },
  );

  return Item;
}