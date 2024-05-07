module.exports = (db) => {
  const { sequelize, Sequelize } = db;
  const Item = db.item;
  const Model = Sequelize.Model;
  class EquipmentAttribute extends Model {}
  EquipmentAttribute.init(
    {
      bodypart: Sequelize.STRING,
      maxhp: Sequelize.INTEGER,
      maxmp: Sequelize.INTEGER,
      power: Sequelize.INTEGER,
      agile: Sequelize.INTEGER,
      luck: Sequelize.INTEGER,
      attack: Sequelize.INTEGER,
      defence: Sequelize.INTEGER,
    },
    { sequelize, modelName: 'equipment_attribute' },
  );

  Item.hasOne(EquipmentAttribute);
  EquipmentAttribute.belongsTo(Item);

  return EquipmentAttribute;
}