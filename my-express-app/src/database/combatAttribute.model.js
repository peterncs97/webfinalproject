module.exports = (sequelize, Sequelize) => {
  const Model = Sequelize.Model;
  const uppercaseFirst = str => `${str[0].toUpperCase()}${str.substr(1)}`;
  
  class CombatAttribute extends Model {
    getCreature(options) {
      if (!this.creatureType) return Promise.resolve(null);
      const mixinMethodName = `get${uppercaseFirst(this.creatureType)}`;
      return this[mixinMethodName](options);
    }
  }
  CombatAttribute.init(
    {
      currhp: Sequelize.INTEGER,
      currmp: Sequelize.INTEGER,
      maxhp: Sequelize.INTEGER,
      maxmp: Sequelize.INTEGER,
      power: Sequelize.INTEGER,
      agile: Sequelize.INTEGER,
      luck: Sequelize.INTEGER,
      attack: Sequelize.INTEGER,
      defence: Sequelize.INTEGER,
      skillSet: Sequelize.STRING,
      creatureId: Sequelize.INTEGER,
      creatureType: Sequelize.STRING,
    },
    { sequelize, modelName: 'combat_attribute' },
  );

  return CombatAttribute;
}