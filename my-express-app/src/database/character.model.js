module.exports = (sequelize, Sequelize) => {
  const Model = Sequelize.Model;
  
  class Character extends Model { }
  Character.init(
    {
      name: Sequelize.STRING,
      profession: Sequelize.STRING,
      level: Sequelize.INTEGER,
      experience: Sequelize.INTEGER,
      nextLevelExp: Sequelize.INTEGER,
      money: Sequelize.INTEGER,
      currSceneId: Sequelize.INTEGER,
      isInBattle: Sequelize.BOOLEAN,
    },
    { sequelize, modelName: 'character' },
  );

  return Character;
}