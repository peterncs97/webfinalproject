module.exports = (db) => {
  const sequelize = db.sequelize;
  const Sequelize = db.Sequelize;
  const Model = Sequelize.Model;
  const Item = db.item;
  const Character = db.character;
  const Monster = db.monster;

  class Item_Itemable extends Model { }
  Item_Itemable.init(
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      itemId: {
        type: Sequelize.INTEGER,
        unique: 'ii_unique_constraint',
      },
      itemableId: {
        type: Sequelize.INTEGER,
        unique: 'ii_unique_constraint',
        references: null,
      },
      itemableType: {
        type: Sequelize.STRING,
        unique: 'ii_unique_constraint',
      },
      quantity: {
        type: Sequelize.INTEGER
      }
    },
    { sequelize, modelName: 'item_itemable' },
  );

  Character.belongsToMany(Item, {
    through: {
      model: Item_Itemable,
      unique: false,
      scope: {
        itemableType: 'character',
      },
    },
    foreignKey: 'itemableId',
    constraints: false,
  });
  Item.belongsToMany(Character, {
    through: {
      model: Item_Itemable,
      unique: false,
    },
    foreignKey: 'itemId',
    constraints: false,
  });

  Monster.belongsToMany(Item, {
    through: {
      model: Item_Itemable,
      unique: false,
      scope: {
        itemableType: 'monster',
      },
    },
    foreignKey: 'itemableId',
    constraints: false,
  });
  Item.belongsToMany(Monster, {
    through: {
      model: Item_Itemable,
      unique: false,
    },
    foreignKey: 'itemId',
    constraints: false,
  });
}