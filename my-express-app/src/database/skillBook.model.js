module.exports = (sequelize, Sequelize) => {
  const SkillBook = sequelize.define(
    "SkillBook", 
    {
      id:{type: Sequelize.INTEGER, primaryKey: true},
      name:{type: Sequelize.STRING},
      type:{type: Sequelize.ENUM("attack","defense","magic")},
      description:{type: Sequelize.STRING},
      skillCode:{type: Sequelize.STRING},// the format will be store like “code1;code2;code3”
      specialCode:{type: Sequelize.ENUM("repeat","combine","none"), default:"none"}, 
      timer:{type:Sequelize.INTEGER, default:5000},
      cost:{type: Sequelize.INTEGER, defaultValue:0},
      duration: {type: Sequelize.INTEGER, defaultValue:0},
      ATK:{type: Sequelize.INTEGER, defaultValue:0},
      DEF:{type: Sequelize.INTEGER, defaultValue:0},
      Power:{type: Sequelize.INTEGER, defaultValue:0},
      Luck:{type: Sequelize.INTEGER, defaultValue:0},
      Agile:{type: Sequelize.INTEGER, defaultValue:0}
    },
    {
      tableName: 'skillBooks',
    }
  );
  return SkillBook;
};
  