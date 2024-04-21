module.exports = (sequelize, Sequelize) => {
  const Model = Sequelize.Model;

  class Monster extends Model { }
  Monster.init(
    {
      name: Sequelize.STRING,
      rarity: Sequelize.STRING,
      dropItem: Sequelize.STRING,
    },
    { sequelize, modelName: 'monster' },
  );

  return Monster;
}