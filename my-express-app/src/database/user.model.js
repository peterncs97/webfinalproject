module.exports = (sequelize, Sequelize, Character) => {
  const User = sequelize.define(
    "user", 
    {
      username: {
        type: Sequelize.STRING,
      },
      password: {
        type: Sequelize.STRING
      },
    },
    {
      defaultScope: {
        attributes: { exclude: ['password'] },
      },
    }
  );

  User.hasOne(Character, {
    foreignKey: {
      name: 'userId',
    },
    onDelete: 'SET NULL'
  });
  Character.belongsTo(User, {
    foreignKey: {
      name: 'userId',
    },
    onDelete: 'SET NULL'
  });

  return User;
};

