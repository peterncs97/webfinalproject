module.exports = (sequelize, Sequelize) => {
    const Battle = sequelize.define(
    "battle", 
    {
      id:{type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
      
      CharacterID :{type: Sequelize.INTEGER, allowNull: false},
      
      CharacterHP :{type: Sequelize.INTEGER, defaultValue:0},
      CharacterMP:{type: Sequelize.INTEGER, defaultValue:0},
      
      CharacterATK:{type: Sequelize.INTEGER, defaultValue:0},
      CharacterDEF:{type: Sequelize.INTEGER, defaultValue:0},
      CharacterPower:{type: Sequelize.INTEGER, defaultValue:0},
      CharacterLuck:{type: Sequelize.INTEGER, defaultValue:0},
      CharacterAgile:{type: Sequelize.INTEGER, defaultValue:0},
      
      CharacterStatusDuration:{type: Sequelize.INTEGER, defaultValue:0},
      
      MonsterID:{type: Sequelize.INTEGER,allowNull: false},
      
      MonsterHP:{type: Sequelize.INTEGER, defaultValue:0},
      MonsterMP:{type: Sequelize.INTEGER, defaultValue:0},
      
      MonsterATK:{type: Sequelize.INTEGER, defaultValue:0},
      MonsterDEF:{type: Sequelize.INTEGER, defaultValue:0},
      MonsterPower:{type: Sequelize.INTEGER, defaultValue:0},
      MonsterLuck:{type: Sequelize.INTEGER, defaultValue:0},
      MonsterAgile:{type: Sequelize.INTEGER, defaultValue:0},
      
      MonsterStatusDuration:{type: Sequelize.INTEGER, defaultValue:0}
    });
  
    return Battle;
  };
  
