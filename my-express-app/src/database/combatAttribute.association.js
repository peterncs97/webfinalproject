module.exports = (Character, Monster, CombatAttribute) => {
  Character.hasOne(CombatAttribute, {
    foreignKey: 'creatureId',
    constraints: false,
    scope: {
      creatureType: 'character',
    },
  });
  CombatAttribute.belongsTo(Character, { foreignKey: 'creatureId', constraints: false });

  Monster.hasOne(CombatAttribute, {
    foreignKey: 'creatureId',
    constraints: false,
    scope: {
      creatureType: 'monster',
    },
  });
  CombatAttribute.belongsTo(Monster, { foreignKey: 'creatureId', constraints: false });

  CombatAttribute.addHook('afterFind', findResult => {
    if (!Array.isArray(findResult)) findResult = [findResult];
    for (const instance of findResult) {
      if (instance.creatureType === 'character' && instance.character !== undefined) {
        instance.creature = instance.character;
      } else if (instance.creatureType === 'monster' && instance.monster !== undefined) {
        instance.creature = instance.monster;
      }
      // To prevent mistakes:
      delete instance.character;
      delete instance.dataValues.character;
      delete instance.monster;
      delete instance.dataValues.monster;
    }
  });
};