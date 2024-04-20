const { Model } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
  const uppercaseFirst = str => `${str[0].toUpperCase()}${str.substr(1)}`;
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

  class Monster extends Model { }
  Monster.init(
    {
      name: Sequelize.STRING,
      rarity: Sequelize.STRING,
      dropItem: Sequelize.STRING,
    },
    { sequelize, modelName: 'monster' },
  );

  class Attribute extends Model {
    getAttributeTable(options) {
      if (!this.attributeTableType) return Promise.resolve(null);
      const mixinMethodName = `get${uppercaseFirst(this.attributeTableType)}`;
      return this[mixinMethodName](options);
    }
  }
  Attribute.init(
    {
      maxhp: Sequelize.INTEGER,
      maxmp: Sequelize.INTEGER,
      power: Sequelize.INTEGER,
      agile: Sequelize.INTEGER,
      luck: Sequelize.INTEGER,
      attack: Sequelize.INTEGER,
      defence: Sequelize.INTEGER,
      skillSet: Sequelize.STRING,
      attributeTableId: Sequelize.INTEGER,
      attributeTableType: Sequelize.STRING,
    },
    { sequelize, modelName: 'attribute' },
  );

  Character.hasOne(Attribute, {
    foreignKey: 'attributeTableId',
    constraints: false,
    scope: {
      attributeTableType: 'character',
    },
  });
  Attribute.belongsTo(Character, { foreignKey: 'attributeTableId', constraints: false });

  Monster.hasOne(Attribute, {
    foreignKey: 'attributeTableId',
    constraints: false,
    scope: {
      attributeTableType: 'monster',
    },
  });
  Attribute.belongsTo(Monster, { foreignKey: 'attributeTableId', constraints: false });

  Attribute.addHook('afterFind', findResult => {
    if (!Array.isArray(findResult)) findResult = [findResult];
    for (const instance of findResult) {
      if (instance.attributeTableType === 'character' && instance.character !== undefined) {
        instance.attributeTable = instance.character;
      } else if (instance.attributeTableType === 'monster' && instance.monster !== undefined) {
        instance.attributeTable = instance.monster;
      }
      // To prevent mistakes:
      delete instance.character;
      delete instance.dataValues.character;
      delete instance.monster;
      delete instance.dataValues.monster;
    }
  });

  return { Character, Monster, Attribute };
}