module.exports = (sequelize, Sequelize) => {
  const Model = Sequelize.Model;

  class Merchant extends Model { }
  Merchant.init(
    {
      name: Sequelize.STRING,
    },
    { sequelize, modelName: 'merchant' },
  );

  return Merchant;
}