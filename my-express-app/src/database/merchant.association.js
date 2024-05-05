module.exports = (Scene, Merchant) => {
  Scene.hasOne(Merchant, {
    foreignKey: 'sceneId',
    constraints: false
  });
  Merchant.belongsTo(Scene, { foreignKey: 'sceneId', constraints: false });
}