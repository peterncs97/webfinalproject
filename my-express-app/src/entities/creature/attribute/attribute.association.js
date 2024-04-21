module.exports = (Character, Monster, Attribute) => {
  Character.hasOne(Attribute, {
    foreignKey: 'attributeableId',
    constraints: false,
    scope: {
      attributeableType: 'character',
    },
  });
  Attribute.belongsTo(Character, { foreignKey: 'attributeableId', constraints: false });

  Monster.hasOne(Attribute, {
    foreignKey: 'attributeableId',
    constraints: false,
    scope: {
      attributeableType: 'monster',
    },
  });
  Attribute.belongsTo(Monster, { foreignKey: 'attributeableId', constraints: false });

  Attribute.addHook('afterFind', findResult => {
    if (!Array.isArray(findResult)) findResult = [findResult];
    for (const instance of findResult) {
      if (instance.attributeableType === 'character' && instance.character !== undefined) {
        instance.attributeable = instance.character;
      } else if (instance.attributeableType === 'monster' && instance.monster !== undefined) {
        instance.attributeable = instance.monster;
      }
      // To prevent mistakes:
      delete instance.character;
      delete instance.dataValues.character;
      delete instance.monster;
      delete instance.dataValues.monster;
    }
  });
};