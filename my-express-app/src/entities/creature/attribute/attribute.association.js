module.exports = (Character, Monster, Attribute) => {
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
};