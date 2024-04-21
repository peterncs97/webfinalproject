module.exports = (sequelize, Sequelize) => {
  const Model = Sequelize.Model;
  const uppercaseFirst = str => `${str[0].toUpperCase()}${str.substr(1)}`;
  
  class Attribute extends Model {
    getAttributeTable(options) {
      if (!this.attributeableType) return Promise.resolve(null);
      const mixinMethodName = `get${uppercaseFirst(this.attributeableType)}`;
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
      attributeableId: Sequelize.INTEGER,
      attributeableType: Sequelize.STRING,
    },
    { sequelize, modelName: 'attribute' },
  );

  return Attribute;
}