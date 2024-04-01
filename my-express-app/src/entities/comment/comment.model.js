module.exports = (sequelize, Sequelize) => {
  const Comment = sequelize.define("comment", {
    username: {
      type: Sequelize.STRING,
      defaultValue: "Anonymous"
    },
    content: {
      type: Sequelize.STRING
    },
  });

  return Comment;
};

