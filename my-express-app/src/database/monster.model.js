module.exports = (sequelize, Sequelize) => {
  const Model = Sequelize.Model;

  class Monster extends Model { }
  Monster.init(
    {
      name: Sequelize.STRING,
      rarity: Sequelize.STRING,
      experience: Sequelize.INTEGER,
      money: Sequelize.INTEGER,
      imagePath: Sequelize.STRING,
      imageDescription: Sequelize.STRING,
    },
    { sequelize, modelName: 'monster' },
  );

  return Monster;
}