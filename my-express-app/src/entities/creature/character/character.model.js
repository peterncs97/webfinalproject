module.exports = (sequelize, Sequelize) => {
  const Model = Sequelize.Model;
  
  class Character extends Model { }
  Character.init(
    {
      name: Sequelize.STRING,
      profession: Sequelize.STRING,
      level: Sequelize.INTEGER,
      experience: Sequelize.INTEGER,
      money: Sequelize.INTEGER,
      equipmentWeaponId: Sequelize.INTEGER,
      equipmentBodyId: Sequelize.INTEGER,
      items: Sequelize.STRING,
    },
    { sequelize, modelName: 'character' },
  );

  return Character;
}