module.exports = (db) => {
  const sequelize = db.sequelize;
  const Sequelize = db.Sequelize;
  const Model = Sequelize.Model;
  const Item = db.item;
  const Character = db.character;
  const Monster = db.monster;
  const Merchant = db.merchant;

  class ItemOwnership extends Model { }
  ItemOwnership.init(
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
      ownerId: {
        type: Sequelize.INTEGER,
        unique: 'ii_unique_constraint',
        references: null,
      },
      ownerType: {
        type: Sequelize.STRING,
        unique: 'ii_unique_constraint',
      },
      quantity: {
        type: Sequelize.INTEGER
      }
    },
    { sequelize, modelName: 'item_ownership' },
  );

  Character.belongsToMany(Item, {
    through: {
      model: ItemOwnership,
      unique: false,
      scope: {
        ownerType: 'character',
      },
    },
    foreignKey: 'ownerId',
    constraints: false,
  });
  Item.belongsToMany(Character, {
    through: {
      model: ItemOwnership,
      unique: false,
    },
    foreignKey: 'itemId',
    constraints: false,
  });

  Monster.belongsToMany(Item, {
    through: {
      model: ItemOwnership,
      unique: false,
      scope: {
        ownerType: 'monster',
      },
    },
    foreignKey: 'ownerId',
    constraints: false,
  });
  Item.belongsToMany(Monster, {
    through: {
      model: ItemOwnership,
      unique: false,
    },
    foreignKey: 'itemId',
    constraints: false,
  });

  Merchant.belongsToMany(Item, {
    through: {
      model: ItemOwnership,
      unique: false,
      scope: {
        ownerType: 'merchant',
      },
    },
    foreignKey: 'ownerId',
    constraints: false,
  });
  Item.belongsToMany(Merchant, {
    through: {
      model: ItemOwnership,
      unique: false,
    },
    foreignKey: 'itemId',
    constraints: false,
  });

  return ItemOwnership;
}