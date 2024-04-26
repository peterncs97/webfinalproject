//  Change db.js to make new option effective

/*  Use `git update-index --skip-worktree ./src/database/db.config.js` 
    in my-express-app directory to ignore changes of this file */

module.exports = {
    HOST: "localhost",
    USER: "root", // Set your own username
    PASSWORD: "root",  // Set your own password
    DB: "mydb", // Set the name of your database
    dialect: "mysql",
    logging: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};